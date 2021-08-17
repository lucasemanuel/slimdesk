const { MissingParamError } = require('../../utils/errors')

class OpenTicketUseCase {
  constructor ({ ticketFactory, distributorTicketsService, ticketRepository } = {}) {
    Object.assign(this, {
      ticketFactory,
      distributorTicketsService,
      ticketRepository
    })
  }

  async execute ({ body, subject }) {
    this.validate({ body, subject })
    const ticket = this.ticketFactory.create({ body, subject })
    const technician = this.distributorTicketsService.distribute()
    this.ticketRepository.insert({ ticketEntity: ticket, userEntity: technician })
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

      return { subject, body }
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

      return this.technician
    }
  }

  return new DistributorTicketsServiceSpy()
}

const makeTicketRepositorySpy = () => {
  class TicketRepositorySpy {
    insert ({ ticketEntity, userEntity }) {
      this.ticket = ticketEntity
      this.technician = userEntity
    }
  }

  return new TicketRepositorySpy()
}

const makeSut = () => {
  const ticketFactorySpy = makeTicketFactorySpy()
  const distributorTicketsServiceSpy = makeDistributorTicketsServiceSpy()
  const ticketRepositorySpy = makeTicketRepositorySpy()

  const sut = new OpenTicketUseCase({
    distributorTicketsService: distributorTicketsServiceSpy,
    ticketFactory: ticketFactorySpy,
    ticketRepository: ticketRepositorySpy
  })

  return {
    distributorTicketsServiceSpy,
    sut,
    ticketFactorySpy,
    ticketRepositorySpy
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
  test('should call TicketRepository for store the ticket with correct params', async () => {
    const { sut, distributorTicketsServiceSpy, ticketRepositorySpy } = makeSut()
    distributorTicketsServiceSpy.technicians = [
      {
        name: 'technician_1',
        openTickets: 1
      },
      {
        name: 'technician_2',
        openTickets: 3
      }
    ]
    await sut.execute({ subject: 'any_subject', body: 'any_body' })
    expect(ticketRepositorySpy.technician).toEqual({
      name: 'technician_2',
      openTickets: 3
    })
    expect(ticketRepositorySpy.ticket).toEqual({ subject: 'any_subject', body: 'any_body' })
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
