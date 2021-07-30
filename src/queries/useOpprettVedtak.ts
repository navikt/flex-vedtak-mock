import { useMutation, useQueryClient } from 'react-query'

import env from '../utils/environment'
import { authenticatedFetch } from '../utils/fetch'

export default function() {
    const queryClient = useQueryClient()

    return useMutation<string, Error, string>(
        (vedtak) => {
            return authenticatedFetch(
                `${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/vedtak`,
                async(data) => {
                    return data as string
                },
                'POST',
                true,
                { 'Content-Type': 'application/json' },
                vedtak
            )
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries('vedtak')
                window.alert(data)
            }
        }
    )
}


