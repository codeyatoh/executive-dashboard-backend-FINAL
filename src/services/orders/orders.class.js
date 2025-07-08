import { KnexService } from '@feathersjs/knex'

export class OrdersService extends KnexService {}

export const getOptions = app => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'orders',
    id: 'order_id'
  }
} 