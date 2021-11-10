import React from 'react'

import { GrunnlagForSykepengegrunnlagPerArbeidsgiver } from './types/VedtakV2'

interface Props {
    månedsinntekt: number,
    setMånedsinntekt: (b: number) => void,
    orgnummer: string
    ekstraArbeidsgivere: GrunnlagForSykepengegrunnlagPerArbeidsgiver
    setEkstraArbeidsgivere: (b: GrunnlagForSykepengegrunnlagPerArbeidsgiver) => void
}


export const Inntekter = ({
    setMånedsinntekt,
    månedsinntekt,
    orgnummer,
    ekstraArbeidsgivere,
    setEkstraArbeidsgivere
}: Props) => {

    const leggTilArbeidsgiver = () => {
        const orgnummer = orgnr[Math.floor(Math.random() * orgnr.length)]

        const valgtOrgnr = prompt('Orgnummer?', orgnummer)
        const valgtInntekt = prompt('Inntekt?', Math.floor(Math.random() * 500000).toString())
        if (!valgtOrgnr || !valgtInntekt) {
            alert('Du gjorde noe feil')
            return
        }
        const inntektTall = Number(valgtInntekt)
        if (!(inntektTall > 0)) {
            alert('Du gjorde noe feil med inntekten')
            return
        }
        const ekstraArbeidsgivereKopi = {
            ...ekstraArbeidsgivere
        }
        ekstraArbeidsgivereKopi[valgtOrgnr] = inntektTall
        setEkstraArbeidsgivere(ekstraArbeidsgivereKopi)
    }

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Månedsinntekt hos {orgnummer} :
                <input type={'number'} min={0} step={1} max={200000} value={månedsinntekt} onChange={(e) => {
                    setMånedsinntekt(Number(e.target.value))
                }} /></label>
            <br />
            <label>Årsinntekt hos {orgnummer}: {månedsinntekt * 12}</label>
            <h3>Andre arbeidsgivere</h3>
            {
                Object.entries(ekstraArbeidsgivere).map((e, idx) => {
                    return (
                        <p key={idx}><strong>{e[0]}:</strong> {e[1]} kr</p>
                    )
                })
            }
            <button onClick={leggTilArbeidsgiver}>Legg til arbeidsgiver</button>
        </div>
    )
}


const orgnr = [ '811293032',
    '811291102',
    '974739410',
    '907670201',
    '947064649',
    '810008822',
    '810007842',
    '974600951',
    '805824352',
    '871993602',
    '910979132',
    '810009152',
    '810009012',
    '910128574',
    '811289302',
    '811292192',
    '974574861',
    '824771332',
    '926301683',
    '811290742',
    '974727757',
    '811290572',
    '911018446',
    '911018403',
    '910532308',
    '810008652',
    '810008792' ]
