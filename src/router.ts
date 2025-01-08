import loadRoute from "./loadRoute.js";

function buildURL(path: string, query?: Record<string, string>): string {
    const url = new URL(window.location.origin + path);
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            url.searchParams.set(key, value);
        }
    }
    return url.pathname + url.search; // Return path + query string
}

function parseQuery(): Record<string, string> {
    const query: Record<string, string> = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams.entries()) {
        query[key] = value;
    }
    return query;
}

window.router = {
    /** Navigate to a new path (adds entry in history stack) */
    push(path: string, query?: Record<string, string>) {
        const fullPath = buildURL(path, query);
        window.history.pushState({}, "", fullPath);
        window.dispatchEvent(new Event('popstate')); // Trigger route reload
    },
    /** Replace the current path (no history entry added) */
    replace(path: string, query?: Record<string, string>) {
        const fullPath = buildURL(path, query);
        window.history.replaceState({}, "", fullPath);
        window.dispatchEvent(new Event('popstate'));  // Trigger route reload
    },
    get query(): Record<string, string> {
        return parseQuery();
    },
    back() {
        window.history.back()
    }
}

document.addEventListener('alpine:init', () => {
    window.Alpine.store('router', {
        path: window.location.pathname, // Initial path
        query: parseQuery()
    });

    // 🌟 Alpine Magic Helper for Router
    window.Alpine.magic('router', () => {
        return {
            ...window.router,
            /** Get the current path */
            get path() {
                return window.Alpine.store<{ path: string }>('router').path;
            },
            get query() {
                return window.Alpine.store<{ query: Record<string, string> }>("router").query
            }
        };
    });


    let isRouting = false; // Prevent recursive calls

    // 🌟 Dynamic Router Initialization
    const initializeRouters = async () => {
        if (isRouting) return; // Prevent recursive execution
        isRouting = true;

        const routerElements = document.querySelectorAll('[router]');
        await Promise.all(Array.from(routerElements).map(async el => {
            // Skip if the element is inside <template id="default-route">
            const isInsideDefaultRoute = el.closest('#default-route') !== null;

            if (isInsideDefaultRoute) {
                console.warn('[router] Skipping element inside <template id="default-route">', el);
                return; // Skip this element
            }

            // Proceed with routing
            const routerName = el.getAttribute('router');
            if (routerName) {
                await loadRoute(el, routerName);
            }
        }))

        isRouting = false;
    };

    // Listen for history changes (back/forward button navigation)
    window.addEventListener('popstate', () => {
        const store = window.Alpine.store<{ path: string, query: Record<string, string> }>('router')
        store.path = window.location.pathname;
        store.query = parseQuery();
        initializeRouters();
    });

    // Observe DOM changes for dynamically added router elements
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                initializeRouters();
                break;
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    // Load initial route on page load
    initializeRouters();
});