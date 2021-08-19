class DomainError extends Error {
  constructor (paramName, detail) {
    let message = `Invalid ${paramName}`
    message = detail ? `${message}: ${detail}` : message
    super(message)
    this.name = 'DomainError'
  }
}

module.exports = DomainError
