import React from 'react'

interface Props {
    dagsats: number,
    setDagsats: (b: number) => void
}

export default ({ setDagsats, dagsats }: Props) => {

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <label>Dagsats:
                <input type={'number'} min={0} step={1} max={5000} value={dagsats} onChange={(e) => {
                    setDagsats(Number(e.target.value))
                }} /></label>
            <br />
            <label>Sykepengegrunnlag: {dagsats * 260}</label>
        </div>
    )
}

