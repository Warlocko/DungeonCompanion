const assert = require('assert')
const Campaign = require('../models/Campaign')

describe('Pruebas para operaciones de campania', () => {
    describe('#Crear campania y encontrarla en la base de datos', () => {
        it('Debería crear una campania y encontrarla.', () => {
            Campaign.create({ name: 'Campania prueba', description: 'Pruebas unitarias', img_url: 'https://cdn2.unrealengine.com/Diesel%2Fstore%2Ffeatured-carousel-megasale-wk1%2FEGS_SidMeiersCivilizationVIPlatinumEdition_FiraxisGamesS1-1920x1080-c4b7f8e1d2d1bc60ea6dbbd9fda673028d57ddad.jpg?h=1080&resize=1&w=1920', DM_id: 'no id' })
            .then(() => {
                Campaign.findByUserId('no id').then((campaign) => {
                    assert(campaign)
                })
            })
        })
    })
})