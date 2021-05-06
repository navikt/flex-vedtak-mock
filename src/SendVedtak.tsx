import cloneDeep from 'lodash.clonedeep'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { skapSpUtbetaling } from './SpUtbetaling'
import { useAppStore } from './stores/app-store'
import { VedtakDto } from './types/VedtakV1'
import env from './utils/environment'


function SendVedtak() {

    const [ fetching, setFetching ] = useState(false)
    const { setTriggFetchVedtak, fodselsnummer, månedsinntekt, automatiskBehandling, valgteSykmeldinger, valgteSoknader, forbrukteSykedager, gjenstaendeSykedager, fomTom, sprefUtbetaling } = useAppStore()

    const genererVedtak = (): VedtakDto => {

        const vedtak: VedtakDto = {
            automatiskBehandling,
            månedsinntekt,
            organisasjonsnummer: valgteSoknader[0]?.arbeidsgiver?.orgnummer || 'org-nr',
            fom: fomTom.fom,
            tom: fomTom.tom,
            forbrukteSykedager,
            utbetalinger: [ cloneDeep(sprefUtbetaling!), cloneDeep(skapSpUtbetaling(fodselsnummer)) ],
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
                    const res = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/mock/vedtak/${fodselsnummer}`, {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify(genererVedtak()),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    if (res.ok) {
                        const tekst = await res.text()
                        window.alert(tekst)
                        setTriggFetchVedtak(uuid())
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
