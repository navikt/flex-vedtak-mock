import React, { useEffect } from 'react'

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
import env from './utils/environment'


function App() {

    const { fikk401, fodselsnummer, setFodselsnummer, setFikk401 } = useAppStore()

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/fnr`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const fnr = await data.json()
                setFodselsnummer(fnr)
            } else {
                if (data.status === 401) {
                    setFikk401(true)
                } else {
                    window.alert('Oops, noe gikk galt ved henting av fnr')
                }
            }
        }

        fetchData().catch((e: any) => {
            // eslint-disable-next-line no-console
            console.error('OIDA', e)
            window.alert(`Ooops, feil. ved fnr fetching! ${e}`)
        }
        )

    }, [ setFodselsnummer, setFikk401 ])

    return (
        <div style={{
            margin: 'auto',
            width: '70%',
            paddingTop: '3em',
            fontFamily: '"Courier New", Courier, monospace'
        }}>
            <h1 style={{ textAlign: 'center' }}>Vedtak testdatagenerator</h1>
            <Vis hvis={fikk401}>
                <FeilmeldingInnlogging />
            </Vis>
            <Vis hvis={fodselsnummer !== ''}>
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
