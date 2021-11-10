class Environment {

    private env = (window as any)._env_;

    get isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    get isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    get isMockBackend() {
        return this.env.MOCK_BACKEND === 'true'
    }

    get flexInternGatewayRoot() {
        return this.env.FLEX_INTERN_GATEWAY_ROOT
    }

    get flexGatewayRoot() {
        return this.env.FLEX_GATEWAY_ROOT
    }
}

const env = new Environment()

export default env
