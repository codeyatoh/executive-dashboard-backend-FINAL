import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

export const orderItemsSchema = {
  $id: 'OrderItems',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'order_id', 'item_name', 'quantity', 'price'],
  properties: {
    id: { type: 'integer' },
    order_id: { type: 'string' },
    item_name: { type: 'string' },
    quantity: { type: 'integer' },
    price: { type: 'number' }
  }
}
export const orderItemsValidator = getValidator(orderItemsSchema, dataValidator)
export const orderItemsResolver = resolve({})

export const orderItemsExternalResolver = resolve({})

export const orderItemsDataSchema = {
  $id: 'OrderItemsData',
  type: 'object',
  additionalProperties: false,
  required: ['order_id', 'item_name', 'quantity', 'price'],
  properties: {
    ...orderItemsSchema.properties
  }
}
export const orderItemsDataValidator = getValidator(orderItemsDataSchema, dataValidator)
export const orderItemsDataResolver = resolve({})

export const orderItemsPatchSchema = {
  $id: 'OrderItemsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...orderItemsSchema.properties
  }
}
export const orderItemsPatchValidator = getValidator(orderItemsPatchSchema, dataValidator)
export const orderItemsPatchResolver = resolve({})

export const orderItemsQuerySchema = {
  $id: 'OrderItemsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(orderItemsSchema.properties)
  }
}
export const orderItemsQueryValidator = getValidator(orderItemsQuerySchema, queryValidator)
export const orderItemsQueryResolver = resolve({}) 