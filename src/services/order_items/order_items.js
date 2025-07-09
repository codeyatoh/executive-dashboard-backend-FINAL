import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  orderItemsDataValidator,
  orderItemsPatchValidator,
  orderItemsQueryValidator,
  orderItemsResolver,
  orderItemsExternalResolver,
  orderItemsDataResolver,
  orderItemsPatchResolver,
  orderItemsQueryResolver
} from './order_items.schema.js'
import { OrderItemsService, getOptions } from './order_items.class.js'
import { orderItemsPath, orderItemsMethods } from './order_items.shared.js'

export * from './order_items.class.js'
export * from './order_items.schema.js'

export const order_items = app => {
  app.use(orderItemsPath, new OrderItemsService(getOptions(app)), {
    id: 'order_items_id',
    methods: orderItemsMethods,
    events: []
  })
  app.service(orderItemsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(orderItemsExternalResolver), schemaHooks.resolveResult(orderItemsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(orderItemsQueryValidator), schemaHooks.resolveQuery(orderItemsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(orderItemsDataValidator), schemaHooks.resolveData(orderItemsDataResolver)],
      patch: [schemaHooks.validateData(orderItemsPatchValidator), schemaHooks.resolveData(orderItemsPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
} 