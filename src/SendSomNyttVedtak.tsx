import React from 'react'
import { v4 as uuid } from 'uuid'

import useFodselsnummer from './queries/useFodselsnummer'
import useOpprettVedtak from './queries/useOpprettVedtak'
import {
    sprefUtbetalingTilArbeidsgiverOppdrag
} from './SprefUtbetaling'
import { Soknad } from './types/Soknad'
import { Sykmelding } from './types/Sykmelding'
import { FomTom, UtbetalingDto } from './types/VedtakV1'
import {
    UtbetalingdagDto,
    UtbetalingUtbetalt,
    VedtakFattetForEksternDto
} from './types/VedtakV2'

interface Props {
    automatiskBehandling: boolean
    månedsinntekt: number,
    valgteSykmeldinger: Sykmelding[],
    valgteSoknader: Soknad[],
    forbrukteSykedager: number,
    gjenstaendeSykedager: number,
    utbetalingstype: string,
    fomTom: FomTom,
    sprefUtbetaling: UtbetalingDto | undefined,
    utbetalingsdager: UtbetalingdagDto[]
}

function SendSomNyttVedtak({
    månedsinntekt,
    automatiskBehandling,
    valgteSykmeldinger,
    valgteSoknader,
    forbrukteSykedager,
    gjenstaendeSykedager,
    utbetalingstype,
    fomTom,
    sprefUtbetaling,
    utbetalingsdager
}: Props) {

    const { data: fodselsnummer } = useFodselsnummer()
    const { mutate: opprettVedtak, isLoading } = useOpprettVedtak()

    const genererVedtakV2 = () => {
        const vedtak: VedtakFattetForEksternDto = {
            fødselsnummer: fodselsnummer!,
            aktørId: fodselsnummer!,
            organisasjonsnummer: valgteSoknader[0]?.arbeidsgiver?.orgnummer || 'org-nr',
            fom: fomTom.fom,
            tom: fomTom.tom,
            skjæringstidspunkt: fomTom.fom,
            dokumenter: [],
            inntekt: månedsinntekt,
            sykepengegrunnlag: månedsinntekt * 12,
            utbetalingId: undefined
        }

        valgteSykmeldinger.forEach((s) => {
            vedtak.dokumenter.push({ dokumentId: s.id, type: 'Sykmelding' })
        })

        valgteSoknader.forEach((s) => {
            vedtak.dokumenter.push({ dokumentId: s.id, type: 'Søknad' })
        })

        const utbetaling: UtbetalingUtbetalt = {
            event: 'utbetaling_utbetalt',
            utbetalingId: uuid(),
            fødselsnummer: fodselsnummer!,
            aktørId: fodselsnummer!,
            organisasjonsnummer: valgteSoknader[0]?.arbeidsgiver?.orgnummer || 'org-nr',
            fom: fomTom.fom,
            tom: fomTom.tom,
            forbrukteSykedager: forbrukteSykedager,
            gjenståendeSykedager: gjenstaendeSykedager,
            automatiskBehandling: automatiskBehandling,
            arbeidsgiverOppdrag: sprefUtbetalingTilArbeidsgiverOppdrag(sprefUtbetaling!),
            type: utbetalingstype,
            utbetalingsdager: utbetalingsdager,
        }
        vedtak.utbetalingId = utbetaling.utbetalingId
        return {
            vedtak: vedtak,
            utbetaling: utbetaling
        } as any
    }

    if (!fodselsnummer) {
        return null
    }

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={isLoading} style={{ fontSize: 40 }} onClick={async() => {
                const vedtak = genererVedtakV2()

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
