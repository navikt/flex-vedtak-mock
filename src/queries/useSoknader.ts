import { useQuery } from 'react-query'

import { Soknad } from '../types/Soknad'
import env from '../utils/environment'
import { authenticatedFetch } from '../utils/fetch'

export default function() {
    return useQuery<Soknad[], Error>('soknader', () =>
        authenticatedFetch(
            `${env.flexGatewayRoot}/syfosoknad/api/soknader`,
            async(data) => {
                return data as Soknad[]
            },
        ),
    )
}

