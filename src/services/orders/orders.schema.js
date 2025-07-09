import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

export const ordersSchema = {
  $id: 'Orders',
  type: 'object',
  additionalProperties: false,
  required: ['order_id', 'crew_id', 'total_price', 'order_status', 'order_type', 'created_at'],
  properties: {
    order_id: { type: 'string' },
    crew_id: { type: 'string' },
    total_price: { type: 'number' },
    order_status: { type: 'string' },
    order_type: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' }
  }
}
export const ordersValidator = getValidator(ordersSchema, dataValidator)
export const ordersResolver = resolve({})

export const ordersExternalResolver = resolve({})

export const ordersDataSchema = {
  $id: 'OrdersData',
  type: 'object',
  additionalProperties: false,
  required: ['order_id', 'crew_id', 'total_price', 'order_status', 'order_type', 'created_at'],
  properties: {
    ...ordersSchema.properties
  }
}
export const ordersDataValidator = getValidator(ordersDataSchema, dataValidator)
export const ordersDataResolver = resolve({})

export const ordersPatchSchema = {
  $id: 'OrdersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...ordersSchema.properties
  }
}
export const ordersPatchValidator = getValidator(ordersPatchSchema, dataValidator)
export const ordersPatchResolver = resolve({})

export const ordersQuerySchema = {
  $id: 'OrdersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(ordersSchema.properties)
  }
}
export const ordersQueryValidator = getValidator(ordersQuerySchema, queryValidator)
export const ordersQueryResolver = resolve({}) 