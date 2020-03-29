
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 512).notNullable();
      table.string('role', 512).notNullable();
      table.timestamps(true, true);
    }).then(createCampaignsTable(knex));
};

function createCampaignsTable(knex) {
  return knex.schema
  .createTable('campaigns', (table) => {
    table.increments('id');
    table.string('name', 255);
    table.string('description', 255);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};
