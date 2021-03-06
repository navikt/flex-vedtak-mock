import { DayOfWeek, LocalDate } from '@js-joda/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { v4 } from 'uuid'

import { useAppStore } from './stores/app-store'
import { Soknad } from './types/Soknad'
import { SprefVariant } from './types/SprefVariant'
import { FomTom, UtbetalingDto, UtbetalingslinjeDto } from './types/VedtakV1'
import { OppdragDto } from './types/VedtakV2'
import { Utbetaling } from './Utbetaling'


function SprefUtbetaling() {

    const { dagsats, fomTom, valgteSoknader, sprefvariant, setSprefvariant, forbrukteSykedager, setForbrukteSykedager, sprefUtbetaling, setSprefUtbetaling } = useAppStore()
    const [ dagerInkludertIFomTom, setDagerInkludertIFomTom ] = useState<number>(finnDagerInkludertIFomTom(fomTom))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const varianterSomTrengerLangPeriode: SprefVariant[] = [ 'opphold-midt-i', '80% og 100%' ]
    const langPeriode = 10

    useEffect(() => {
        const sprefUtbetaling = skapSprefUtbetaling(dagsats, fomTom, valgteSoknader, sprefvariant)
        const sykedagerFraUtbetalingslinjer = totalSykedagerFraUtbetalingslinjer(sprefUtbetaling.utbetalingslinjer)
        if (forbrukteSykedager < sykedagerFraUtbetalingslinjer) {
            setForbrukteSykedager(sykedagerFraUtbetalingslinjer)
        }
        setSprefUtbetaling(sprefUtbetaling)
    }, [ dagsats, fomTom, setSprefUtbetaling, valgteSoknader, sprefvariant, forbrukteSykedager, setForbrukteSykedager ])

    useEffect(() => {
        setDagerInkludertIFomTom(finnDagerInkludertIFomTom(fomTom))
    }, [ fomTom, setDagerInkludertIFomTom ])

    const handleOptionChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
        setSprefvariant(changeEvent.target.value as SprefVariant)
    }

    interface RadiovalgProps {
        navn: string;
        sprefVariant: SprefVariant;
    }

    useEffect(() => {
        if (dagerInkludertIFomTom < langPeriode && varianterSomTrengerLangPeriode.includes(sprefvariant)) {
            setSprefvariant('100%')
        }
    }, [ dagerInkludertIFomTom, fomTom, setSprefvariant, sprefvariant, varianterSomTrengerLangPeriode ])

    const RadioValg = ({ navn, sprefVariant }: RadiovalgProps) => {
        if (varianterSomTrengerLangPeriode.includes(sprefVariant) && dagerInkludertIFomTom < langPeriode) {
            return null
        }
        return (<div className="radio">
            <label>
                <input type="radio" value={sprefVariant}
                    checked={sprefvariant === sprefVariant}
                    onChange={handleOptionChange} />
                {navn}
            </label>
        </div>)
    }

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>

            <h2 style={{ display: 'inline' }}>Utbetaling til arbeidsgiver</h2>
            <form>
                <RadioValg navn={'100% uten opphold'} sprefVariant={'100%'} />
                <RadioValg navn={'Opphold midt i 100%'} sprefVariant={'opphold-midt-i'} />
                <RadioValg navn={'80% uten opphold'} sprefVariant={'80%'} />
                <RadioValg navn={'Kombinert 80 og 100%'} sprefVariant={'80% og 100%'} />
            </form>

            <Utbetaling key={sprefUtbetaling?._id} utbetaling={sprefUtbetaling} />
        </div>
    )
}


export default SprefUtbetaling


function finnDagerInkludertIFomTom(fomTom: FomTom): number {
    return fomTom.tom.toEpochDay() - fomTom.fom.toEpochDay() + 1
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


function genererUtbetalingslinjeDto(dagsats: number, fom: LocalDate, tom: LocalDate, grad: number): UtbetalingslinjeDto {

    const beløp = Math.floor(dagsats * grad / 100)
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

function genererUtbetalingslinjeDtoListe(dagsats: number, fomTom: FomTom, sprefVariant: SprefVariant): UtbetalingslinjeDto[] {
    const dagerInkludertIFomTom = finnDagerInkludertIFomTom(fomTom)
    switch (sprefVariant) {
        case '100%':
        case '80%': {
            let grad = 100
            if (sprefVariant === '80%') {
                grad = 80
            }
            return [ genererUtbetalingslinjeDto(dagsats, fomTom.fom, fomTom.tom, grad) ]
        }
        case '80% og 100%': {
            const førsteTom = fomTom.fom.plusDays(Math.floor(dagerInkludertIFomTom / 2))
            const nesteFom = førsteTom.plusDays(1)
            return [
                genererUtbetalingslinjeDto(dagsats, fomTom.fom, førsteTom, 80),
                genererUtbetalingslinjeDto(dagsats, nesteFom, fomTom.tom, 100)
            ]
        }
        case 'opphold-midt-i': {
            const tredjedel = Math.floor(dagerInkludertIFomTom / 3)
            const førsteTom = fomTom.fom.plusDays(tredjedel)
            const nesteFom = førsteTom.plusDays(tredjedel)
            return [
                genererUtbetalingslinjeDto(dagsats, fomTom.fom, førsteTom, 100),
                genererUtbetalingslinjeDto(dagsats, nesteFom, fomTom.tom, 100)
            ]
        }

    }
    window.alert('Ukjent spref variant!!')
    throw Error('Ukjent spref variant')
}

function totalbeløpFraUtbetalingslinjer(utbetalingslinjer: UtbetalingslinjeDto[]): number {
    return utbetalingslinjer.reduce((a, b) => {
        return a + (b.beløp * b.sykedager)
    }, 0)
}

function totalSykedagerFraUtbetalingslinjer(utbetalingslinjer: UtbetalingslinjeDto[]): number {
    return utbetalingslinjer.reduce((a, b) => {
        return a + b.sykedager
    }, 0)
}

export function skapSprefUtbetaling(dagsats: number, fomTom: FomTom, valgteSoknader: Soknad[], sprefVariant: SprefVariant) {
    const utbetalingslinjer = genererUtbetalingslinjeDtoListe(dagsats, fomTom, sprefVariant)
    return {
        _id: v4(),
        mottaker: valgteSoknader[0]?.arbeidsgiver?.orgnummer || 'org-nr',
        fagområde: 'SPREF',
        totalbeløp: totalbeløpFraUtbetalingslinjer(utbetalingslinjer),
        utbetalingslinjer: utbetalingslinjer
    }
}


export function sprefUtbetalingTilArbeidsgiverOppdrag(sprefUtbetaling: UtbetalingDto): OppdragDto {
    const utbetalingslinjerV2 = sprefUtbetaling.utbetalingslinjer.map((ut) => {
        return {
            fom: ut.fom,
            tom: ut.tom,
            dagsats: ut.beløp,
            totalbeløp: ut.beløp * ut.sykedager,
            grad: ut.grad,
            stønadsdager: ut.sykedager
        }
    })

    return {
        mottaker: sprefUtbetaling.mottaker,
        fagområde: sprefUtbetaling.fagområde,
        fagsystemId: v4(),
        nettoBeløp: sprefUtbetaling.totalbeløp,
        utbetalingslinjer: utbetalingslinjerV2
    }
}
