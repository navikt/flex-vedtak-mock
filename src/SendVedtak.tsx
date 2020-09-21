import cloneDeep from 'lodash.clonedeep'
import React, { useState } from 'react'

import { useAppStore } from './stores/app-store'
import { VedtakDto } from './types/Vedtak'
import env from './utils/environment'


function SendVedtak() {

    const [ fetching, setFetching ] = useState(false)
    const { utbetalinger, fodselsnummer, valgteSykmeldinger, valgteSoknader, valgteInntektsmeldinger, forbrukteSykedager, gjenstaendeSykedager, fomTom } = useAppStore()

    const genererVedtak = (): VedtakDto => {
        const vedtak: VedtakDto = {
            fom: fomTom.fom,
            tom: fomTom.tom,
            forbrukteSykedager,
            utbetalinger: cloneDeep(utbetalinger),
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

        valgteInntektsmeldinger.forEach((i) => {
            vedtak.dokumenter.push({ dokumentId: i.id, type: 'Inntektsmelding' })
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
