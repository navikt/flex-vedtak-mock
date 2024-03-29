import { useQuery } from 'react-query'

import env from '../utils/environment'
import { authenticatedFetch } from '../utils/fetch'

export default function() {
    return useQuery<string, Error>('fodselsnummer', () =>
        authenticatedFetch(
            `${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/fnr`,
            async(data) => {
                return data as string
            },
            'GET',
            true,
        ),
    )
}

