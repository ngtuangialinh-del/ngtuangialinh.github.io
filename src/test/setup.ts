import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'
import fc from 'fast-check'
// vitest-axe@0.1.0 ships a broken .d.ts for this export (typed as type-only
// even though it is a runtime value); import as unknown and re-type locally.
import * as axeMatchers from 'vitest-axe/matchers'

expect.extend({
  toHaveNoViolations: (axeMatchers as unknown as {
    toHaveNoViolations: (results: unknown) => { pass: boolean; message: () => string }
  }).toHaveNoViolations,
})

fc.configureGlobal({
  seed: Number(process.env.FC_SEED ?? 20260919),
  numRuns: 100,
})

afterEach(() => {
  cleanup()
})

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => undefined
}

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0)
  window.cancelAnimationFrame = (frameId) => window.clearTimeout(frameId)
}
