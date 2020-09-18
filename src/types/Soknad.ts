export interface Soknad {
    fom: string;
    tom: string;
    id: string;
    soknadstype: string;
    status: string;
    sykmeldingId: string;
    arbeidsgiver?: {
        orgnummer?: string;
    };
}


