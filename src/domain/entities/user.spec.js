const Entity = require('./entity')

class UserEntity extends Entity {
  constructor ({ id, name, email, phone, password, isActive = true }) {
    super({ id })
    Object.assign(this, { name, email, phone, password, isActive })
  }
}

describe('User Entity', () => {
  test('should contain id, name, email, phone, password and isActive status', () => {
    const sut = new UserEntity({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      password: 'any_password'
    })

    expect(sut).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      password: expect.any(String),
      isActive: expect.any(Boolean)
    }))
  })
})
