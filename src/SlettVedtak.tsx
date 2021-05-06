import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useAppStore } from './stores/app-store'
import env from './utils/environment'


function SlettVedtak() {

    const [ fetching, setFetching ] = useState(false)
    const { setTriggFetchVedtak, fodselsnummer } = useAppStore()

    return (
        <div style={{ paddingTop: '1em' }}>
            <button disabled={fetching} style={{ fontSize: 40 }} onClick={async() => {
                if (!fodselsnummer) {
                    window.alert('Fødselsnummer er ikke satt')
                    return
                }
                try {
                    setFetching(true)
                    const res = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/mock/vedtak/${fodselsnummer}`, {
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
