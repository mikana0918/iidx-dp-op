import consola, { Consola, LogLevel } from 'consola'
import { Logger } from '~/logging/loggers/types/index'

export const logger: Logger = consola

export const setConsolaLogLevel = ({
  consola,
  logLevel,
}: {
  consola: Logger
  logLevel: LogLevel
}): Consola => {
  consola.level = logLevel

  return consola
}
