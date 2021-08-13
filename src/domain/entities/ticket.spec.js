class TicketEntity {
  constructor ({ subject, body, createdAt, status }) {
    Object.assign(this, { subject, body, createdAt, status })
  }
}

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

describe('Ticket Entity', () => {
  test('should contain subject, body, criation date and status', () => {
    const { sut, date } = makeSut()

    expect(sut).toEqual({
      subject: 'any_subject',
      body: 'any_body',
      createdAt: date,
      status: 'any_status'
    })
  })
  test.todo('should return late status if ticket is late')
})
