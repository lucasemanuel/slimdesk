const TicketEntity = require('./ticket')

const makeSut = () => {
  const date = new Date()

  const sut = new TicketEntity({
    id: 'any_id',
    subject: 'any_subject',
    body: 'any_body',
    createdAt: date,
    status: 'any_status'
  })

  return {
    sut,
    date
  }
}

const makeDateWith24HoursLate = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date
}

describe('Ticket Entity', () => {
  test('should contain id, subject, body, criation date and status', () => {
    const { sut } = makeSut()

    expect(sut).toEqual(expect.objectContaining({
      id: expect.any(String),
      subject: expect.any(String),
      body: expect.any(String),
      createdAt: expect.any(Date),
      status: expect.any(String)
    }))
  })
  test('should return true if ticket is late', () => {
    const { sut } = makeSut()
    sut.createdAt = makeDateWith24HoursLate()
    expect(sut.isLate()).toBeTruthy()
  })
  test('should return false if ticket is not late', () => {
    const { sut } = makeSut()
    sut.createdAt = Date.now()
    expect(sut.isLate()).toBeFalsy()
  })
})
