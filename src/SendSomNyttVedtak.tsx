import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import {
    sprefUtbetalingTilArbeidsgiverOppdrag
} from './SprefUtbetaling'
import { useAppStore } from './stores/app-store'
import {
    UtbetalingUtbetalt,
    VedtakFattetForEksternDto
} from './types/VedtakV2'
import env from './utils/environment'


function SendSomNyttVedtak() {

    const [ fetching, setFetching ] = useState(false)
    const { setTriggFetchVedtak, fodselsnummer, månedsinntekt, automatiskBehandling, valgteSykmeldinger, valgteSoknader, forbrukteSykedager, gjenstaendeSykedager, fomTom, sprefUtbetaling, utbetalingsdager } = useAppStore()

    const genererVedtakV2 = () => {
        const vedtak: VedtakFattetForEksternDto = {
            fødselsnummer: fodselsnummer,
            aktørId: fodselsnummer,
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
            fødselsnummer: fodselsnummer,
            aktørId: fodselsnummer,
            organisasjonsnummer: valgteSoknader[0]?.arbeidsgiver?.orgnummer || 'org-nr',
            fom: fomTom.fom,
            tom: fomTom.tom,
            forbrukteSykedager: forbrukteSykedager,
            gjenståendeSykedager: gjenstaendeSykedager,
            automatiskBehandling: automatiskBehandling,
            arbeidsgiverOppdrag: sprefUtbetalingTilArbeidsgiverOppdrag(sprefUtbetaling!),
            type: 'UTBETALING',
            utbetalingsdager: utbetalingsdager,
        }
        vedtak.utbetalingId = utbetaling.utbetalingId
        return {
            vedtak: vedtak,
            utbetaling: utbetaling
        } as any
    }

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={fetching} style={{ fontSize: 40 }} onClick={async() => {
                if (!fodselsnummer) {
                    window.alert('Fødselsnummer er ikke satt')
                    return
                }
                try {
                    setFetching(true)
                    const vedtak = genererVedtakV2()
                    const res = await fetch(`${env.spinnsynMockRoot}/api/v2/testdata/vedtak/${fodselsnummer}`, {
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
