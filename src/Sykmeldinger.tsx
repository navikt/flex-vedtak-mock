import React, { useEffect, useState } from 'react'

import { useAppStore } from './stores/app-store'
import { Sykmelding } from './types/Sykmelding'
import Vis from "./components/vis";
import env from "./utils/environment";


function skapTekstFraSykmelding(sykmelding: Sykmelding): string {
    let tekst = `${sykmelding.id} - ${sykmelding.sykmeldingStatus.statusEvent}`

    sykmelding.sykmeldingsperioder.forEach((p) => {
        const periodeTekst = ` -- ${p.fom} - ${p.tom} : ${p.type}`
        tekst = `${tekst}${periodeTekst}`
    })
    return tekst
}

function Sykmeldinger() {
    const { setValgteSykmeldinger, valgteSykmeldinger } = useAppStore()

    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.sykmeldingerBackendProxyRoot}/sykmeldinger-backend/api/v1/sykmeldinger`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const sykmeldinger = await data.json()
                setSykmeldinger(sykmeldinger.map((json: any) => new Sykmelding(json)))
            } else {
                if (data.status === 401) {
                    window.alert('Du må logge inn i ditt sykefravaer etc for å få hentet sykmeldinger')
                } else {
                    window.alert('Oops, noe gikk galt ved henting av sykmeldinger')
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops! ${e}`))

    }, [ setValgteSykmeldinger ])

    return (
        <div style={{ border: '1px solid', paddingBottom: '1em', paddingLeft: '1em' }}>
            <h2>Sykmeldinger</h2>
            {sykmeldinger.map((sykmelding) => {
                return (
                    <div key={sykmelding.id}>
                        <label style={{ cursor: 'pointer' }}>
                            <input type={'checkbox'} value={sykmelding.id} onChange={(event => {
                                if (event.target.checked) {
                                    valgteSykmeldinger.push(sykmeldinger.find(s => s.id === event.target.value)!)
                                    setValgteSykmeldinger([ ...valgteSykmeldinger ])
                                } else {
                                    setValgteSykmeldinger(valgteSykmeldinger.filter(syk => syk.id !== event.target.value))
                                }
                            })} />
                            {skapTekstFraSykmelding(sykmelding)}
                        </label>

                    </div>
                )
            })}
            <Vis hvis={env.isDev}>
                <a href={'http://localhost:1349/'} target={'blank'}> Opprett ny sykmelding </a>
            </Vis>
        </div>
    )
}

export default Sykmeldinger
