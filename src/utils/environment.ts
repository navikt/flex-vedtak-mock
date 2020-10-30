class Environment {

    private env = (window as any)._env_;

    get isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    get isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    get sykmeldingerBackendProxyRoot() {
        return this.env.SYKMELDINGER_BACKEND_PROXY_ROOT
    }

    get spinnsynRoot() {
        return this.env.SPINNSYN_ROOT
    }

    get syfoapiRoot() {
        return this.env.SYFOAPI_ROOT
    }

    get opprettVedtakRoot() {
        return this.env.OPPRETT_VEDTAK_ROOT
    }
}

const env = new Environment()

export default env
