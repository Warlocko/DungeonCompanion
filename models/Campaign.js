const knex = require('../database/connection');

exports.create = (campaign) => {
    return knex('campaigns')
      .insert({name: campaign.name, description: campaign.description})
  }

  exports.findAll = () => {
    return knex
      .select('*')
      .from('campaigns')
  }