const TicketEntity = require('./ticket')

const makeSut = () => {
  const date = new Date()

  const sut = new TicketEntity({
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
  test('should contain subject, body, criation date and status', () => {
    const { sut, date } = makeSut()

    expect(sut).toEqual({
      subject: 'any_subject',
      body: 'any_body',
      createdAt: date,
      status: 'any_status',
      slaHours: 24
    })
  })
  test('should return true if ticket is late', () => {
    const { sut } = makeSut()
    sut.createdAt = makeDateWith24HoursLate()
    expect(sut.isLate()).toBeTruthy()
  })
})
