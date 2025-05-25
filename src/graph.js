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

function buildGraph(entry, graph = new Map()) {
    const absoluteEntry = path.resolve(entry);
    if (graph.has(absoluteEntry)) return;
    const result = resolver(absoluteEntry);
    graph.set(absoluteEntry, result);

    for (const relativeImport of result.deps) {
        const depPath = path.resolve(path.dirname(absoluteEntry), relativeImport);
        buildGraph(depPath, graph);
    }

    return graph;
}

const graph = buildGraph(testPath);

for (const [key, val] of graph.entries()) {
    console.log(`\n ${key}`);
    console.log(val.deps);
}
