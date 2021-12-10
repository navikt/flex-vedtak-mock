import { LocalDate } from '@js-joda/core'
import React from 'react'
import { v4 as uuid } from 'uuid'

import useFodselsnummer from './queries/useFodselsnummer'
import useOpprettVedtak from './queries/useOpprettVedtak'
import { FomTom } from './types/VedtakV1'
import {
    Begrensning,
    GrunnlagForSykepengegrunnlagPerArbeidsgiver, OppdragDto,
    UtbetalingdagDto,
    UtbetalingUtbetalt,
    VedtakFattetForEksternDto
} from './types/VedtakV2'
import env from './utils/environment'

interface Props {
    automatiskBehandling: boolean
    månedsinntekt: number,
    forbrukteSykedager: number,
    gjenstaendeSykedager: number,
    utbetalingstype: string,
    orgnummer: string,
    fomTom: FomTom,
    ekstraArbeidsgivere: GrunnlagForSykepengegrunnlagPerArbeidsgiver
    oppdrag: OppdragDto[],
    utbetalingsdager: UtbetalingdagDto[],
    sykepengegrunnlag: number,
    grunnlagForSykepengegrunnag: number,
    begrensning: Begrensning,
    foreløpigBeregnetSluttPåSykepenger: LocalDate,
}

function SendSomNyttVedtak({
    månedsinntekt,
    automatiskBehandling,
    forbrukteSykedager,
    gjenstaendeSykedager,
    utbetalingstype,
    ekstraArbeidsgivere,
    orgnummer,
    fomTom,
    oppdrag,
    utbetalingsdager,
    sykepengegrunnlag,
    grunnlagForSykepengegrunnag,
    begrensning,
    foreløpigBeregnetSluttPåSykepenger,
}: Props) {

    const { data: fodselsnummer } = useFodselsnummer()
    const { mutate: opprettVedtak, isLoading } = useOpprettVedtak()

    const genererVedtakV2 = () => {

        const utbetalingUtbetalt: UtbetalingUtbetalt = {
            event: 'utbetaling_utbetalt',
            utbetalingId: uuid(),
            fødselsnummer: fodselsnummer!,
            aktørId: fodselsnummer!,
            organisasjonsnummer: orgnummer,
            fom: fomTom.fom,
            tom: fomTom.tom,
            antallVedtak: 1,
            foreløpigBeregnetSluttPåSykepenger: foreløpigBeregnetSluttPåSykepenger,
            forbrukteSykedager: forbrukteSykedager,
            gjenståendeSykedager: gjenstaendeSykedager,
            automatiskBehandling: automatiskBehandling,
            arbeidsgiverOppdrag: oppdrag.find((o) => o.fagområde === 'SPREF'),
            personOppdrag: oppdrag.find((o) => o.fagområde === 'SP'),
            type: utbetalingstype,
            utbetalingsdager: utbetalingsdager,
        }

        const vedtak: VedtakFattetForEksternDto = {
            fødselsnummer: fodselsnummer!,
            aktørId: fodselsnummer!,
            organisasjonsnummer: orgnummer,
            fom: fomTom.fom,
            tom: fomTom.tom,
            skjæringstidspunkt: fomTom.fom,
            grunnlagForSykepengegrunnlagPerArbeidsgiver: {
                ...ekstraArbeidsgivere
            },
            dokumenter: [],
            inntekt: månedsinntekt,
            sykepengegrunnlag: sykepengegrunnlag,
            grunnlagForSykepengegrunnlag: grunnlagForSykepengegrunnag,
            begrensning: begrensning,
            utbetalingId: utbetalingUtbetalt.utbetalingId
        }
        vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver![orgnummer] = månedsinntekt * 12

        return {
            vedtak: vedtak,
            utbetaling: utbetalingUtbetalt
        } as any
    }

    if (!fodselsnummer) {
        return null
    }

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={isLoading} style={{ fontSize: 40 }} onClick={async() => {
                const vedtak = genererVedtakV2()

                if (env.isMockBackend) {
                    // eslint-disable-next-line no-console
                    console.log('Vedtak', vedtak)
                }
                opprettVedtak(JSON.stringify({
                    vedtak: JSON.stringify(vedtak.vedtak),
                    utbetaling: JSON.stringify(vedtak.utbetaling)
                }))

            }}>Send vedtak <span role={'img'} aria-label={'Judge'}>👨‍⚖️</span>
            </button>
        </div>
    )
}

export default SendSomNyttVedtak
