import React, { useEffect } from 'react'

import env from './utils/environment'

interface Props {
    fodselsnummer: string,
    setFodselsnummer: (b: string) => void
    setFikk401: (b: boolean) => void
}

function Fodselsnummer({ fodselsnummer, setFodselsnummer, setFikk401 }: Props) {


    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/fnr`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const fnr = await data.text()
                setFodselsnummer(fnr)
            } else {
                if (data.status === 401) {
                    setFikk401(true)
                } else {
                    window.alert('Oops, noe gikk galt ved henting av fnr')
                }
            }
        }

        fetchData().catch((e: any) => {
            // eslint-disable-next-line no-console
            console.error('OIDA', e)
            window.alert(`Ooops, feil. ved fnr fetching! ${e}`)
        }
        )

    }, [ setFodselsnummer, setFikk401 ])

    return (
        <div style={{ border: '1px solid', padding: '1em' }}>
            <h2>{'Fødselsnummer: ' + fodselsnummer}</h2>
        </div>
    )
}

export default Fodselsnummer
