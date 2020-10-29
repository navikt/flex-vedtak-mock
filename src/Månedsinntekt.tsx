import React from 'react'

import { useAppStore } from './stores/app-store'


export default () => {
    const { setMånedsinntekt, månedsinntekt } = useAppStore()


    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Månedsinntekt:
                <input type={'number'} min={0} step={1} max={200000} value={månedsinntekt} onChange={(e) => {
                    setMånedsinntekt(Number(e.target.value))
                }} /></label>
        </div>
    )
}

