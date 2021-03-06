exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 128).notNullable().unique()
      users.string('password', 128).notNullable()
      users.string('user_email', 128).nullable()
      users.string('user_phone', 12).notNullable().unique()//000-000-000
      users.string('created_at',{ precision: 6 }).defaultTo(knex.fn.now())
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('plant_nickname', 128).notNullable()
      plants.string('plant_species', 128).notNullable()
      plants.integer('h2ofrequency').notNullable()//number of days
      plants.string('plant_image', 256).nullable()
      plants.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
      plants.timestamps(false, true);
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
}
