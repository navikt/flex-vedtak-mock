import { LocalDate, LocalDateTime } from '@js-joda/core'
import React from 'react'

import Vis from './components/vis'
import useAnnullerVedtak from './queries/useAnnullerVedtak'
import useFodselsnummer from './queries/useFodselsnummer'
import useVedtak from './queries/useVedtak'
import { AnnulleringDto } from './types/VedtakV1'
import { RSVedtakWrapper } from './types/VedtakV2'


function EksisterendeVedtak() {

    const { data: fodselsnummer } = useFodselsnummer()
    const { data: vedtak } = useVedtak()
    const { mutate: annullerVedtaket } = useAnnullerVedtak()


    async function annullerVedtak(vedtak: RSVedtakWrapper) {

        const annullering: AnnulleringDto = {
            orgnummer: vedtak.vedtak.organisasjonsnummer!,
            fom: LocalDate.parse(vedtak.vedtak.fom),
            tom: LocalDate.parse(vedtak.vedtak.tom),
            fødselsnummer: fodselsnummer!,
            tidsstempel: LocalDateTime.now()
        }

        annullerVedtaket(JSON.stringify(annullering))
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
                return (
                    <div key={vedtak.id}>
                        <span>FOM: {vedtak.vedtak.fom} - TOM: {vedtak.vedtak.tom} - Orgnummer: {vedtak.vedtak.organisasjonsnummer}</span>
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
