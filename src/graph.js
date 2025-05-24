import fs from 'fs'
import path from 'path'
import { extractImports } from './utils.js'
import { dirname } from 'path';
import { init, parse } from 'es-module-lexer'

const testPath = "./test1.js"

function parse(entry) {
    const entryPath = path.resolve(dirname(entry))
    const code = fs.readFileSync(entryPath, 'utf-8')
    const deps = extractImports(code);

    return {
        deps,
        code,
        entryPath
    }
}

async function buildGraph(entry) {
    await init
    const graph = {}
    const visited = new Set()

    async function walk(filepath) {
        const absPath = path.resolve(filepath)
        if (visited.has(absPath)) return
        visited.add(absPath)

        const code = fs.readFileSync(absPath, 'utf-8')
        const [imports] = parse(code)

        const deps = imports.map((i) => {
            return path.resolve(path.dirname(absPath), code.slice(i.s, i.e))
        })

        graph[absPath] = deps

        for (const dep of deps) {
            await walk(dep)
        }
    }

    await walk(entry)

    return graph
}

buildGraph(testPath)