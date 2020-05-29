const assert = require('assert')
const Event = require('../models/Event')

describe('Pruebas para operaciones de evento', () => {
    describe('#Crear evento y encontrarlo en la base de datos', () => {
        it('Debería crear un evento y encontrarlo.', () => {
            Event.create({ name: 'Evento prueba', description: 'Probando eventos', img_url: 'https://i.ytimg.com/vi/w0sUw735gRw/maxresdefault.jpg', campaign_id: 'camp_id' })
            .then(() => {
                Event.findByCampaignId('camp_id').then((evento) => {
                    assert(evento)
                })
            })
        })
    })
})