import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../utils/environment'


const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})


export function mockBackend() {
    mock.get(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/fnr`,
        (req, res, ctx) => {

            return res(ctx.text('fake-mock-fnr'))
        })

    mock.get(`${env.flexGatewayRoot}/spinnsyn-backend/api/v2/vedtak`,
        (req, res, ctx) => {

            return res(ctx.json([]))
        })

    mock.post(`${env.flexInternGatewayRoot}/spinnsyn-backend-testdata/api/v1/testdata/vedtak`,
        (req, res, ctx) => {

            return res(ctx.json({ hei: 'Dette er bare mocket backend som svarer' }))
        })
}
