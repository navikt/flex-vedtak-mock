import React from 'react'

import Vis from './components/vis'
import useSykmeldinger from './queries/useSykmeldinger'
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
}

function Sykmeldinger({ setValgteSykmeldinger, valgteSykmeldinger }: Props) {

    const { data: sykmeldinger } = useSykmeldinger()
    if (!sykmeldinger) {
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
