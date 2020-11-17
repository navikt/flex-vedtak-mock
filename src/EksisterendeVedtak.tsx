import { LocalDateTime } from '@js-joda/core'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Vis from './components/vis'
import { useAppStore } from './stores/app-store'
import { AnnulleringDto, RSVedtak } from './types/Vedtak'
import env from './utils/environment'


function EksisterendeVedtak() {
    const { setFikk401, fikk401, fodselsnummer, setTriggFetchVedtak, triggFetchVedtak } = useAppStore()

    const [ vedtak, setVedtak ] = useState<RSVedtak[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.spinnsynRoot}/api/v1/vedtak`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const vedtak = await data.json()
                setVedtak(vedtak.map((json: RSVedtak) => json))
            } else {
                if (data.status === 401) {
                    setFikk401(true)
                } else {
                    window.alert('Oops, noe gikk galt ved henting av sykmeldinger')
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops! ${e}`))

    }, [ setVedtak, setFikk401, triggFetchVedtak ])

    async function annullerVedtak(vedtak: RSVedtak) {

        const annullering: AnnulleringDto = {
            orgnummer: vedtak.vedtak.organisasjonsnummer,
            fom:vedtak.vedtak.fom,
            tom:vedtak.vedtak.tom,
            fødselsnummer: fodselsnummer,
            tidsstempel: LocalDateTime.now()
        }

        const res = await fetch(`${env.spinnsynMockRoot}/api/v1/mock/annullering/${fodselsnummer}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(annullering),
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.ok) {
            const tekst = await res.text()
            window.alert(tekst)
            setTriggFetchVedtak(uuid())
        } else {
            window.alert('Noe gikk galt ved publisering av vedtak')
        }
    }

    if (fikk401) {
        return null
    }
    if (vedtak.length == 0) {
        return null
    }
    return (
        <div style={{
            border: '1px solid',
            marginTop: '1em',
            marginBottom: '5em',
            paddingLeft: '1em',
            paddingBottom: '1em'
        }}>
            <h2>Eksisterende vedtak</h2>
            {vedtak.map((vedtak) => {
                return (
                    <div key={vedtak.id}>
                        <span>FOM: {vedtak.vedtak.fom} - TOM: {vedtak.vedtak.fom} - Orgnummer: {vedtak.vedtak.organisasjonsnummer} </span>
                        <Vis hvis={!vedtak.annullert}>
                            <button onClick={() => annullerVedtak(vedtak)}>Annuller vedtaket</button>
                        </Vis>
                    </div>
                )
            })}
        </div>
    )
}

export default EksisterendeVedtak
