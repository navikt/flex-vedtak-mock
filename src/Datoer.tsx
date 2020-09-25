import { LocalDate } from '@js-joda/core'
import React, { useEffect } from 'react'

import { useAppStore } from './stores/app-store'

function Datoer() {
    const { setFomTom, fomTom, valgteSoknader } = useAppStore()

    useEffect(() => {
        if (valgteSoknader.length > 0) {
            const tidligsteFom = valgteSoknader.sort((a, b) => LocalDate.parse(a.fom).toEpochDay() - LocalDate.parse(b.fom).toEpochDay())[0].fom
            const senesteTom = valgteSoknader.sort((a, b) => LocalDate.parse(b.tom).toEpochDay() - LocalDate.parse(a.tom).toEpochDay())[0].tom
            setFomTom({ fom: LocalDate.parse(tidligsteFom), tom: LocalDate.parse(senesteTom) })
        }
    }, [ valgteSoknader, setFomTom ])

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <div>
                <label>FOM:
                    <input value={fomTom.fom.toString()} type={'date'} onChange={(e) => {
                        const fom = LocalDate.parse(e.target.value)
                        if (!fom.isAfter(fomTom.tom)) {
                            setFomTom({ fom: fom, tom: fomTom.tom })
                        }
                    }} />
                </label>
            </div>
            <div style={{ paddingTop: '1em' }}>
                <label>TOM:
                    <input value={fomTom.tom.toString()} type={'date'} onChange={(e) => {
                        const tom = LocalDate.parse(e.target.value)
                        if (!tom.isBefore(fomTom.fom)) {
                            setFomTom({ tom: tom, fom: fomTom.fom })
                        }
                    }} />
                </label>
            </div>
        </div>
    )
}

export default Datoer
