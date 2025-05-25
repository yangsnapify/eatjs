import fs from 'fs';
import path from 'path';
import { extractImports } from './utils.js';

const testPath = path.resolve('./test/index.js');

function resolver(entry) {
    const entryPath = path.resolve(entry);
    const code = fs.readFileSync(entryPath, 'utf-8');
    const deps = extractImports(code);
    return {
        deps,
        code,
        entryPath,
    };
}

const graph = new Map()

function buildGraph(entry) {
    const absoluteEntry = path.resolve(path.dirname(entry), entry);
    if (graph.has(absoluteEntry)) return;
    const result = resolver(absoluteEntry);
    graph.set(absoluteEntry, result);

    for (const relativeImport of result.deps) {
        const depPath = path.resolve(path.dirname(absoluteEntry), relativeImport);
        buildGraph(depPath);
    }
}

buildGraph(testPath)

for (const [key, val] of graph.entries()) {
    console.log(`\n ${key}`);
    console.log(val.deps);
}

export {
    buildGraph
}