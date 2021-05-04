import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import { useAppStore } from './stores/app-store'
import { UtbetalingDto } from './types/VedtakV1'
import { Utbetaling } from './Utbetaling'


function SpUtbetaling() {

    const { fodselsnummer } = useAppStore()
    const [ utbetaling, setUtbetaling ] = useState<UtbetalingDto>(skapSpUtbetaling(fodselsnummer))

    useEffect(() => {
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

export function skapSpUtbetaling(fnr: string) {
    return {
        _id: v4(),
        mottaker: fnr,
        fagområde: 'SP',
        totalbeløp: 0,
        utbetalingslinjer: []
    }
}
