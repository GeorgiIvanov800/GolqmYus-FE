export const logger = {
  error: (error: unknown): void => {
    console.error('There was an ERROR: ', error)
  },
  log: (message: unknown): void => {
    console.log('Logger log: ', message)
  },
}
