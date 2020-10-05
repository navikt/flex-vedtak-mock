import { LocalDate } from '@js-joda/core'
import constate from 'constate'
import { useState } from 'react'

import { Inntektsmelding } from '../types/Inntektsmelding'
import { Soknad } from '../types/Soknad'
import { SprefVariant } from '../types/SprefVariant'
import { Sykmelding } from '../types/Sykmelding'
import { FomTom } from '../types/Vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ fikk401, setFikk401 ] = useState<boolean>(false)
    const [ dagsats, setDagsats ] = useState<number>(1404)
    const [ sprefvariant, setSprefvariant ] = useState<SprefVariant>('100%')
    const [ valgteSykmeldinger, setValgteSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgteSoknader, setValgteSoknader ] = useState<Soknad[]>([])
    const [ valgteInntektsmeldinger, setValgteInntektsmeldinger ] = useState<Inntektsmelding[]>([])
    const [ fodselsnummer, setFodselsnummer ] = useState<string>('')
    const [ forbrukteSykedager, setForbrukteSykedager ] = useState<number>(0)
    const [ gjenstaendeSykedager, setGjenstaendeSykedager ] = useState<number>(195)
    const [ automatiskBehandling, setAutomatiskBehandling ] = useState<boolean>(true)

    const [ fomTom, setFomTom ] = useState<FomTom>({
        fom: LocalDate.now().minusDays(14),
        tom: LocalDate.now().minusDays(2)
    })

    return {
        fikk401, setFikk401,
        dagsats, setDagsats,
        sprefvariant, setSprefvariant,
        valgteSykmeldinger, setValgteSykmeldinger,
        valgteSoknader, setValgteSoknader,
        valgteInntektsmeldinger, setValgteInntektsmeldinger,
        fodselsnummer, setFodselsnummer,
        forbrukteSykedager, setForbrukteSykedager,
        gjenstaendeSykedager, setGjenstaendeSykedager,
        automatiskBehandling, setAutomatiskBehandling,
        fomTom, setFomTom
    }
})
