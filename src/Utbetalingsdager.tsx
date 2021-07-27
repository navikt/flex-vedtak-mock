import { DayOfWeek, LocalDate } from '@js-joda/core'
import React, { useEffect, useState } from 'react'

import { sprefUtbetalingTilArbeidsgiverOppdrag } from './SprefUtbetaling'
import { useAppStore } from './stores/app-store'
import { OppdragDto, UtbetalingdagDto } from './types/VedtakV2'


export default () => {
    const { utbetalingsdager, setUtbetalingsdager, sprefUtbetaling, valgteSykmeldinger } = useAppStore()
    const [ brukUtbetalingsdager, setBrukUtbetalingsdager ] = useState(true)

    useEffect(() => {
        if (brukUtbetalingsdager) {
            const arbeidsgiverOppdrag = sprefUtbetalingTilArbeidsgiverOppdrag(sprefUtbetaling!)
            setUtbetalingsdager(skapUtbetalingsdager(arbeidsgiverOppdrag))
        }
        else {
            setUtbetalingsdager([])
        }
        // eslint-disable-next-line
    }, [ brukUtbetalingsdager, setUtbetalingsdager, sprefUtbetaling ])

    function skapUtbetalingsdager(oppdrag: OppdragDto): UtbetalingdagDto[] {
        const dager: UtbetalingdagDto[] = []
        let arbeidsgiverperiode = 16
        let dag = valgteSykmeldinger[0]?.syketilfelleStartDato
            ? LocalDate.parse(valgteSykmeldinger[0].syketilfelleStartDato.toISOString().split('T')[0])
            : oppdrag.utbetalingslinjer[0].fom

        while(dag < oppdrag.utbetalingslinjer[0].fom && arbeidsgiverperiode-- > 0) {
            dager.push({ dato: dag, type: 'ArbeidsgiverperiodeDag', begrunnelser: [] })
            dag = dag.plusDays(1)
        }

        oppdrag.utbetalingslinjer.forEach((linje) => {
            dag = linje.fom
            while(dag <= linje.tom) {
                if (dag.dayOfWeek() === DayOfWeek.SATURDAY || dag.dayOfWeek() === DayOfWeek.SUNDAY) {
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
                                            if (dag.type === 'AvvistDag') {
                                                dag.begrunnelser = [ event.target.selectedOptions[0].id ]
                                            }
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
                                <option value="ForeldetDag">ForeldetDag</option>
                                <option value="AvvistDag" id="SykepengedagerOppbrukt">Avvist - SykepengedagerOppbrukt</option>
                                <option value="AvvistDag" id="MinimumInntekt">Avvist - MinimumInntekt</option>
                                <option value="AvvistDag" id="EgenmeldingUtenforArbeidsgiverperiode">Avvist - EgenmeldingUtenforArbeidsgiverperiode</option>
                                <option value="AvvistDag" id="MinimumSykdomsgrad">Avvist - MinimumSykdomsgrad</option>
                                <option value="AvvistDag" id="ManglerOpptjening">Avvist - ManglerOpptjening</option>
                                <option value="AvvistDag" id="ManglerMedlemskap">Avvist - ManglerMedlemskap</option>
                                <option value="AvvistDag" id="EtterDødsdato">Avvist - EtterDødsdato</option>
                                <option value="UkjentDag">UkjentDag</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

