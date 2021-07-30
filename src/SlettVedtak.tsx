import React from 'react'

import useFodselsnummer from './queries/useFodselsnummer'
import useSlettVedtak from './queries/useSlettVedtak'


function SlettVedtak() {

    const { data: fodselsnummer } = useFodselsnummer()
    const { mutate: slettVedtak, isLoading } = useSlettVedtak()

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={isLoading} style={{ fontSize: 40 }} onClick={async() => {
                slettVedtak()
            }}>Slett alle vedtak på {fodselsnummer} <span role={'img'} aria-label={'Wastebasket'}>🗑️️</span>
            </button>
        </div>
    )
}

export default SlettVedtak
