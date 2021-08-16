const { InvalidParamError, MissingParamError } = require('../../utils/errors')

class OpenTicketUseCase {
  constructor ({ ticketFactory }) {
    Object.assign(this, { ticketFactory })
  }

  async execute ({ body, subject }) {
    this.validate({ body, subject })
    this.ticketFactory.create({ body, subject })
  }

  validate ({ body, subject }) {
    if (!subject) {
      throw new MissingParamError('subject')
    } else if (!body) {
      throw new MissingParamError('body')
    }
  }
}

const makeTicketFactorySpy = () => {
  class TicketFactorySpy {
    create ({ subject, body }) {
      this.subject = subject
      this.body = body
    }
  }

  return new TicketFactorySpy()
}

const makeSut = () => {
  const ticketFactorySpy = makeTicketFactorySpy()
  const sut = new OpenTicketUseCase({ ticketFactory: ticketFactorySpy })

  return {
    sut,
    ticketFactorySpy
  }
}

describe('Open Ticket Use Case', () => {
  test('should throw an error if is not provided subject', () => {
    const { sut } = makeSut()
    const promise = sut.execute({ body: 'any_body' })
    expect(promise).rejects.toThrow(new MissingParamError('subject'))
  })
  test('should throw an error if is not provided body', () => {
    const { sut } = makeSut()
    const promise = sut.execute({ subject: 'any_subject' })
    expect(promise).rejects.toThrow(new MissingParamError('body'))
  })
  test('should open a ticket using TicketFactory with correct params', async () => {
    const { sut, ticketFactorySpy } = makeSut()
    await sut.execute({ subject: 'any_subject', body: 'any_body' })
    expect(ticketFactorySpy.subject).toBe('any_subject')
    expect(ticketFactorySpy.body).toBe('any_body')
  })
  test.skip('should throw an error if TicketRepository is invalid', () => {
    const sut = new OpenTicketUseCase()
    const promise = sut.execute({ subject: 'any_subject', body: 'any_body' })
    expect(promise).rejects.toThrow(new InvalidParamError('ticketRepository'))
  })
  test.todo('should throw an error if dependencies throws')
})
