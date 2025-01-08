
let cached: {path: string, routerName: string, htmlPromise: Promise<string>, timeout?: any } | undefined

export default async function fetchRoute(routerName: string, path: string) {
    if (cached?.path == path && cached.routerName == routerName) {
        return cached.htmlPromise
    }
    clearTimeout(cached?.timeout)
    path = path.trim()
    path = path.startsWith("/") ? path.slice(1) : path
    const fetchUrl = `/${routerName}/${path}.html`;
    const htmlPromise = (async () => {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${fetchUrl}: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    })()
    cached = {
        path, routerName, htmlPromise, timeout: setTimeout(() => {
            cached = undefined
        }, 100)
    }
    return htmlPromise
}