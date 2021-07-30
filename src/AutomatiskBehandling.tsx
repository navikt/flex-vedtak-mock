import React from 'react'


interface Props {
    automatiskBehandling: boolean,
    setAutomatiskBehandling: (b: boolean) => void
}

export default ({
    automatiskBehandling,
    setAutomatiskBehandling
}: Props) => {


    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Automatisk behandling:

                <input type={'checkbox'} checked={automatiskBehandling} onChange={(e) => {
                    setAutomatiskBehandling(e.target.checked)
                }} /></label>
        </div>
    )
}

