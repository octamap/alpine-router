import loadRoute from "./loadRoute.js";

window.router = {
    /** Navigate to a new path (adds entry in history stack) */
    push(path: string) {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new Event('popstate')); // Trigger route reload
    },
    /** Replace the current path (no history entry added) */
    replace(path: string) {
        window.history.replaceState({}, "", path);
        window.dispatchEvent(new Event('popstate')); // Trigger route reload
    }
}

document.addEventListener('alpine:init', () => {
    window.Alpine.store('router', {
        path: window.location.pathname, // Initial path
    });

    // 🌟 Alpine Magic Helper for Router
    window.Alpine.magic('router', () => {
        return {
            ...window.router,
            /** Get the current path */
            get path() {
                return window.Alpine.store<{ path: string }>('router').path;
            },
        };
    });


    let isRouting = false; // Prevent recursive calls

    // 🌟 Dynamic Router Initialization
    const initializeRouters = () => {
        if (isRouting) return; // Prevent recursive execution
        isRouting = true;

        const routerElements = document.querySelectorAll('[router]');

        routerElements.forEach(async el => {
            // Skip if the element is inside <template id="default-route">
            const isInsideDefaultRoute = el.closest('#default-route') !== null;

            if (isInsideDefaultRoute) {
                console.warn('[router] Skipping element inside <template id="default-route">', el);
                return; // Skip this element
            }

            // Proceed with routing
            const routerName = el.getAttribute('router');
            if (routerName) {
                loadRoute(el, routerName);
            }
        });
        isRouting = false;
    };

    // Listen for history changes (back/forward button navigation)
    window.addEventListener('popstate', () => {
        window.Alpine.store<{ path: string }>('router').path = window.location.pathname;
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