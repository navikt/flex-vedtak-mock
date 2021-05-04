import { LocalDate } from '@js-joda/core'

export interface VedtakFattetForEksternDto {
    fødselsnummer: string;
    aktørId: string;
    organisasjonsnummer: string;
    fom: LocalDate;
    tom: LocalDate;
    skjæringstidspunkt: LocalDate;
    dokumenter: Dokument[];
    inntekt: number;
    sykepengegrunnlag: number;
    utbetalingId?: string;
}

export interface UtbetalingUtbetalt {
    event: string;  // utbetaling_utbetalt, utbetaling_uten_utbetaling
    utbetalingId: string;
    fødselsnummer: string;
    aktørId: string;
    organisasjonsnummer: string;
    fom: LocalDate;
    tom: LocalDate;
    forbrukteSykedager: number;
    gjenståendeSykedager: number;
    automatiskBehandling: boolean;
    arbeidsgiverOppdrag: OppdragDto;
    type: string; // UTBETALING, ETTERUTBETALING, ANNULLERING, REVURDERING
    utbetalingsdager: UtbetalingdagDto[];
}

export interface OppdragDto {
    mottaker: string;
    fagområde: string;
    fagsystemId: string;
    nettoBeløp: number;
    utbetalingslinjer: UtbetalingslinjeDto[];
}

export interface UtbetalingslinjeDto {
    fom: LocalDate;
    tom: LocalDate;
    dagsats: number;
    totalbeløp: number;
    grad: number;
    stønadsdager: number;
}

export interface UtbetalingdagDto {
    dato: LocalDate;
    type: string;
}

interface Dokument {
    dokumentId: string;
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding';
}
