const assert = require('assert')
const User = require('../models/User')

describe('Pruebas para operaciones de usuario', () => {
    describe('#Crear y encontrar usuario', () => {
        it('Debería crear un usuario y encontrarlo en la base de datos', () => {
            User.create({ name: 'Usuario prueba', email: 'unit@unit.com', password: 'password', role: 'DM' })
            .then(()=>{
                User.findByEmail('unit@unit.com').then((user) => {
                    assert(user)
                })
            })
        })
    })
})