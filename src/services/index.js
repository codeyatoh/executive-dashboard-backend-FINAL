import { orders } from './orders/orders.js'
import { order_items } from './order_items/order_items.js'
import { crew } from './crew/crew.js'
import 'dotenv/config'
export const services = app => {
  app.configure(orders)
  app.configure(order_items)
  app.configure(crew)
  // All services will be registered here
}
