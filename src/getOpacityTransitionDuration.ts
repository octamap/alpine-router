
export default function getOpacityTransitionDuration(element: HTMLElement): number {
    const style = window.getComputedStyle(element);
    const transitionProperty = style.transitionProperty.split(', ');
    const transitionDuration = style.transitionDuration.split(', ');
    const opacityIndex = transitionProperty.findIndex(prop => prop === 'opacity');
    if (opacityIndex === -1) {
        return 0;
    }
    const duration = parseFloat(transitionDuration[opacityIndex] || '0') * 1000;
    return duration;
}