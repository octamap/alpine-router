const key = "x-ofn";
const idKey = "x-glc";
let nextId = 0;

const defaultContent = new Map<string, string>()

/**
 * Loads the appropriate HTML content based on the current window path.
 * @param element - The DOM element to load content into.
 * @param name - The base name used to construct the fetch URL.
 */
export default async function loadRoute(element: Element, name: string): Promise<void> {
    try {
        // 1. Get the current window path
        const path = window.location.pathname;
        const currentPath = element.getAttribute(key);
        const elementRouterId = element.getAttribute(idKey) ?? (() => { 
            nextId++;
            element.setAttribute(idKey, nextId.toString())
            return nextId.toString()
        })();

        // If the path hasn't changed, do nothing
        if (currentPath === path) return;

        // Handle the root path "/"
        if (path === "/") {
            element.setAttribute(key, path);

            if (currentPath === null) {
                return;
            }
            element.innerHTML = defaultContent.get(elementRouterId) ?? "";
            return;
        }

        // Construct the URL to fetch the route's HTML
        const fetchUrl = `/${name}${path}.html`;

        try {
            const response = await fetch(fetchUrl);

            // Update the stored path
            element.setAttribute(key, path);

            if (!response.ok) {
                throw new Error(`Failed to fetch ${fetchUrl}: ${response.status} ${response.statusText}`);
            }

            let html = await response.text();

            // Check if a default template already exists
            let defaultTemplate = defaultContent.get(elementRouterId)
            if (!defaultTemplate) {
                defaultContent.set(elementRouterId, element.innerHTML)
            }

            // Update the element's inner HTML with the fetched content
            element.innerHTML = html;
            
        } catch (fetchError) {
            element.setAttribute(key, path);
            console.error('[router] Error loading route:', fetchError);

            // Display a 404 error message
            element.innerHTML = `<h2>404 - Not Found</h2>`;
        }
    } catch (error) {
        console.error('[router] Unexpected error:', error);
    }
}