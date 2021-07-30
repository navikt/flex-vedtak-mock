import { useQuery } from 'react-query'

import { Sykmelding } from '../types/Sykmelding'
import env from '../utils/environment'
import { authenticatedGet } from '../utils/fetch'

export default function() {
    return useQuery<Sykmelding[], Error>('sykmeldinger', () =>
        authenticatedGet(
            `${env.sykmeldingerBackendProxyRoot}/api/v1/sykmeldinger`,
            async(maybeSykmeldinger) => {
                return maybeSykmeldinger as Sykmelding[]
            },
        ),
    )
}

