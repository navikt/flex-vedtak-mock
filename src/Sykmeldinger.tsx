import React, { useEffect, useState } from 'react'

import Vis from './components/vis'
import { Sykmelding } from './types/Sykmelding'
import env from './utils/environment'


function skapTekstFraSykmelding(sykmelding: Sykmelding): string {
    let tekst = `${sykmelding.id} - ${sykmelding.sykmeldingStatus.statusEvent}`

    sykmelding.sykmeldingsperioder.forEach((p) => {
        const periodeTekst = ` -- ${p.fom} - ${p.tom} : ${p.type}`
        tekst = `${tekst}${periodeTekst}`
    })
    return tekst
}

interface Props {
    setValgteSykmeldinger: (b: Sykmelding[]) => void
    valgteSykmeldinger: Sykmelding[]
    setFikk401: (b: boolean) => void
    fikk401: boolean
}

function Sykmeldinger({ setValgteSykmeldinger, valgteSykmeldinger, setFikk401, fikk401 }: Props) {

    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.sykmeldingerBackendProxyRoot}/api/v1/sykmeldinger`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const sykmeldinger = await data.json()
                setSykmeldinger(sykmeldinger.map((json: any) => new Sykmelding(json)))
            } else {
                if (data.status === 401) {
                    setFikk401(true)
                } else {
                    try {
                        const tekst = await data.text()
                        window.alert('Oops, noe gikk galt ved henting av sykmeldinger\n' + tekst)

                    } catch (e) {
                        window.alert('Oops, noe gikk galt ved henting av sykmeldinger')
                    }
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops! ${e}`))

    }, [ setValgteSykmeldinger, setFikk401 ])

    if (fikk401) {
        return null
    }
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
