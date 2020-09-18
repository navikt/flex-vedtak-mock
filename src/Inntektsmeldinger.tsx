import React, { useEffect, useState } from 'react'

import Vis from './components/vis'
import { useAppStore } from './stores/app-store'
import { Inntektsmelding } from './types/Inntektsmelding'
import env from './utils/environment'

function skapTekstFraInntektsmelding(im: Inntektsmelding): string {
    return `${im.id} - ${im.fnr}`
}

function Inntektsmeldinger() {
    const { valgteInntektsmeldinger, setValgteInntektsmeldinger } = useAppStore()

    const [ inntektsmeldinger, setInntektsmeldinger ] = useState<Inntektsmelding[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`${env.flexinntektsmeldingRoot}/api/v1/inntektsmeldinger`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            if (data.ok) {
                const im = await data.json()
                setInntektsmeldinger(im)
            } else {
                if (data.status === 401) {
                    window.alert('Du må logge inn i ditt sykefravaer for å få hentet inntektsmeldinger')
                } else {
                    window.alert('Oops, noe gikk galt ved henting av inntekstmeldinger')
                }
            }
        }

        fetchData().catch((e: any) => window.alert(`Ooops ved henting av inntekstmeldinger! ${e}`))

    }, [ setValgteInntektsmeldinger ])

    return (
        <div style={{ border: '1px solid', paddingBottom: '1em', paddingLeft: '1em' }}>
            <h2>Inntektsmeldinger</h2>
            {inntektsmeldinger.map((im) => {
                return (
                    <div key={im.id}>
                        <label style={{ cursor: 'pointer' }}>
                            <input type={'checkbox'} value={im.id} onChange={(event => {
                                if (event.target.checked) {
                                    valgteInntektsmeldinger.push(inntektsmeldinger.find(i => i.id === event.target.value)!)
                                    setValgteInntektsmeldinger([ ...valgteInntektsmeldinger ])
                                } else {
                                    setValgteInntektsmeldinger(valgteInntektsmeldinger.filter(i => i.id !== event.target.value))
                                }
                            })} />
                            {skapTekstFraInntektsmelding(im)}
                        </label>

                    </div>
                )
            })}
            <Vis hvis={env.isDev}>
                <a href={'http://localhost:1351/'} target={'blank'}> Opprett ny inntektsmelding </a>
            </Vis>
        </div>
    )
}

export default Inntektsmeldinger
