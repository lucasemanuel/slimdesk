const GenerateId = require('./generateId')
const uuid = require('uuid')

jest.mock('uuid', () => ({
  id: '',
  v4 () { return this.id }
}))

describe('Generate Id', () => {
  test('should return an id', () => {
    uuid.id = 'any_id'
    const id = GenerateId.generate()
    expect(id).toBe('any_id')
  })
})
