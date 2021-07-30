import { useQuery } from 'react-query'

import env from '../utils/environment'
import { authenticatedGet } from '../utils/fetch'

export default function() {
    return useQuery<string, Error>('fodselsnummer', () =>
        authenticatedGet(
            `${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/fnr`,
            async(maybeSykmeldinger) => {
                return maybeSykmeldinger as string
            },
            true,
        ),
    )
}

