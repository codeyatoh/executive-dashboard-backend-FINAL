import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  ordersDataValidator,
  ordersPatchValidator,
  ordersQueryValidator,
  ordersResolver,
  ordersExternalResolver,
  ordersDataResolver,
  ordersPatchResolver,
  ordersQueryResolver
} from './orders.schema.js'
import { OrdersService, getOptions } from './orders.class.js'
import { ordersPath, ordersMethods } from './orders.shared.js'

export * from './orders.class.js'
export * from './orders.schema.js'

export const orders = app => {
  app.use(ordersPath, new OrdersService(getOptions(app)), {
    methods: ordersMethods,
    events: []
  })
  app.service(ordersPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(ordersExternalResolver), schemaHooks.resolveResult(ordersResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(ordersQueryValidator), schemaHooks.resolveQuery(ordersQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(ordersDataValidator), schemaHooks.resolveData(ordersDataResolver)],
      patch: [schemaHooks.validateData(ordersPatchValidator), schemaHooks.resolveData(ordersPatchResolver)],
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