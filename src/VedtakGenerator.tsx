import { LocalDate } from '@js-joda/core'
import React, { useState } from 'react'

import AutomatiskBehandling from './AutomatiskBehandling'
import Dagsats from './Dagsats'
import Datoer from './Datoer'
import EksisterendeVedtak from './EksisterendeVedtak'
import Fodselsnummer from './Fodselsnummer'
import Månedsinntekt from './Månedsinntekt'
import { Orgnummer } from './Orgnummer'
import SendSomNyttVedtak from './SendSomNyttVedtak'
import SlettVedtak from './SlettVedtak'
import SprefUtbetaling from './SprefUtbetaling'
import SpUtbetaling from './SpUtbetaling'
import Sykedager from './Sykedager'
import { SprefVariant } from './types/SprefVariant'
import { FomTom, UtbetalingDto } from './types/VedtakV1'
import { UtbetalingdagDto } from './types/VedtakV2'
import Utbetalingsdager from './Utbetalingsdager'
import Utbetalingstype from './Utbetalingstype'


function VedtakGenerator() {

    const [ automatiskBehandling, setAutomatiskBehandling ] = useState<boolean>(true)
    const [ månedsinntekt, setMånedsinntekt ] = useState<number>(37500)
    const [ dagsats, setDagsats ] = useState<number>(1404)
    const [ orgnummer, setOrgnummer ] = useState<string>('967170232')
    const [ sprefvariant, setSprefvariant ] = useState<SprefVariant>('100%')
    const [ forbrukteSykedager, setForbrukteSykedager ] = useState<number>(0)
    const [ gjenstaendeSykedager, setGjenstaendeSykedager ] = useState<number>(195)
    const [ sprefUtbetaling, setSprefUtbetaling ] = useState<UtbetalingDto>()
    const [ utbetalingsdager, setUtbetalingsdager ] = useState<UtbetalingdagDto[]>([])
    const [ utbetalingstype, setUtbetalingstype ] = useState<string>('UTBETALING')

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
            <Dagsats
                dagsats={dagsats}
                setDagsats={setDagsats} />
            <Månedsinntekt
                månedsinntekt={månedsinntekt}
                setMånedsinntekt={setMånedsinntekt} />
            <AutomatiskBehandling
                automatiskBehandling={automatiskBehandling}
                setAutomatiskBehandling={setAutomatiskBehandling} />
            <SprefUtbetaling
                setSprefUtbetaling={setSprefUtbetaling}
                sprefUtbetaling={sprefUtbetaling}
                setForbrukteSykedager={setForbrukteSykedager}
                dagsats={dagsats}
                orgnr={orgnummer}
                forbrukteSykedager={forbrukteSykedager}
                fomTom={fomTom}
                setSprefvariant={setSprefvariant}
                sprefvariant={sprefvariant} />
            <SpUtbetaling />
            <Utbetalingsdager
                sprefUtbetaling={sprefUtbetaling}
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
            />
            <SendSomNyttVedtak
                automatiskBehandling={automatiskBehandling}
                månedsinntekt={månedsinntekt}
                forbrukteSykedager={forbrukteSykedager}
                gjenstaendeSykedager={gjenstaendeSykedager}
                utbetalingstype={utbetalingstype}
                fomTom={fomTom}
                orgnummer={orgnummer}
                sprefUtbetaling={sprefUtbetaling}
                utbetalingsdager={utbetalingsdager}
            />
            <SlettVedtak />
            <EksisterendeVedtak />
        </div>
    )
}

export default VedtakGenerator
