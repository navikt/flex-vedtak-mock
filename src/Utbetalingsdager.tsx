import { DayOfWeek } from '@js-joda/core'
import React, { useEffect, useState } from 'react'

import { sprefUtbetalingTilArbeidsgiverOppdrag } from './SprefUtbetaling'
import { useAppStore } from './stores/app-store'
import { OppdragDto, UtbetalingdagDto } from './types/VedtakV2'


export default () => {
    const { utbetalingsdager, setUtbetalingsdager, sprefUtbetaling } = useAppStore()
    const [ brukUtbetalingsdager, setBrukUtbetalingsdager ] = useState(false)

    useEffect(() => {
        if (brukUtbetalingsdager) {
            const arbeidsgiverOppdrag = sprefUtbetalingTilArbeidsgiverOppdrag(sprefUtbetaling!)
            setUtbetalingsdager(skapUtbetalingsdager(arbeidsgiverOppdrag))
        }
        else {
            setUtbetalingsdager([])
        }
    }, [ brukUtbetalingsdager, setUtbetalingsdager, sprefUtbetaling ])

    function skapUtbetalingsdager(oppdrag: OppdragDto): UtbetalingdagDto[] {
        const dager: UtbetalingdagDto[] = []
        let arbeidsgiverperiode = 16

        oppdrag.utbetalingslinjer.forEach((linje) => {
            let dag = linje.fom
            while(dag <= linje.tom) {
                if (arbeidsgiverperiode-- > 0) {
                    dager.push({ dato: dag, type: 'ArbeidsgiverperiodeDag', begrunnelser: [] })
                }
                else if (dag.dayOfWeek() === DayOfWeek.SATURDAY || dag.dayOfWeek() === DayOfWeek.SUNDAY) {
                    dager.push({ dato: dag, type: 'NavHelgDag', begrunnelser: [] })
                }
                else {
                    dager.push({ dato: dag, type: 'NavDag', begrunnelser: [] })
                }
                dag = dag.plusDays(1)
            }
        })

        return dager
    }

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Utbetalingsdager:
                <input type={'checkbox'} checked={brukUtbetalingsdager} onChange={(e) => {
                    setBrukUtbetalingsdager(e.target.checked)
                }} />
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {utbetalingsdager.map((ut, idx) => {
                    return (
                        <div key={idx} style={{ border: '1px solid', padding: '1em', display: 'grid' }}>
                            {ut.dato.toString()}
                            <select id={ut.dato.toString()}
                                defaultValue={ut.type}
                                onChange={(event) => {
                                    const nyeDager = utbetalingsdager.map(dag => {
                                        if (dag.dato.toString() === event.target.id) {
                                            dag.type = event.target.value
                                        }
                                        return dag
                                    })
                                    setUtbetalingsdager(nyeDager)
                                }}
                            >
                                <option value="NavDag">NavDag</option>
                                <option value="NavHelgDag">NavHelgDag</option>
                                <option value="ArbeidsgiverperiodeDag">ArbeidsgiverperiodeDag</option>
                                <option value="Arbeidsdag">Arbeidsdag</option>
                                <option value="Fridag">Fridag</option>
                                <option value="AvvistDag">AvvistDag</option>
                                <option value="ForeldetDag">ForeldetDag</option>
                                <option value="UkjentDag">UkjentDag</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

