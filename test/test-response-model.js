const assert = require('assert')
const Response = require('../models/Response')

describe('Pruebas para operaciones de respuesta', () => {
    describe('#Crear respuesta y encontrarla en la base de datos', () => {
        it('Debería crear una respuesta y encontrarla.', () => {
            Response.create({ description: 'Respuesta prueba', event_id: 'id_evento', adventurer_name: 'Developer' })
                .then(()=>{
                    Response.findByEventId('id_evento').then((respuesta)=>{
                        assert(respuesta)
                    })
                })
        })
    })
})