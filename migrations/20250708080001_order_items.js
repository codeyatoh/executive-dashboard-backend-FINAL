export async function up(knex) {
  await knex.schema.createTable('order_items', table => {
    table.increments('id').primary();
    table.string('order_id').references('order_id').inTable('orders');
    table.string('item_name');
    table.integer('quantity');
    table.decimal('price', 10, 2);
  });
}

export async function down(knex) {
  await knex.schema.dropTable('order_items');
} 