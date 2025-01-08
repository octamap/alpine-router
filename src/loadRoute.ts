import fetchRoute from "./fetchRoute.js";
import getOpacityTransitionDuration from "./getOpacityTransitionDuration.js";

const key = "x-ofn";
const idKey = "x-glc";
let nextId = 0;

const defaultContent = new Map<string, string>()

/**
 * Loads the appropriate HTML content based on the current window path.
 * @param element - The DOM element to load content into.
 * @param routerName - The base name used to construct the fetch URL.
 */
export default async function loadRoute(element: Element, routerName: string): Promise<void> {
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
        if (currentPath == null) {
            defaultContent.set(elementRouterId, element.innerHTML)
        }

        // Handle the root path "/"
        element.setAttribute(key, path);
        if (path === "/" && currentPath == null) {
            return;
        }

        // Apply transition 
        const transition = element.getAttribute("router-transition")
        if (transition == "fade" && element instanceof HTMLElement) {
            element.style.opacity = "0";
            await new Promise(resolve => setTimeout(resolve, getOpacityTransitionDuration(element)))
        }

        // Set to default content
        if (path == "/") {
            element.innerHTML = defaultContent.get(elementRouterId) ?? "";
            if (element instanceof HTMLElement) {
                window.Alpine.initTree(element)
            }
            return;
        }

        try {
            // Update the stored path
            element.innerHTML = await fetchRoute(routerName, path);
            if (element instanceof HTMLElement) {
                window.Alpine.initTree(element)
            }
        } catch (fetchError) {
            element.setAttribute(key, path);
            console.error('[router] Error loading route:', fetchError);

            // Display a 404 error message
            element.innerHTML = `<h2>404 - Not Found</h2>`;
        }
    } catch (error) {
        console.error('[router] Unexpected error:', error);
    } finally {
        setTimeout(() => {
            if (element instanceof HTMLElement) element.style.opacity = "1";
        }, 14);
    }
}