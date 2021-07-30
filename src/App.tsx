import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import IkkeInnlogget from './IkkeInnlogget'
import VedtakGenerator from './VedtakGenerator'

function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
                staleTime: Infinity,
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={VedtakGenerator} />
                    <Route path="/ikke-innlogget" component={IkkeInnlogget} />
                </Switch>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
