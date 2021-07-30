import React from 'react'

import useFodselsnummer from './queries/useFodselsnummer'


function Fodselsnummer() {


    const { data: fodselsnummer } = useFodselsnummer()

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <h2>{'Fødselsnummer: ' + fodselsnummer}</h2>
        </div>
    )
}

export default Fodselsnummer
