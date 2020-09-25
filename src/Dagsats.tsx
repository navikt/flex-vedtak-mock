import React from 'react'

import { useAppStore } from './stores/app-store'


export default () => {
    const { setDagsats, dagsats } = useAppStore()


    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Dagsats:
                <input type={'number'} min={0} step={1} max={5000} value={dagsats} onChange={(e) => {
                    setDagsats(Number(e.target.value))
                }} /></label>
        </div>
    )
}

