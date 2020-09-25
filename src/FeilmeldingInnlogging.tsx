import React from 'react'

import { useAppStore } from './stores/app-store'


function FeilmeldingInnlogging() {
    const { fikk401 } = useAppStore()


    if (!fikk401) {
        return (<></>)
    }
    return (
        <div style={{ border: '5px solid', borderColor: 'red', padding: '1em' }}>
            <b>Du er ikke logget inn som en bruker i testmiljøet og kan derfor ikke velge relaterte søknader, inntekstmeldinger eller sykmeldinger</b>
        </div>
    )
}

export default FeilmeldingInnlogging
