import React from 'react'

import { useAppStore } from './stores/app-store'

function Fodselsnummer() {
    const { fodselsnummer } = useAppStore()

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <h2>{'Fødselsnummer: ' + fodselsnummer}</h2>
        </div>
    )
}

export default Fodselsnummer
