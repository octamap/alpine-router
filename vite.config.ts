// cjs, es
import * as path from 'path'
import { defineConfig } from "vite";
import pkg from "./package.json";
import dts from "vite-plugin-dts"

type ModulesMap = Record<string, {
    types?: string;
    import?: string;
    require?: string;
    default?: string;
}>;


const exports: ModulesMap | undefined = (pkg as any).exports

function getName(key: string) {
    if (key === "" || key === ".") return "index"
    if (key.startsWith("./")) {
        key = key.slice(2)
    }
    return key
}

const entry: Record<string, string> = {}
const input: Record<string, string> = {}

if (exports) {
    for (const [key, paths] of Object.entries(exports)) {
        if (key.includes("types")) continue;
        if (!paths.default) continue;
        const name = getName(key)
        entry[name] = paths.default
        input[name] = path.resolve(__dirname, paths.default)
    }
}

const packageNames: string[] = []

const pkgAny = pkg as any

if ("dependencies" in pkgAny) {
    packageNames.push(...Object.keys(pkgAny.dependencies))
}

if ("peerDependencies" in pkgAny) {
    packageNames.push(...Object.keys(pkgAny.peerDependencies))
}

export default defineConfig({
    base: "./",
    plugins: [
        dts({
            entryRoot: "src",
            outDir: "dist",
            include: ["src"],
            exclude: ["node_modules", "dist"],
            copyDtsFiles: true,
        })
    ],
    build: {
        outDir: "dist",
     
        lib: {
            entry,
            "name": "OctamapAlpineLibrary",
            formats: ["iife"],
            fileName: () => "index.js"
        },
        rollupOptions: {
            input,
            external: (id, a) => {
                if (a == undefined) return false;
                if (id.includes("node_modules")) return true;
                if (id.startsWith("@")) {
                    return packageNames.some(x => id.startsWith(x))
                }
                return !a.startsWith(__dirname)
            }
        },
    }
});