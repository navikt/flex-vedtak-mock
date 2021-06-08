import React from 'react'

import { useAppStore } from './stores/app-store'


export default () => {
    const { utbetalingstype, setUtbetalingstype } = useAppStore()


    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Utbetalingstype:


                <select
                    defaultValue={utbetalingstype}
                    onChange={(event) => {
                        setUtbetalingstype(event.target.value)
                    }}
                >
                    <option value="UTBETALING">UTBETALING</option>
                    <option value="ETTERUTBETALING">ETTERUTBETALING</option>
                    <option value="ANNULLERING">ANNULLERING</option>
                    <option value="REVURDERING">REVURDERING</option>
                </select>
            </label>
        </div>
    )
}

