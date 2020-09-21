import React from 'react'

import Datoer from './Datoer'
import Fodselsnummer from './Fodselsnummer'
import Inntektsmeldinger from './Inntektsmeldinger'
import SendVedtak from './SendVedtak'
import SlettVedtak from './SlettVedtak'
import Soknader from './Soknader'
import StoreProvider from './stores/store-provider'
import Sykedager from './Sykedager'
import Sykmeldinger from './Sykmeldinger'
import Utbetalinger  from './Utbetalinger'


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
                <Fodselsnummer />
                <Sykmeldinger />
                <Soknader />
                <Inntektsmeldinger />
                <Datoer />
                <Utbetalinger />
                <Sykedager />
                <SendVedtak />
                <SlettVedtak />
            </div>
        </StoreProvider>
    )
}

export default App
