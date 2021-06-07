import { logger, setConsolaLogLevel } from '~/logging/loggers/consola/index'

const provideArgs = [
  {
    consola: logger,
    logLevel: 0,
  },
]
describe.each(provideArgs)('check consola usage in this project', (args) => {
  it('can set log level for consola', () => {
    const { consola, logLevel } = args

    const c = setConsolaLogLevel({ consola, logLevel })

    expect(c.level).toBe(logLevel)
  })
})
