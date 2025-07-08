export async function up(knex) {
  await knex.schema.createTable('crew', table => {
    table.string('crew_id', 50).primary();
    table.string('first_name');
    table.string('last_name');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('crew');
}
