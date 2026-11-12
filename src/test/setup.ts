/**
 * Global test setup — executed once before the Vitest test suite runs.
 *
 * 1. Registers @testing-library/jest-dom custom matchers (toBeInTheDocument,
 *    toHaveTextContent, etc.) so they are available in every component test.
 * 2. Configures fast-check to run a minimum of 100 iterations per property
 *    by default, as required by the Testing Strategy in the design document.
 *
 * The 100-iteration floor applies to every property-based test automatically.
 * Individual tests may raise the count by passing `{ numRuns: N }` to
 * `fc.assert(...)`; this global setting only changes the default, never the
 * per-test override.
 */
import '@testing-library/jest-dom'
import { configureGlobal } from 'fast-check'

configureGlobal({ numRuns: 100 })
