import { DayOfWeek, LocalDate } from '@js-joda/core'
import _ from 'lodash'
import cloneDeep from 'lodash.clonedeep'
import React, { useEffect, useReducer } from 'react'
import { v4 } from 'uuid'

import { useAppStore } from './stores/app-store'
import { Soknad } from './types/Soknad'
import { FomTom, UtbetalingDto, UtbetalingslinjeDto } from './types/Vedtak'


interface UtbetalingslinjeProps {
    utbetalingslinje: UtbetalingslinjeDto;

}

function Utbetalingslinje({ utbetalingslinje }: UtbetalingslinjeProps) {


    const style = { marginBlockEnd: 0, marginBlockStart: 0 }
    return (
        <div style={{ border: '1px solid', padding: '1em', fontSize: 12 }}>
            <div style={{ padding: '0.5em', marginBlockEnd: 0 }}>
                <p style={style}><strong>Beløp:</strong>{utbetalingslinje.beløp}</p>
                <p style={style}><strong>Dagsats:</strong>{utbetalingslinje.dagsats}</p>
                <p style={style}><strong>Grad:</strong>{utbetalingslinje.grad}</p>
                <p style={style}><strong>Sykedager:</strong>{utbetalingslinje.sykedager}</p>
                <p style={style}><strong>FOM:</strong>{utbetalingslinje.fom.toString()}</p>
                <p style={style}><strong>TOM:</strong>{utbetalingslinje.tom.toString()}</p>
            </div>
        </div>
    )
}

interface UtbetalingProps {
    utbetaling: UtbetalingDto;

}

function Utbetaling({ utbetaling }: UtbetalingProps) {

    const { utbetalinger, setUtbetalinger, fomTom, setForbrukteSykedager } = useAppStore()

    useEffect(() => {
        const sykedager = utbetalinger.reduce((sum, utbetaling) => sum + utbetaling.utbetalingslinjer.reduce((dager, linje) => dager + linje.sykedager, 0), 0)
        setForbrukteSykedager(sykedager)
    }, [ utbetalinger, setForbrukteSykedager ])

    const nyUtbetaling = () => {
        const oppdatertUtbetaling = cloneDeep(utbetaling)
        oppdatertUtbetaling.utbetalingslinjer.push(genererUtbetalingslinjeDto(utbetalinger, fomTom))
        oppdatertUtbetaling.totalbeløp = totalbeløpFraUtbetalingslinjer(oppdatertUtbetaling.utbetalingslinjer)
        utbetaling.utbetalingslinjer.push()
        const oppdaterteUtbetalinger = utbetalinger.map((u) => {
            if (u._id === oppdatertUtbetaling._id) {
                return oppdatertUtbetaling
            } else {
                return u
            }
        })
        setUtbetalinger(oppdaterteUtbetalinger)
    }

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <p><strong>Fagområde:</strong>{utbetaling.fagområde}</p>
            <p><strong>Mottaker:</strong>{utbetaling.mottaker}</p>
            <p><strong>Totalbeløp:</strong>{utbetaling.totalbeløp}</p>
            <h3 style={{ display: 'inline' }}>Utbetalingslinjer</h3>

            <button style={{ marginLeft: '1em', marginBottom: '1em' }} onClick={() => nyUtbetaling()}>+</button>


            {utbetaling.utbetalingslinjer.map((ul) => <Utbetalingslinje key={ul._id} utbetalingslinje={ul} />)}
        </div>
    )
}


function Utbetalinger() {

    const { utbetalinger, setUtbetalinger, fomTom, valgteSoknader } = useAppStore()
    const [ , forceUpdate ] = useReducer(x => x + 1, 0)

    const nyUtbetaling = () => {
        utbetalinger.push(genererUtbetalingDto(utbetalinger, fomTom, valgteSoknader))
        setUtbetalinger(utbetalinger)
        forceUpdate()
    }

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>

            <h2 style={{ display: 'inline' }}>Utbetalinger</h2>

            <button style={{ marginLeft: '1em', marginBottom: '1em' }} onClick={() => nyUtbetaling()}>+</button>


            {utbetalinger.map((u) => <Utbetaling key={u._id} utbetaling={u} />)}
        </div>
    )
}


export default Utbetalinger

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function dagerSomErSykedager(fom: LocalDate, tom: LocalDate) {
    let dag = fom
    let dager = 0
    while (!dag.isAfter(tom)) {
        if (dag.dayOfWeek() !== DayOfWeek.SATURDAY && dag.dayOfWeek() !== DayOfWeek.SUNDAY) {
            dager += 1
        }
        dag = dag.plusDays(1)
    }
    return dager
}

function finnForsteLedigeDag(brukteDager: Set<number>, fomTom: FomTom): number {
    const fom = fomTom.fom.toEpochDay()
    const tom = fomTom.tom.toEpochDay()
    let dag = fom
    while(brukteDager.has(dag) && dag < tom) { dag += 1 }
    return dag
}

function finnSenesteTom(brukteDager: Set<number>, fomTom: FomTom, start: number): number {
    const fom = start
    const tom = fomTom.tom.toEpochDay()
    let dag = fom
    while(!brukteDager.has(dag + 1) && dag < tom) { dag += 1 }
    return dag
}

function genererUtbetalingslinjeDto(utbetalinger: UtbetalingDto[], fomTom: FomTom): UtbetalingslinjeDto {
    const brukteDager = new Set<number>(utbetalinger.flatMap(u => u.utbetalingslinjer.flatMap(ul => _.range(ul.fom.toEpochDay(), ul.tom.toEpochDay() + 1, 1))))
    const tidligsteLedigFom = finnForsteLedigeDag(brukteDager, fomTom)
    const senesteGyldigeTom = finnSenesteTom(brukteDager, fomTom, tidligsteLedigFom)

    const fom = LocalDate.ofEpochDay(randomIntFromInterval(tidligsteLedigFom, senesteGyldigeTom))
    const tom = LocalDate.ofEpochDay(randomIntFromInterval(fom.toEpochDay(), senesteGyldigeTom))
    const dagsats = randomIntFromInterval(10, 1200)
    const grad = randomIntFromInterval(20, 100)
    const beløp = dagsats * grad / 100
    const sykedager = dagerSomErSykedager(fom, tom)
    return {
        fom: fom,
        tom: tom,
        dagsats: dagsats,
        beløp: beløp,
        grad: grad,
        sykedager: sykedager
    }
}

export function totalbeløpFraUtbetalingslinjer(utbetalingslinjer: UtbetalingslinjeDto[]): number {
    return utbetalingslinjer.reduce((a, b) => {
        return a + (b.beløp * b.sykedager)
    }, 0)
}


export function genererUtbetalingDto(utbetalinger: UtbetalingDto[], fomTom: FomTom, valgteSoknader: Soknad[]): UtbetalingDto {

    const utbetalingslinjer = [ genererUtbetalingslinjeDto(utbetalinger, fomTom) ]
    return {
        _id: v4(),
        mottaker: valgteSoknader[0]?.arbeidsgiver?.orgnummer || 'org-nr',
        fagområde: 'SPREF',
        totalbeløp: totalbeløpFraUtbetalingslinjer(utbetalingslinjer),
        utbetalingslinjer: utbetalingslinjer
    }
}
