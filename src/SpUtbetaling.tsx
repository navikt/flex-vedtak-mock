import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import useFodselsnummer from './queries/useFodselsnummer'
import { UtbetalingDto } from './types/VedtakV1'
import { Utbetaling } from './Utbetaling'


function SpUtbetaling() {
    const { data: fodselsnummer } = useFodselsnummer()

    const [ utbetaling, setUtbetaling ] = useState<UtbetalingDto>(skapSpUtbetaling(fodselsnummer))

    useEffect(() => {
        if (fodselsnummer)
            setUtbetaling(skapSpUtbetaling(fodselsnummer))
    }, [ setUtbetaling, fodselsnummer ])


    return (
        <div style={{ border: '1px solid', padding: '1em' }}>

            <h2 style={{ display: 'inline' }}>Utbetaling til bruker</h2>


            <Utbetaling key={utbetaling._id} utbetaling={utbetaling} />
        </div>
    )
}


export default SpUtbetaling

export function skapSpUtbetaling(fnr: string | undefined) {

    return {
        _id: v4(),
        mottaker: fnr || 'byttes',
        fagområde: 'SP',
        totalbeløp: 0,
        utbetalingslinjer: []
    }
}
