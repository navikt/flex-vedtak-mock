import React from 'react'

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
import { useAppStore } from './stores/app-store'
import Sykedager from './Sykedager'
import Sykmeldinger from './Sykmeldinger'
import Utbetalingsdager from './Utbetalingsdager'
import Utbetalingstype from './Utbetalingstype'


function App() {

    const { fikk401, fodselsnummer } = useAppStore()


    return (
        <div style={{
            margin: 'auto',
            width: '70%',
            paddingTop: '3em',
            fontFamily: '"Courier New", Courier, monospace'
        }}>
            <h1 style={{ textAlign: 'center' }}>Vedtak testdatagenerator</h1>
            <Fodselsnummer />
            <Vis hvis={fikk401}>
                <FeilmeldingInnlogging />
            </Vis>
            <Vis hvis={fodselsnummer !== ''}>
                <Sykmeldinger />
                <Soknader />
                <Datoer />
                <Dagsats />
                <Månedsinntekt />
                <AutomatiskBehandling />
                <SprefUtbetaling />
                <SpUtbetaling />
                <Utbetalingsdager />
                <Utbetalingstype />
                <Sykedager />
                <SendSomNyttVedtak />
                <SlettVedtak />
                <EksisterendeVedtak />
            </Vis>

        </div>
    )
}

export default App
