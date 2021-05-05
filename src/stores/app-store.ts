import { LocalDate } from '@js-joda/core'
import constate from 'constate'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Soknad } from '../types/Soknad'
import { SprefVariant } from '../types/SprefVariant'
import { Sykmelding } from '../types/Sykmelding'
import { FomTom, UtbetalingDto } from '../types/VedtakV1'
import { UtbetalingdagDto } from '../types/VedtakV2'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ fikk401, setFikk401 ] = useState<boolean>(false)
    const [ månedsinntekt, setMånedsinntekt ] = useState<number>(37500)
    const [ dagsats, setDagsats ] = useState<number>(1404)
    const [ sprefvariant, setSprefvariant ] = useState<SprefVariant>('100%')
    const [ valgteSykmeldinger, setValgteSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgteSoknader, setValgteSoknader ] = useState<Soknad[]>([])
    const [ fodselsnummer, setFodselsnummer ] = useState<string>('')
    const [ forbrukteSykedager, setForbrukteSykedager ] = useState<number>(0)
    const [ gjenstaendeSykedager, setGjenstaendeSykedager ] = useState<number>(195)
    const [ automatiskBehandling, setAutomatiskBehandling ] = useState<boolean>(true)
    const [ sprefUtbetaling, setSprefUtbetaling ] = useState<UtbetalingDto>()
    const [ utbetalingsdager, setUtbetalingsdager ] = useState<UtbetalingdagDto[]>([])
    const [ triggFetchVedtak, setTriggFetchVedtak ] = useState<string>(uuid())

    const [ fomTom, setFomTom ] = useState<FomTom>({
        fom: LocalDate.now().minusDays(14),
        tom: LocalDate.now().minusDays(2)
    })

    return {
        fikk401, setFikk401,
        dagsats, setDagsats,
        månedsinntekt, setMånedsinntekt,
        sprefvariant, setSprefvariant,
        valgteSykmeldinger, setValgteSykmeldinger,
        valgteSoknader, setValgteSoknader,
        fodselsnummer, setFodselsnummer,
        forbrukteSykedager, setForbrukteSykedager,
        gjenstaendeSykedager, setGjenstaendeSykedager,
        automatiskBehandling, setAutomatiskBehandling,
        sprefUtbetaling, setSprefUtbetaling,
        utbetalingsdager, setUtbetalingsdager,
        fomTom, setFomTom,
        triggFetchVedtak, setTriggFetchVedtak
    }
})
