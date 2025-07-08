import { defaultAppSettings, getValidator } from '@feathersjs/schema'

import { dataValidator } from './validators.js'

export const configurationSchema = {
  $id: 'configuration',
  type: 'object',
  additionalProperties: false,
  required: ['host', 'port', 'public'],
  properties: {
    ...defaultAppSettings,
    host: { type: 'string' },
    port: { type: 'number' },
    public: { type: 'string' },
    origins: {
      type: 'array',
      items: { type: 'string' }
    },
    paginate: {
      type: 'object',
      properties: {
        default: { type: 'number' },
        max: { type: 'number' }
      },
      required: ['default', 'max'],
      additionalProperties: false
    },
    postgres: {
      type: 'object',
      properties: {
        client: { type: 'string' },
        connection: {
          type: 'object',
          properties: {
            host: { type: 'string' },
            user: { type: 'string' },
            password: { type: 'string' },
            database: { type: 'string' }
          },
          required: ['host', 'user', 'password', 'database'],
          additionalProperties: false
        }
      },
      required: ['client', 'connection'],
      additionalProperties: false
    }
  }
}

export const configurationValidator = getValidator(configurationSchema, dataValidator)
