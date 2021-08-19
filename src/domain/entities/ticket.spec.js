const TicketStatus = require('../constants/ticketStatus')
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
    let sut = new TicketEntity({
      id: 'any_id',
      subject: 'any_subject',
      body: 'any_body',
      createdAt: new Date(),
      status: 'any_status'
    })

    expect(sut).toEqual(expect.objectContaining({
      id: expect.any(String),
      subject: expect.any(String),
      body: expect.any(String),
      createdAt: expect.any(Date),
      status: expect.any(String)
    }))

    sut = new TicketEntity({
      subject: 'any_subject',
      body: 'any_body',
      createdAt: new Date(),
      status: 'any_status'
    })

    expect(sut).toEqual(expect.objectContaining({
      id: undefined,
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
  test('should set late status if ticket is late', () => {
    const sut = new TicketEntity({
      id: 'any_id',
      subject: 'any_subject',
      body: 'any_body',
      createdAt: makeDateWith24HoursLate()
    })
    expect(sut.status).toBe(TicketStatus.LATE_STATUS)
  })
  test.todo('should isLate method return false if ticket is resolved')
})
