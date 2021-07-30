import React from 'react'

interface Props {
    månedsinntekt: number,
    setMånedsinntekt: (b: number) => void
}


export default ({ setMånedsinntekt, månedsinntekt }: Props) => {

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Månedsinntekt:
                <input type={'number'} min={0} step={1} max={200000} value={månedsinntekt} onChange={(e) => {
                    setMånedsinntekt(Number(e.target.value))
                }} /></label>
        </div>
    )
}

