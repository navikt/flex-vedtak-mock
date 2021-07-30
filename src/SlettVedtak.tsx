import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import env from './utils/environment'

interface Props {
    setTriggFetchVedtak: (b: string) => void
    fodselsnummer: string
}

function SlettVedtak({ setTriggFetchVedtak, fodselsnummer }: Props) {

    const [ fetching, setFetching ] = useState(false)

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={fetching} style={{ fontSize: 40 }} onClick={async() => {
                try {
                    setFetching(true)
                    const res = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/vedtak`, {
                        method: 'DELETE',
                        credentials: 'include'
                    })
                    if (res.ok) {
                        const tekst = await res.text()
                        window.alert(tekst)
                        setTriggFetchVedtak(uuid())

                    } else {
                        window.alert('Noe gikk galt ved sletting av vedtak')
                    }
                } finally {
                    setFetching(false)
                }

            }}>Slett alle vedtak på {fodselsnummer} <span role={'img'} aria-label={'Wastebasket'}>🗑️️</span>
            </button>
        </div>
    )
}

export default SlettVedtak
