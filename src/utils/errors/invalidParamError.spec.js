const InvalidParamError = require('./invalidParamError')

describe('Invalid Param Error', () => {
  test('should throw an error', () => {
    expect(() => {
      throw new InvalidParamError('param')
    }).toThrow()
  })
})
