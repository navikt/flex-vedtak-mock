import { LocalDate, LocalDateTime } from '@js-joda/core'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Vis from './components/vis'
import { AnnulleringDto  } from './types/VedtakV1'
import { RSVedtakWrapper } from './types/VedtakV2'
import env from './utils/environment'

interface Props {
    fodselsnummer: string,
    setFikk401: (b: boolean) => void
    fikk401: boolean
    setTriggFetchVedtak: (s: string) => void
    triggFetchVedtak: string
}

function EksisterendeVedtak({ setFikk401, fikk401, fodselsnummer, setTriggFetchVedtak, triggFetchVedtak }: Props) {

    const [ vedtak, setVedtak ] = useState<RSVedtakWrapper[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.flexGatewayRoot}/spinnsyn-backend/api/v2/vedtak`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const vedtak = await data.json()
                setVedtak(vedtak.map((json: RSVedtakWrapper) => json))
            } else {
                if (data.status === 401) {
                    setFikk401(true)
                } else {
                    window.alert('Oops, noe gikk galt ved henting av vedtak')
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops! ${e}`))

    }, [ setVedtak, setFikk401, triggFetchVedtak ])

    async function annullerVedtak(vedtak: RSVedtakWrapper) {

        const annullering: AnnulleringDto = {
            orgnummer: vedtak.vedtak.organisasjonsnummer!,
            fom: LocalDate.parse(vedtak.vedtak.fom),
            tom: LocalDate.parse(vedtak.vedtak.tom),
            fødselsnummer: fodselsnummer,
            tidsstempel: LocalDateTime.now()
        }

        const res = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/annullering`, {
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
                const erVedtakV2 = vedtak.vedtak.utbetaling.utbetalingsdager.length !== 0
                return (
                    <div key={vedtak.id}>
                        <span>FOM: {vedtak.vedtak.fom} - TOM: {vedtak.vedtak.tom} - Orgnummer: {vedtak.vedtak.organisasjonsnummer} {erVedtakV2 ?
                            <strong>- VedtakV2</strong> : ''} </span>
                        <Vis hvis={!vedtak.annullert && !erVedtakV2}>
                            <button onClick={() => annullerVedtak(vedtak)}>Annuller vedtaket</button>
                        </Vis>
                    </div>
                )
            })}
        </div>
    )
}

export default EksisterendeVedtak
