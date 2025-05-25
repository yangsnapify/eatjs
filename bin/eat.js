#!/usr/bin/env node

import path from 'path'
import { buildGraph } from '../src/graph.js'

const entry = process.argv[2]
if (!entry) {
  console.error('请指定入口文件，例如: eat ./test/index.js')
  process.exit(1)
} else {
  console.log(process.argv)
}


const absPath = path.resolve(process.cwd(), entry)