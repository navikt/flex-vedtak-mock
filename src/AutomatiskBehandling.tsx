import React from 'react'

import { useAppStore } from './stores/app-store'


export default () => {
    const { setAutomatiskBehandling, automatiskBehandling } = useAppStore()


    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Automatisk behandling:

                <input type={'checkbox'} checked={automatiskBehandling} onChange={(e) => {
                    setAutomatiskBehandling(e.target.checked)
                }} /></label>
        </div>
    )
}

