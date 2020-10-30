import cloneDeep from 'lodash.clonedeep'
import React, { useState } from 'react'

import { skapSprefUtbetaling } from './SprefUtbetaling'
import { skapSpUtbetaling } from './SpUtbetaling'
import { useAppStore } from './stores/app-store'
import { VedtakDto } from './types/Vedtak'
import env from './utils/environment'


function SendVedtak() {

    const [ fetching, setFetching ] = useState(false)
    const { fodselsnummer, månedsinntekt, automatiskBehandling, valgteSykmeldinger, dagsats, valgteSoknader, forbrukteSykedager, gjenstaendeSykedager, fomTom, sprefvariant } = useAppStore()

    const genererVedtak = (): VedtakDto => {

        const vedtak: VedtakDto = {
            automatiskBehandling,
            månedsinntekt,
            fom: fomTom.fom,
            tom: fomTom.tom,
            forbrukteSykedager,
            utbetalinger: [ cloneDeep(skapSprefUtbetaling(dagsats, fomTom, valgteSoknader, sprefvariant)), cloneDeep(skapSpUtbetaling(fodselsnummer)) ],
            gjenståendeSykedager: gjenstaendeSykedager,
            dokumenter: []
        }

        // Fjern lokale IDer
        vedtak.utbetalinger.forEach((u) => {
            delete u._id
            u.utbetalingslinjer.forEach(ul => {
                delete ul._id
            })
        })

        valgteSykmeldinger.forEach((s) => {
            vedtak.dokumenter.push({ dokumentId: s.id, type: 'Sykmelding' })
        })

        valgteSoknader.forEach((s) => {
            vedtak.dokumenter.push({ dokumentId: s.id, type: 'Søknad' })
        })

        return vedtak
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
                    const res = await fetch(`${env.opprettVedtakRoot}/${fodselsnummer}`, {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify(genererVedtak()),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    if (res.ok) {
                        const tekst = await res.text()
                        window.alert(tekst)
                    } else {
                        window.alert('Noe gikk galt ved publisering av vedtak')
                    }
                } finally {
                    setFetching(false)
                }

            }}>Send vedtak <span role={'img'} aria-label={'Judge'}>👨‍⚖️</span>
            </button>
        </div>
    )
}

export default SendVedtak
