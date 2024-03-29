import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { mockBackend } from './mock/mock'
import env from './utils/environment'

if (env.isMockBackend) {
    mockBackend()
}


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

