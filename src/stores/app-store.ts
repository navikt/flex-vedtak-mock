import { LocalDate } from '@js-joda/core'
import constate from 'constate'
import { useState } from 'react'

import { Inntektsmelding } from '../types/Inntektsmelding'
import { Soknad } from '../types/Soknad'
import { Sykmelding } from '../types/Sykmelding'
import { FomTom, UtbetalingDto } from '../types/Vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ utbetalinger, setUtbetalinger ] = useState<UtbetalingDto[]>([])
    const [ valgteSykmeldinger, setValgteSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgteSoknader, setValgteSoknader ] = useState<Soknad[]>([])
    const [ valgteInntektsmeldinger, setValgteInntektsmeldinger ] = useState<Inntektsmelding[]>([])
    const [ fodselsnummer, setFodselsnummer ] = useState<string>('')
    const [ forbrukteSykedager, setForbrukteSykedager ] = useState<number>(0)
    const [ gjenstaendeSykedager, setGjenstaendeSykedager ] = useState<number>(195)
    const [ fomTom, setFomTom ] = useState<FomTom>({
        fom: LocalDate.now().minusDays(14),
        tom: LocalDate.now().minusDays(2)
    })

    return {
        utbetalinger, setUtbetalinger,
        valgteSykmeldinger, setValgteSykmeldinger,
        valgteSoknader, setValgteSoknader,
        valgteInntektsmeldinger, setValgteInntektsmeldinger,
        fodselsnummer, setFodselsnummer,
        forbrukteSykedager, setForbrukteSykedager,
        gjenstaendeSykedager, setGjenstaendeSykedager,
        fomTom, setFomTom
    }
})
