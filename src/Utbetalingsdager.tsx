import { DayOfWeek } from '@js-joda/core'
import React, { Dispatch, useEffect } from 'react'

import { FomTom } from './types/VedtakV1'
import { OppdragDto, UtbetalingdagDto, UtbetalingslinjeDto } from './types/VedtakV2'


interface Props {
    utbetalingsdager: UtbetalingdagDto[],
    setUtbetalingsdager: Dispatch<React.SetStateAction<UtbetalingdagDto[]>>,
    oppdrag: OppdragDto[],
    fomTom: FomTom,
}


export default ({ utbetalingsdager, setUtbetalingsdager, oppdrag, fomTom }: Props) => {


    useEffect(() => {
        const utbetalingsLinjer = oppdrag.flatMap((o) => o.utbetalingslinjer)
        setUtbetalingsdager(skapUtbetalingsdager(utbetalingsLinjer))

        // eslint-disable-next-line
    }, [ setUtbetalingsdager, oppdrag ])

    function skapUtbetalingsdager(utbetalingslinjer: UtbetalingslinjeDto[]): UtbetalingdagDto[] {
        const dager: UtbetalingdagDto[] = []
        let dag = fomTom.fom

        utbetalingslinjer.forEach((linje) => {
            dag = linje.fom
            while (dag <= linje.tom) {
                if (dag.dayOfWeek() === DayOfWeek.SATURDAY || dag.dayOfWeek() === DayOfWeek.SUNDAY) {
                    dager.push({ dato: dag, type: 'NavHelgDag', begrunnelser: [] })
                } else {
                    dager.push({ dato: dag, type: 'NavDag', begrunnelser: [] })
                }
                dag = dag.plusDays(1)
            }
        })

        return dager
    }

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
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
                                <option value="Feriedag">Feriedag</option>
                                <option value="Permisjonsdag">Permisjonsdag</option>
                                <option value="ForeldetDag">ForeldetDag</option>
                                <option value="AvvistDag" id="SykepengedagerOppbrukt">Avvist - SykepengedagerOppbrukt
                                </option>
                                <option value="AvvistDag" id="SykepengedagerOppbruktOver67">Avvist -
                                    SykepengedagerOppbrukt - Over 67
                                </option>
                                <option value="AvvistDag" id="MinimumInntekt">Avvist - MinimumInntekt</option>
                                <option value="AvvistDag" id="MinimumInntektOver67">Avvist - MinimumInntekt - Over 67
                                </option>
                                <option value="AvvistDag" id="EgenmeldingUtenforArbeidsgiverperiode">Avvist -
                                    EgenmeldingUtenforArbeidsgiverperiode
                                </option>
                                <option value="AvvistDag" id="MinimumSykdomsgrad">Avvist - MinimumSykdomsgrad</option>
                                <option value="AvvistDag" id="ManglerOpptjening">Avvist - ManglerOpptjening</option>
                                <option value="AvvistDag" id="ManglerMedlemskap">Avvist - ManglerMedlemskap</option>
                                <option value="AvvistDag" id="EtterDødsdato">Avvist - EtterDødsdato</option>
                                <option value="AvvistDag" id="Over70">Avvist - Over70</option>
                                <option value="UkjentDag">UkjentDag</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

