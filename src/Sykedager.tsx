import React, { Dispatch, useEffect } from 'react'

interface Props {
    forbrukteSykedager: number,
    setForbrukteSykedager: Dispatch<React.SetStateAction<number>>,
    gjenstaendeSykedager: number,
    setGjenstaendeSykedager: Dispatch<React.SetStateAction<number>>
}

function Sykedager({ setForbrukteSykedager, setGjenstaendeSykedager, forbrukteSykedager, gjenstaendeSykedager }: Props) {
    const maxSykedager = 195

    useEffect(() => {
        setGjenstaendeSykedager(maxSykedager - forbrukteSykedager)
    }, [ forbrukteSykedager, setGjenstaendeSykedager ])

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <div>
                <label>Forbrukte sykedager:
                    <input value={forbrukteSykedager} type={'number'} min={0} max={10000} onChange={(e) => {
                        setForbrukteSykedager(Number(e.target.value))
                    }} />
                </label>
            </div>
            <div style={{ paddingTop: '1em' }}>
                <label>Gjenstående sykedager:
                    <input value={gjenstaendeSykedager} type={'number'} min={0} max={10000} onChange={(e) => {
                        setGjenstaendeSykedager(Number(e.target.value))
                    }} />
                </label>
            </div>
        </div>
    )
}

export default Sykedager
