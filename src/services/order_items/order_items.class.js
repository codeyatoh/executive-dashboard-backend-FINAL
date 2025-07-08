import { KnexService } from '@feathersjs/knex'

export class OrderItemsService extends KnexService {}

export const getOptions = app => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'order_items',
    id: 'id'
  }
} 