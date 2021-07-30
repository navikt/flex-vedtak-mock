import { useQuery } from 'react-query'

import { RSVedtakWrapper } from '../types/VedtakV2'
import env from '../utils/environment'
import { authenticatedFetch } from '../utils/fetch'

export default function() {
    return useQuery<RSVedtakWrapper[], Error>('vedtak', () =>
        authenticatedFetch(
            `${env.flexGatewayRoot}/spinnsyn-backend/api/v2/vedtak`,
            async(data) => {
                return data as RSVedtakWrapper[]
            },
        ),
    )
}

