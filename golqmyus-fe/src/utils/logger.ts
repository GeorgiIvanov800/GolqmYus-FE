export const logger = {
  error: (error: unknown): void => {
    console.error(error)
  },
  log: (message: unknown): void => {
    console.log(message)
  },
}
