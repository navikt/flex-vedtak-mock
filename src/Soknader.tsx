import React, { useEffect, useState } from 'react'

import { Soknad } from './types/Soknad'
import { Sykmelding } from './types/Sykmelding'
import env from './utils/environment'


function skapTekstFraSoknad(soknad: Soknad, valgtSykmelding: boolean): string {

    return `${soknad.id} ${soknad.status} ${soknad.soknadstype} ${soknad.fom} - ${soknad.tom} ${valgtSykmelding ? ' VALGT SYKMELDING' : ''}`
}

interface Props {
    setValgteSoknader: (b: Soknad[]) => void
    valgteSoknader: Soknad[]
    valgteSykmeldinger: Sykmelding[]
    setFikk401: (b: boolean) => void
    fikk401: boolean
}

function Soknader({ setValgteSoknader, valgteSoknader, valgteSykmeldinger, setFikk401, fikk401 }: Props) {

    const [ soknader, setSoknader ] = useState<Soknad[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.flexGatewayRoot}/syfosoknad/api/soknader`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const soknader = await data.json()
                setSoknader(soknader)
            } else {
                if (data.status === 401) {
                    setFikk401(true)
                } else {
                    window.alert('Oops, noe gikk galt ved henting av sykepengesøknader')
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops! ${e}`))

    }, [ setValgteSoknader, valgteSykmeldinger, setFikk401 ])

    if (fikk401) {
        return null
    }

    return (
        <div style={{ border: '1px solid', paddingBottom: '1em', paddingLeft: '1em' }}>
            <h2>Sykepengesøknader</h2>
            {soknader
                .map((soknad) => {
                    return (
                        <div key={soknad.id}>
                            <label style={{ cursor: 'pointer' }}>
                                <input type={'checkbox'} value={soknad.id} onChange={(event => {
                                    if (event.target.checked) {
                                        valgteSoknader.push(soknader.find(sok => sok.id === event.target.value)!)
                                        setValgteSoknader([ ...valgteSoknader ])
                                    } else {
                                        setValgteSoknader(valgteSoknader.filter(sok => sok.id !== event.target.value))
                                    }
                                })} />
                                {skapTekstFraSoknad(soknad, valgteSykmeldinger.find(syk => syk.id === soknad.sykmeldingId) != null)}
                            </label>

                        </div>
                    )
                })}
        </div>
    )
}

export default Soknader
