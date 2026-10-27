'use strict'

const { writeFileSync } = require('node:fs')
const { join } = require('node:path')

const whoops = require('..')

const RUNS = 7
const OPS = 150_000

const MESSAGE = 'Resource not found'
const CODE = 'ENOTFOUND'
const CAUSE = new Error('socket hang up')

const NotFound = whoops('NotFound')

const constructCase = (name, create, check) => ({
  name,
  run: () => {
    let last
    for (let i = 0; i < OPS; i++) last = create()
    check(last)
  }
})

const expect = (condition, message) => {
  if (!condition) throw new Error(message)
}

const expectMessage = (error, message) =>
  expect(error.message === message, `unexpected message ${JSON.stringify(error.message)}`)

const CASES = [
  constructCase(
    'native new Error',
    () => new Error(MESSAGE),
    error => expectMessage(error, MESSAGE)
  ),
  constructCase(
    'whoops from string',
    () => NotFound(MESSAGE),
    error => {
      expectMessage(error, MESSAGE)
      expect(error.name === 'NotFound', `unexpected name ${error.name}`)
    }
  ),
  constructCase(
    'whoops from object with code',
    () => NotFound({ message: MESSAGE, code: CODE }),
    error => {
      expectMessage(error, `${CODE}, ${MESSAGE}`)
      expect(error.code === CODE, `unexpected code ${error.code}`)
    }
  ),
  constructCase(
    'whoops with cause',
    () => NotFound({ message: MESSAGE, cause: CAUSE }),
    error => {
      expectMessage(error, MESSAGE)
      expect(error.cause === CAUSE, 'cause not attached')
    }
  )
]

const median = values => {
  const sorted = values.slice().sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const sample = entry => {
  const walls = []
  let errors = 0
  for (let run = 0; run < RUNS; run++) {
    const started = process.hrtime.bigint()
    try {
      entry.run()
      walls.push(Number(process.hrtime.bigint() - started) / 1e6)
    } catch (error) {
      errors++
      console.error(`${entry.name} run ${run}`, error)
    }
  }
  return walls.length
    ? { med: median(walls), min: Math.min(...walls), max: Math.max(...walls), errors }
    : { med: Number.NaN, min: Number.NaN, max: Number.NaN, errors }
}

const report = (entry, result) => {
  const min = result.min.toFixed(1)
  const max = result.max.toFixed(1)
  const extra = `work ${OPS} constructions, errors ${result.errors}, runs ${RUNS}`
  console.log(`${entry.name}  median ${result.med.toFixed(1)}ms  range ${min}-${max}  ${extra}`)
  return {
    name: entry.name,
    unit: 'ms',
    value: Number(result.med.toFixed(1)),
    range: `${min}-${max}`,
    extra
  }
}

const main = () => {
  const results = []
  let errors = 0
  for (const entry of CASES) {
    try {
      entry.run()
    } catch (error) {
      errors++
      console.error(`${entry.name} warmup`, error)
    }
    const result = sample(entry)
    errors += result.errors
    results.push(report(entry, result))
  }
  writeFileSync(
    join(__dirname, '..', 'benchmark-output.json'),
    JSON.stringify(results, null, 2) + '\n'
  )
  if (errors > 0 || results.some(result => !Number.isFinite(result.value))) {
    process.exitCode = 1
  }
}

main()
