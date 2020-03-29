const knex = require('../database/connection');

exports.findByMaster = (master_id) => {
    return knex
      .select('*')
      .from('adventurers')
      .where('master_id', master_id);
  }