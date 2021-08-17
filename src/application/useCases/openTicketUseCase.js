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
    return ticket
  }

  validate ({ body, subject }) {
    if (!subject) {
      throw new MissingParamError('subject')
    } else if (!body) {
      throw new MissingParamError('body')
    }
  }
}

module.exports = OpenTicketUseCase
