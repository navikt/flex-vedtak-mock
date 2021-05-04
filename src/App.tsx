import React from 'react'

import AutomatiskBehandling from './AutomatiskBehandling'
import Dagsats from './Dagsats'
import Datoer from './Datoer'
import EksisterendeVedtak from './EksisterendeVedtak'
import FeilmeldingInnlogging from './FeilmeldingInnlogging'
import Fodselsnummer from './Fodselsnummer'
import Månedsinntekt from './Månedsinntekt'
import SendSomNyttVedtak from './SendSomNyttVedtak'
import SendVedtak from './SendVedtak'
import SlettVedtak from './SlettVedtak'
import Soknader from './Soknader'
import SprefUtbetaling from './SprefUtbetaling'
import SpUtbetaling from './SpUtbetaling'
import StoreProvider from './stores/store-provider'
import Sykedager from './Sykedager'
import Sykmeldinger from './Sykmeldinger'
import Utbetalingsdager from './Utbetalingsdager'


function App() {


    return (
        <StoreProvider>
            <div style={{
                margin: 'auto',
                width: '70%',
                paddingTop: '3em',
                fontFamily: '"Courier New", Courier, monospace'
            }}>
                <h1 style={{ textAlign: 'center' }}>Vedtak testdatagenerator</h1>
                <FeilmeldingInnlogging />
                <Fodselsnummer />
                <Sykmeldinger />
                <Soknader />
                <Datoer />
                <Dagsats />
                <Månedsinntekt />
                <AutomatiskBehandling />
                <SprefUtbetaling />
                <SpUtbetaling />
                <Utbetalingsdager />
                <Sykedager />
                <SendVedtak />
                <SendSomNyttVedtak />
                <SlettVedtak />
                <EksisterendeVedtak />
            </div>
        </StoreProvider>
    )
}

export default App
