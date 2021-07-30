import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import useFodselsnummer from './queries/useFodselsnummer'
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
import env from './utils/environment'

interface Props {
    automatiskBehandling: boolean
    setTriggFetchVedtak: (b: string) => void,
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
    setTriggFetchVedtak,
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

    const [ fetching, setFetching ] = useState(false)
    const { data: fodselsnummer } = useFodselsnummer()


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

    if(!fodselsnummer){
        return null
    }

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={fetching} style={{ fontSize: 40 }} onClick={async() => {
                try {
                    setFetching(true)
                    const vedtak = genererVedtakV2()
                    const res = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/vedtak`, {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify({
                            vedtak: JSON.stringify(vedtak.vedtak),
                            utbetaling: JSON.stringify(vedtak.utbetaling)
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    if (res.ok) {
                        const tekst = await res.text()
                        window.alert(tekst)
                        setTriggFetchVedtak(uuid())
                    } else {
                        window.alert('Noe gikk galt ved publisering av vedtak og utbetaling')
                    }
                } finally {
                    setFetching(false)
                }

            }}>Send som nytt vedtak med utbetalingsdager <span role={'img'} aria-label={'Judge'}>👨‍⚖️</span>
            </button>
        </div>
    )
}

export default SendSomNyttVedtak
