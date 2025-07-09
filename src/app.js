// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import { configurationValidator } from './configuration.js'
import { logger } from './logger.js'
import { logError } from './hooks/log-error.js'
import { postgresql } from './postgresql.js'
import { services } from './services/index.js'
import { channels } from './channels.js'
import 'dotenv/config'

const app = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(postgresql)

app.configure(services)
app.configure(channels)

// Custom endpoint to receive both crew and order data with detailed logging
app.post('/receive-order', async (req, res) => {
  // Log the received data
  console.log('Received from frontend:', req.body);

  const { crew, order, order_items } = req.body;
  try {
    // Check if crew already exists
    let crewResult;
    try {
      crewResult = await app.service('crew').get(crew.crew_id);
      // Optionally, update crew info if needed:
      // crewResult = await app.service('crew').patch(crew.crew_id, crew);
    } catch (e) {
      // If not found, create
      crewResult = await app.service('crew').create(crew);
    }

    // Check if order already exists
    let orderResult;
    try {
      orderResult = await app.service('orders').get(order.order_id);
      // If found, skip creation
      console.log('Order already exists, skipping insert:', orderResult);
    } catch (e) {
      // If not found, create
      orderResult = await app.service('orders').create(order);
    }

    // Save each order item
    const orderItemsResults = [];
    if (Array.isArray(order_items)) {
      for (const item of order_items) {
        orderItemsResults.push(await app.service('order_items').create(item));
      }
    }

    // Log what was saved
    console.log('Crew saved:', crewResult);
    console.log('Order saved:', orderResult);
    console.log('Order items saved:', orderItemsResults);

    res.json({ message: 'Order, crew, and items saved!', crew: crewResult, order: orderResult, order_items: orderItemsResults });
  } catch (error) {
    console.error('Error in /receive-order:', error.message, error.data);
    res.status(400).json({ error: error.message, data: error.data });
  }
});

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(errorHandler({ logger }));

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
