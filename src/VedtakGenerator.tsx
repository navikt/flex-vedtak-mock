import { LocalDate } from '@js-joda/core'
import React, { useState } from 'react'

import AutomatiskBehandling from './AutomatiskBehandling'
import Datoer from './Datoer'
import EksisterendeVedtak from './EksisterendeVedtak'
import Fodselsnummer from './Fodselsnummer'
import { Inntekter } from './Inntekter'
import { Orgnummer } from './Orgnummer'
import SendSomNyttVedtak from './SendSomNyttVedtak'
import SlettVedtak from './SlettVedtak'
import SprefUtbetaling from './SprefUtbetaling'
import Sykedager from './Sykedager'
import { SprefVariant } from './types/SprefVariant'
import { FomTom } from './types/VedtakV1'
import {
    Begrensning,
    GrunnlagForSykepengegrunnlagPerArbeidsgiver,
    OppdragDto,
    UtbetalingdagDto
} from './types/VedtakV2'
import Utbetalingsdager from './Utbetalingsdager'
import Utbetalingstype from './Utbetalingstype'


function VedtakGenerator() {

    const [ automatiskBehandling, setAutomatiskBehandling ] = useState<boolean>(true)
    const [ månedsinntekt, setMånedsinntekt ] = useState<number>(37500)
    const [ ekstraArbeidsgivere, setEkstraArbeidsgivere ] = useState<GrunnlagForSykepengegrunnlagPerArbeidsgiver>({})
    const [ dagsats, setDagsats ] = useState<number>(1404)
    const [ sykepengegrunnlag, setSykepengegrunnlag ] = useState<number>(0)
    const [ grunnlagForSykepengegrunnlag, setGrunnlagForSykepengegrunnlag ] = useState<number>(0)
    const [ begrensning, setBegrensning ] = useState<Begrensning>('VET_IKKE')
    const [ orgnummer, setOrgnummer ] = useState<string>('967170232')
    const [ sprefvariant, setSprefvariant ] = useState<SprefVariant>('100%')
    const [ forbrukteSykedager, setForbrukteSykedager ] = useState<number>(0)
    const [ gjenstaendeSykedager, setGjenstaendeSykedager ] = useState<number>(195)
    const [ foreløpigBeregnetSluttPåSykepenger, setForeløpigBeregnetSluttPåSykepenger ] = useState<LocalDate>(LocalDate.now())
    const [ oppdrag, setOppdrag ] = useState<OppdragDto[]>([])
    const [ utbetalingsdager, setUtbetalingsdager ] = useState<UtbetalingdagDto[]>([])
    const [ utbetalingstype, setUtbetalingstype ] = useState<string>('UTBETALING')
    const [ vedtakFattetTidspunkt, setVedtakFattetTidspunkt ] = useState<LocalDate>(LocalDate.now())

    const [ fomTom, setFomTom ] = useState<FomTom>({
        fom: LocalDate.now().minusDays(14),
        tom: LocalDate.now().minusDays(2)
    })


    return (

        <div style={{
            margin: 'auto',
            width: '70%',
            paddingTop: '3em',
            fontFamily: '"Courier New", Courier, monospace'
        }}>
            <h1 style={{ textAlign: 'center' }}>Vedtak testdatagenerator</h1>
            <Fodselsnummer />

            <Datoer
                fomTom={fomTom}
                setFomTom={setFomTom}
            />
            <Orgnummer
                orgnummer={orgnummer}
                setOrgnummer={setOrgnummer}
            />
            <Inntekter
                orgnummer={orgnummer}
                månedsinntekt={månedsinntekt}
                dagsats={dagsats}
                setDagsats={setDagsats}
                setMånedsinntekt={setMånedsinntekt}
                ekstraArbeidsgivere={ekstraArbeidsgivere}
                setEkstraArbeidsgivere={setEkstraArbeidsgivere}
                begrensning={begrensning}
                setBegrensning={setBegrensning}
                sykepengegrunnlag={sykepengegrunnlag}
                setSykepengegrunnlag={setSykepengegrunnlag}
                grunnlagForSykepengegrunnlag={grunnlagForSykepengegrunnlag}
                setGrunnlagForSykepengegrunnlag={setGrunnlagForSykepengegrunnlag}
                setVedtakFattetTidspunkt={setVedtakFattetTidspunkt}
            />
            <AutomatiskBehandling
                automatiskBehandling={automatiskBehandling}
                setAutomatiskBehandling={setAutomatiskBehandling} />
            <SprefUtbetaling
                setOppdrag={setOppdrag}
                oppdrag={oppdrag}
                setForbrukteSykedager={setForbrukteSykedager}
                dagsats={dagsats}
                orgnr={orgnummer}
                forbrukteSykedager={forbrukteSykedager}
                fomTom={fomTom}
                setSprefvariant={setSprefvariant}
                sprefvariant={sprefvariant} />
            <Utbetalingsdager
                oppdrag={oppdrag}
                setUtbetalingsdager={setUtbetalingsdager}
                utbetalingsdager={utbetalingsdager}
                fomTom={fomTom}

            />
            <Utbetalingstype
                utbetalingstype={utbetalingstype}
                setUtbetalingstype={setUtbetalingstype} />
            <Sykedager
                setGjenstaendeSykedager={setGjenstaendeSykedager}
                gjenstaendeSykedager={gjenstaendeSykedager}
                setForbrukteSykedager={setForbrukteSykedager}
                forbrukteSykedager={forbrukteSykedager}
                setForeløpigBeregnetSluttPåSykepenger={setForeløpigBeregnetSluttPåSykepenger}
                foreløpigBeregnetSluttPåSykepenger={foreløpigBeregnetSluttPåSykepenger}
                fomTom={fomTom}
            />
            <SendSomNyttVedtak
                automatiskBehandling={automatiskBehandling}
                månedsinntekt={månedsinntekt}
                forbrukteSykedager={forbrukteSykedager}
                ekstraArbeidsgivere={ekstraArbeidsgivere}
                gjenstaendeSykedager={gjenstaendeSykedager}
                utbetalingstype={utbetalingstype}
                fomTom={fomTom}
                orgnummer={orgnummer}
                oppdrag={oppdrag}
                utbetalingsdager={utbetalingsdager}
                sykepengegrunnlag={sykepengegrunnlag}
                grunnlagForSykepengegrunnag={grunnlagForSykepengegrunnlag}
                begrensning={begrensning}
                foreløpigBeregnetSluttPåSykepenger={foreløpigBeregnetSluttPåSykepenger}
                vedtakFattetTidspunkt={vedtakFattetTidspunkt}
            />
            <SlettVedtak />
            <EksisterendeVedtak />
        </div>
    )
}

export default VedtakGenerator
