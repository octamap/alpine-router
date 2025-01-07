// types.ts
/// <reference path="./src/alpine-router.d.ts" />
import AlpineRouter from "./AlpineRouter.ts"


declare global {
    interface Window {
        router: AlpineRouter
    }
}


export type {
    AlpineRouter
}