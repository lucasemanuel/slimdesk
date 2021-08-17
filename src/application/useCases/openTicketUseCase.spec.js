const { MissingParamError } = require('../../utils/errors')

class OpenTicketUseCase {
  constructor ({ ticketFactory, distributorTicketsService } = {}) {
    Object.assign(this, { ticketFactory, distributorTicketsService })
  }

  async execute ({ body, subject }) {
    this.validate({ body, subject })
    this.ticketFactory.create({ body, subject })
    this.distributorTicketsService.distribute()
  }

  validate ({ body, subject }) {
    if (!subject) {
      throw new MissingParamError('subject')
    } else if (!body) {
      throw new MissingParamError('body')
    }
  }
}

const makeTicketFactoryWithErrorSpy = () => {
  class TicketFactoryWithErrorSpy {
    create () {
      throw new Error()
    }
  }

  return new TicketFactoryWithErrorSpy()
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

const makeDistributorTicketsServiceWithErrorSpy = () => {
  class DistributorTicketsServiceWithErrorSpy {
    distribute () {
      throw new Error()
    }
  }

  return new DistributorTicketsServiceWithErrorSpy()
}

const makeDistributorTicketsServiceSpy = () => {
  class DistributorTicketsServiceSpy {
    constructor () {
      this.technicians = [
        {
          name: 'technician_1',
          openTickets: 3
        }
      ]
    }

    distribute () {
      this.technician = this.technicians[0]
      for (const tech of this.technicians) {
        if (tech.openTickets > this.technician.openTickets) {
          this.technician = tech
        }
      }
    }
  }

  return new DistributorTicketsServiceSpy()
}

const makeSut = () => {
  const ticketFactorySpy = makeTicketFactorySpy()
  const distributorTicketsServiceSpy = makeDistributorTicketsServiceSpy()
  const sut = new OpenTicketUseCase({
    ticketFactory: ticketFactorySpy,
    distributorTicketsService: distributorTicketsServiceSpy
  })

  return {
    distributorTicketsServiceSpy,
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
  test('should get technician with less open tickets', async () => {
    const { sut, distributorTicketsServiceSpy } = makeSut()
    distributorTicketsServiceSpy.technicians = [
      {
        name: 'technician_1',
        openTickets: 3
      },
      {
        name: 'technician_2',
        openTickets: 4
      },
      {
        name: 'technician_3',
        openTickets: 1
      }
    ]
    await sut.execute({ subject: 'any_subject', body: 'any_body' })
    expect(distributorTicketsServiceSpy.technician).toEqual(
      {
        name: 'technician_2',
        openTickets: 4
      }
    )
  })
  test('should throw an error if dependencies throws', async () => {
    const ticketFactorySpy = makeTicketFactorySpy()
    const suts = [
      new OpenTicketUseCase(),
      new OpenTicketUseCase({}),
      new OpenTicketUseCase({ ticketFactory: {} }),
      new OpenTicketUseCase({ ticketFactory: makeTicketFactoryWithErrorSpy() }),
      new OpenTicketUseCase({
        ticketFactory: ticketFactorySpy,
        distributorTicketsService: {}
      }),
      new OpenTicketUseCase({
        ticketFactory: ticketFactorySpy,
        distributorTicketsService: makeDistributorTicketsServiceWithErrorSpy()
      })
    ]
    for (const sut of suts) {
      const promise = sut.execute({ subject: 'any_subject', body: 'any_body' })
      await expect(promise).rejects.toThrow()
    }
  })
})
