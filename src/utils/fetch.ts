export async function authenticatedFetch<T>(url: string, cb: (data: unknown) => Promise<T>, method = 'GET', text = false, headers?: any, body?: string): Promise<T> {
    const res = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: headers,
        body: body
    })
    if (res.ok) {
        try {
            if (text) {
                return await cb(await res.text())
            }
            return await cb(await res.json())
        } catch (error) {
            throw new Error(
                'Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med oss hvis det ikke har løst seg til i morgen.',
            )
        }
    }
    if (res.status === 401) {
        window.location.href = '/ikke-innlogget'
        throw new Error('Sesjonen er utløpt. Vi videresender deg til innloggingssiden.')
    }
    const textResponse = await res.text()
    if (res.status === 400) {
        throw new Error(textResponse)
    }
    throw new Error('Vi har problemer med baksystemene for øyeblikket. Vennligst prøv igjen senere.')
}
