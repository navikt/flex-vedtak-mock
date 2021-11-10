import React, { useEffect } from 'react'

import { Begrensning, GrunnlagForSykepengegrunnlagPerArbeidsgiver } from './types/VedtakV2'

interface Props {
    månedsinntekt: number,
    setMånedsinntekt: (b: number) => void,
    sykepengegrunnlag: number,
    setSykepengegrunnlag: (b: number) => void,
    grunnlagForSykepengegrunnlag: number,
    setGrunnlagForSykepengegrunnlag: (b: number) => void,
    begrensning: Begrensning,
    setBegrensning: (b: Begrensning) => void,
    orgnummer: string
    ekstraArbeidsgivere: GrunnlagForSykepengegrunnlagPerArbeidsgiver
    setEkstraArbeidsgivere: (b: GrunnlagForSykepengegrunnlagPerArbeidsgiver) => void,
    dagsats: number,
    setDagsats: (b: number) => void
}


const G = 106399

export const Inntekter = ({
    setMånedsinntekt,
    månedsinntekt,
    orgnummer,
    ekstraArbeidsgivere,
    setEkstraArbeidsgivere,
    dagsats,
    setDagsats,
    begrensning,
    setBegrensning,
    sykepengegrunnlag,
    grunnlagForSykepengegrunnlag,
    setSykepengegrunnlag,
    setGrunnlagForSykepengegrunnlag,
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

    useEffect(() => {
        function add(accumulator: number, a: number) {
            return accumulator + a
        }

        const grunnlagetForSykepengegrunnlaget = (månedsinntekt * 12) + Object.entries(ekstraArbeidsgivere).map((a) => a[1]).reduce(add, 0)
        setGrunnlagForSykepengegrunnlag(grunnlagetForSykepengegrunnlaget)

        let sykepengegrunnlag = 0
        if (grunnlagetForSykepengegrunnlaget > 6 * G) {
            sykepengegrunnlag = 6 * G
            setBegrensning('ER_6G_BEGRENSET')
        } else {
            sykepengegrunnlag = grunnlagetForSykepengegrunnlaget
            setBegrensning('ER_IKKE_6G_BEGRENSET')
        }
        setSykepengegrunnlag(sykepengegrunnlag)
        setDagsats(Math.floor(sykepengegrunnlag / 260))
    }, [ månedsinntekt, ekstraArbeidsgivere, dagsats, setDagsats, setSykepengegrunnlag, setGrunnlagForSykepengegrunnlag, setBegrensning ])

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Månedsinntekt hos {orgnummer} :
                <input type={'number'} min={0} step={1} max={200000} value={månedsinntekt} onChange={(e) => {
                    setMånedsinntekt(Number(e.target.value))
                }} /></label>
            <br />
            <table style={{ border: '1px solid', marginTop: '1em' }}>
                <tr>
                    <td>Årsinntekt hos {orgnummer}</td>
                    <td>{månedsinntekt * 12}</td>
                </tr>
                <tr>
                    <td>Månedsinntekt hos {orgnummer}</td>
                    <td>{månedsinntekt}</td>
                </tr>
                <tr>
                    <td>1G</td>
                    <td>{G}</td>
                </tr>
                <tr>
                    <td>6G</td>
                    <td>{6 * G}</td>
                </tr>
                <tr>
                    <td>Dagsats</td>
                    <td>{dagsats}</td>
                </tr>
                <tr>
                    <td>Sykepengegrunnlag</td>
                    <td>{sykepengegrunnlag}</td>
                </tr>
                <tr>
                    <td>Grunnlag for sykepengegrunnlag:</td>
                    <td>{grunnlagForSykepengegrunnlag}</td>
                </tr>
                <tr>
                    <td>Begrensning:</td>
                    <td>{begrensning}</td>
                </tr>
            </table>

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
