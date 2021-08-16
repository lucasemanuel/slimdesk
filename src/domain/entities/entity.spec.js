class Entity {
  constructor ({ id = undefined }) {
    this.id = id
  }
}

describe('Entity', () => {
  test('should contain id undefined or string', () => {
    let sut = new Entity({ id: undefined })
    expect(sut.id).toBeUndefined()

    sut = new Entity({ id: 'any_id' })
    expect(sut.id).toBeTruthy()
  })
})
