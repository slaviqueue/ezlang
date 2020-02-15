#!/usr/bin/env node

const fs = require('fs')
const { interpret } = require('./src/interpreter')
const { parser } = require('./src/parser')

const path = process.argv[2]

function run (code) {
  return interpret(parser.parse(code))
}

function runFile (path) {
  const code = fs.readFileSync(path, 'utf-8')
  run(code)
}

runFile(path)
