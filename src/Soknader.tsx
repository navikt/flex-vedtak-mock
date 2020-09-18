import React, { useEffect, useState } from 'react'

import { useAppStore } from './stores/app-store'
import { Soknad } from './types/Soknad'


function skapTekstFraSoknad(soknad: Soknad): string {

    return `${soknad.id} ${soknad.status} ${soknad.soknadstype} ${soknad.fom} - ${soknad.tom} `
}

function Soknader() {

    const { setValgteSoknader, valgteSoknader, valgteSykmeldinger } = useAppStore()

    const [ soknader, setSoknader ] = useState<Soknad[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(' http://localhost:6969/syfosoknad/api/soknader', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const soknader = await data.json()
                setSoknader(soknader)
            } else {
                if (data.status === 401) {
                    window.alert('Du må logge inn i ditt sykefravaer for å få hentet sykepengesøknader')
                } else {
                    window.alert('Oops, noe gikk galt ved henting av sykepengesøknader')
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops! ${e}`))

    }, [ setValgteSoknader, valgteSykmeldinger ])

    return (
        <div style={{ border: '1px solid', paddingBottom: '1em', paddingLeft: '1em' }}>
            <h2>Sykepengesøknader</h2>
            {soknader
                .filter(sok => valgteSykmeldinger.find(syk => syk.id === sok.sykmeldingId))
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
                                {skapTekstFraSoknad(soknad)}
                            </label>

                        </div>
                    )
                })}
        </div>
    )
}

export default Soknader
