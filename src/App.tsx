import { LocalDate } from '@js-joda/core'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import AutomatiskBehandling from './AutomatiskBehandling'
import Vis from './components/vis'
import Dagsats from './Dagsats'
import Datoer from './Datoer'
import EksisterendeVedtak from './EksisterendeVedtak'
import FeilmeldingInnlogging from './FeilmeldingInnlogging'
import Fodselsnummer from './Fodselsnummer'
import Månedsinntekt from './Månedsinntekt'
import SendSomNyttVedtak from './SendSomNyttVedtak'
import SlettVedtak from './SlettVedtak'
import Soknader from './Soknader'
import SprefUtbetaling from './SprefUtbetaling'
import SpUtbetaling from './SpUtbetaling'
import Sykedager from './Sykedager'
import Sykmeldinger from './Sykmeldinger'
import { Soknad } from './types/Soknad'
import { SprefVariant } from './types/SprefVariant'
import { Sykmelding } from './types/Sykmelding'
import { FomTom, UtbetalingDto } from './types/VedtakV1'
import { UtbetalingdagDto } from './types/VedtakV2'
import Utbetalingsdager from './Utbetalingsdager'
import Utbetalingstype from './Utbetalingstype'


function App() {

    const [ automatiskBehandling, setAutomatiskBehandling ] = useState<boolean>(true)
    const [ fikk401, setFikk401 ] = useState<boolean>(false)
    const [ månedsinntekt, setMånedsinntekt ] = useState<number>(37500)
    const [ dagsats, setDagsats ] = useState<number>(1404)
    const [ sprefvariant, setSprefvariant ] = useState<SprefVariant>('100%')
    const [ valgteSykmeldinger, setValgteSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgteSoknader, setValgteSoknader ] = useState<Soknad[]>([])
    const [ fodselsnummer, setFodselsnummer ] = useState<string>('')
    const [ forbrukteSykedager, setForbrukteSykedager ] = useState<number>(0)
    const [ gjenstaendeSykedager, setGjenstaendeSykedager ] = useState<number>(195)
    const [ sprefUtbetaling, setSprefUtbetaling ] = useState<UtbetalingDto>()
    const [ utbetalingsdager, setUtbetalingsdager ] = useState<UtbetalingdagDto[]>([])
    const [ triggFetchVedtak, setTriggFetchVedtak ] = useState<string>(uuid())
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
            <Fodselsnummer fodselsnummer={fodselsnummer} setFodselsnummer={setFodselsnummer} setFikk401={setFikk401} />
            <Vis hvis={fikk401}>
                <FeilmeldingInnlogging />
            </Vis>
            <Vis hvis={fodselsnummer !== ''}>
                <Sykmeldinger
                    fikk401={fikk401}
                    setFikk401={setFikk401}
                    valgteSykmeldinger={valgteSykmeldinger}
                    setValgteSykmeldinger={setValgteSykmeldinger} />
                <Soknader fikk401={fikk401}
                    setFikk401={setFikk401}
                    valgteSykmeldinger={valgteSykmeldinger}
                    valgteSoknader={valgteSoknader}
                    setValgteSoknader={setValgteSoknader} />
                <Datoer
                    fomTom={fomTom}
                    setFomTom={setFomTom}
                    valgteSoknader={valgteSoknader}
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
                    forbrukteSykedager={forbrukteSykedager}
                    fomTom={fomTom}
                    valgteSoknader={valgteSoknader}
                    setSprefvariant={setSprefvariant}
                    sprefvariant={sprefvariant} />
                <SpUtbetaling fodselsnummer={fodselsnummer} />
                <Utbetalingsdager
                    sprefUtbetaling={sprefUtbetaling}
                    setUtbetalingsdager={setUtbetalingsdager}
                    valgteSykmeldinger={valgteSykmeldinger}
                    utbetalingsdager={utbetalingsdager}
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
                    setTriggFetchVedtak={setTriggFetchVedtak}
                    fodselsnummer={fodselsnummer}
                    månedsinntekt={månedsinntekt}
                    valgteSykmeldinger={valgteSykmeldinger}
                    valgteSoknader={valgteSoknader}
                    forbrukteSykedager={forbrukteSykedager}
                    gjenstaendeSykedager={gjenstaendeSykedager}
                    utbetalingstype={utbetalingstype}
                    fomTom={fomTom}
                    sprefUtbetaling={sprefUtbetaling}
                    utbetalingsdager={utbetalingsdager}
                />
                <SlettVedtak
                    fodselsnummer={fodselsnummer}
                    setTriggFetchVedtak={setTriggFetchVedtak} />
                <EksisterendeVedtak
                    fikk401={fikk401}
                    fodselsnummer={fodselsnummer}
                    setTriggFetchVedtak={setTriggFetchVedtak}
                    setFikk401={setFikk401}
                    triggFetchVedtak={triggFetchVedtak} />
            </Vis>
        </div>
    )
}

export default App
