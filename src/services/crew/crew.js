// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  crewDataValidator,
  crewPatchValidator,
  crewQueryValidator,
  crewResolver,
  crewExternalResolver,
  crewDataResolver,
  crewPatchResolver,
  crewQueryResolver
} from './crew.schema.js'
import { CrewService, getOptions } from './crew.class.js'
import { crewPath, crewMethods } from './crew.shared.js'

export * from './crew.class.js'
export * from './crew.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const crew = app => {
  // Register our service on the Feathers application
  app.use(crewPath, new CrewService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: crewMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(crewPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(crewExternalResolver), schemaHooks.resolveResult(crewResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(crewQueryValidator), schemaHooks.resolveQuery(crewQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(crewDataValidator), schemaHooks.resolveData(crewDataResolver)],
      patch: [schemaHooks.validateData(crewPatchValidator), schemaHooks.resolveData(crewPatchResolver)],
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
