export function extractImports(code) {
    const importRegex = /import\s+(?:[^'"]*?\s+from\s+)?['"](.+?)['"]/g;
    const deps = [];
    let match;
    while ((match = importRegex.exec(code)) !== null) {
        deps.push(match[1]);
    }
    return deps;
}
