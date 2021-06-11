import {
  logger as consola,
  setConsolaLogLevel,
} from '~/logging/loggers/consola/index'

/**
 * Consola LogLevel
 * @see ~/node_modules/consola/types/consola.d.ts > LogLevel
 *
 * Fatal/Error: 0
 * Warn: 1
 * Log: 2
 * Info/Success: 3
 * Debug: 4
 * Trace: 5
 */
const defaultLogger = consola

/**
 * Provide Strategy for logging method.
 * (i.e.)
 * - Change logging handler based on env
 * - Set loglevel based on env
 * - etc
 */
export const loggingStrategy = () => {
  if (process.env.ENV === 'local') {
    const l = setConsolaLogLevel({ consola: defaultLogger, logLevel: 5 })

    return l
  } else if (process.env.ENV === 'production') {
    const l = setConsolaLogLevel({ consola: defaultLogger, logLevel: 3 })

    return l
  }

  return defaultLogger
}
