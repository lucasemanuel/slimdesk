const MissingParamError = require('./missingParamError')

describe('Missing Param Error', () => {
  test('should throw an error', () => {
    expect(() => {
      throw new MissingParamError('param')
    }).toThrow()
  })
})
