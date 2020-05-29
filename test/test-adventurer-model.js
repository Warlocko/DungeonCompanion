const assert = require('assert')
const Adventurer = require('../models/Adventurer')

describe('Pruebas para operaciones de aventurero', () => {
    describe('#Crear aventurero y encontrarlo en la base de datos', () => {
        it('Debería crear un aventurero y encontrarlo.', () => {
            Adventurer.createAdventurer({ name: 'Aventurero prueba', race: 'Desarrollador', class: 'Tester', master_id: 'Flores' })
            .then(() => {
              Adventurer.findByMaster('Flores').then((aventureroPrueba)=>{
                  assert(aventureroPrueba)
              })
            })
        })
    })
})