const DomainError = require('./domainError')

describe('Domain Error', () => {
  test('should throw an error', () => {
    expect(() => {
      throw new DomainError('param', 'detail')
    }).toThrow(DomainError)
  })
})
