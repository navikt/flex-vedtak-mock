import React from 'react'

import useSoknader from './queries/useSoknader'
import { Soknad } from './types/Soknad'
import { Sykmelding } from './types/Sykmelding'


function skapTekstFraSoknad(soknad: Soknad, valgtSykmelding: boolean): string {

    return `${soknad.id} ${soknad.status} ${soknad.soknadstype} ${soknad.fom} - ${soknad.tom} ${valgtSykmelding ? ' VALGT SYKMELDING' : ''}`
}

interface Props {
    setValgteSoknader: (b: Soknad[]) => void
    valgteSoknader: Soknad[]
    valgteSykmeldinger: Sykmelding[]
}

function Soknader({ setValgteSoknader, valgteSoknader, valgteSykmeldinger }: Props) {

    const { data: soknader } = useSoknader()

    if (!soknader) {
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
