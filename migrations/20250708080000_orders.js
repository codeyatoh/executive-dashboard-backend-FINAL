export async function up(knex) {
  await knex.schema.createTable('orders', table => {
    table.string('order_id').primary();
    table.string('crew_id').references('crew_id').inTable('crew');
    table.decimal('total_price', 10, 2);
    table.string('order_status');
    table.timestamp('created_at');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('orders');
} 