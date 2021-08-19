const DomainError = require('../errors/domainError')
const TicketStatus = require('../constants/ticketStatus')
const TicketEntity = require('./ticket')

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
    const sut = TicketEntity.create({
      subject: 'any_subject',
      body: 'any_body',
      createdAt: makeDateWith24HoursLate()
    })
    expect(sut.isLate()).toBeTruthy()
  })
  test('should return false if ticket is not late', () => {
    const sut = TicketEntity.create({
      subject: 'any_subject',
      body: 'any_body'
    })
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
  test('should isLate method return false if ticket is resolved', () => {
    const sut = new TicketEntity({
      id: 'any_id',
      subject: 'any_subject',
      body: 'any_body',
      createdAt: makeDateWith24HoursLate(),
      status: TicketStatus.RESOLVED_STATUS
    })
    expect(sut.isLate()).toBeFalsy()
    expect(sut.status).toBe(TicketStatus.RESOLVED_STATUS)
  })
  test('should create an object with open_status if pass status like undefined', () => {
    const sut = TicketEntity.create({
      id: 'any_id',
      subject: 'any_subject',
      body: 'any_body',
      createdAt: new Date()
    })
    expect(sut.status).toBe(TicketStatus.OPEN_STATUS)
  })
  test('should create an object with new instance Date if pass createdAt like undefined', () => {
    const sut = TicketEntity.create({
      id: 'any_id',
      subject: 'any_subject',
      body: 'any_body'
    })
    expect(sut.createdAt).toBeInstanceOf(Date)
  })
  test('should create an object with success if status are valid', () => {
    const ticketStatus = [
      TicketStatus.OPEN_STATUS,
      TicketStatus.DOING_STATUS,
      TicketStatus.RESOLVED_STATUS
    ]
    const data = {
      subject: 'any_subject',
      body: 'any_body'
    }
    for (const status of ticketStatus) {
      const ticket = TicketEntity.create({ ...data, status })
      expect(ticket).toBeInstanceOf(TicketEntity)
    }
  })
  test('should throw an error if ticket status is invalid', () => {
    const data = {
      subject: 'any_subject',
      body: 'any_body',
      status: 'any_status'
    }
    expect(() => {
      TicketEntity.create(data)
    }).toThrow(DomainError)
  })
})
