import { LocalDate, LocalDateTime } from '@js-joda/core'
import React from 'react'

import Vis from './components/vis'
import useFodselsnummer from './queries/useFodselsnummer'
import useVedtak from './queries/useVedtak'
import { AnnulleringDto } from './types/VedtakV1'
import { RSVedtakWrapper } from './types/VedtakV2'
import env from './utils/environment'


function EksisterendeVedtak() {

    const { data: fodselsnummer } = useFodselsnummer()
    const { data: vedtak } = useVedtak()


    async function annullerVedtak(vedtak: RSVedtakWrapper) {

        const annullering: AnnulleringDto = {
            orgnummer: vedtak.vedtak.organisasjonsnummer!,
            fom: LocalDate.parse(vedtak.vedtak.fom),
            tom: LocalDate.parse(vedtak.vedtak.tom),
            fødselsnummer: fodselsnummer!,
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
        } else {
            window.alert('Noe gikk galt ved publisering av vedtak')
        }
    }

    if (!fodselsnummer) {
        return null
    }
    if (!vedtak) {
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
