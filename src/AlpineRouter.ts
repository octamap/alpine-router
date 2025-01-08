

export default interface AlpineRouter {
    push(path: string, query?: Record<string, string>): void 
    replace(path: string, query?: Record<string, string>): void
    get query(): Record<string, string>
    back() : void
}