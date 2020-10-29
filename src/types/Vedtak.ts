import { LocalDate } from '@js-joda/core'

export interface VedtakDto {
    automatiskBehandling: boolean;
    fom: LocalDate;
    tom: LocalDate;
    månedsinntekt: number;
    forbrukteSykedager: number;
    gjenståendeSykedager: number;
    utbetalinger: UtbetalingDto[];
    dokumenter: Dokument[];
}


export interface UtbetalingDto {
    mottaker: string;
    fagområde: string;
    totalbeløp: number;
    utbetalingslinjer: UtbetalingslinjeDto[];
    _id?: string;
}


export interface UtbetalingslinjeDto {
    fom: LocalDate;
    tom: LocalDate;
    dagsats: number;
    beløp: number;
    grad: number;
    sykedager: number;
    _id?: string;
}

interface Dokument {
    dokumentId: string;
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding';
}


export interface FomTom {
    fom: LocalDate;
    tom: LocalDate;
}
