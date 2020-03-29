
exports.up = function(knex) {
  return knex.schema
  .createTable('campaigns', (table) => {
    table.increments('id');
    table.string('name', 255);
    table.string('description', 255);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('campaigns');
};
