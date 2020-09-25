import React from 'react'

import { UtbetalingDto, UtbetalingslinjeDto } from '../types/Vedtak'


interface UtbetalingslinjeProps {
    utbetalingslinje: UtbetalingslinjeDto;

}

function Utbetalingslinje({ utbetalingslinje }: UtbetalingslinjeProps) {

    const style = { marginBlockEnd: 0, marginBlockStart: 0 }
    return (
        <div style={{ border: '1px solid', padding: '1em', fontSize: 12 }}>
            <div style={{ padding: '0.5em', marginBlockEnd: 0 }}>
                <p style={style}><strong>Beløp:</strong>{utbetalingslinje.beløp}</p>
                <p style={style}><strong>Dagsats:</strong>{utbetalingslinje.dagsats}</p>
                <p style={style}><strong>Grad:</strong>{utbetalingslinje.grad}</p>
                <p style={style}><strong>Sykedager:</strong>{utbetalingslinje.sykedager}</p>
                <p style={style}><strong>FOM:</strong>{utbetalingslinje.fom.toString()}</p>
                <p style={style}><strong>TOM:</strong>{utbetalingslinje.tom.toString()}</p>
            </div>
        </div>
    )
}

interface UtbetalingProps {
    utbetaling: UtbetalingDto;

}

export function Utbetaling({ utbetaling }: UtbetalingProps) {
    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <p><strong>Fagområde:</strong>{utbetaling.fagområde}</p>
            <p><strong>Mottaker:</strong>{utbetaling.mottaker}</p>
            <p><strong>Totalbeløp:</strong>{utbetaling.totalbeløp}</p>
            <h3 style={{ display: 'inline' }}>Utbetalingslinjer</h3>
            {utbetaling.utbetalingslinjer.map((ul) => <Utbetalingslinje key={ul._id} utbetalingslinje={ul} />)}
        </div>
    )
}

