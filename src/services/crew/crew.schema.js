// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const crewSchema = {
  $id: 'Crew',
  type: 'object',
  additionalProperties: false,
  required: ['crew_id', 'first_name', 'last_name'],
  properties: {
    crew_id: { type: 'string' },
    first_name: { type: 'string' },
    last_name: { type: 'string' }
    // Add other fields here if needed
  }
}
export const crewValidator = getValidator(crewSchema, dataValidator)
export const crewResolver = resolve({})

export const crewExternalResolver = resolve({})

// Schema for creating new data
export const crewDataSchema = {
  $id: 'CrewData',
  type: 'object',
  additionalProperties: false,
  required: ['crew_id', 'first_name', 'last_name'],
  properties: {
    ...crewSchema.properties
  }
}
export const crewDataValidator = getValidator(crewDataSchema, dataValidator)
export const crewDataResolver = resolve({})

// Schema for updating existing data
export const crewPatchSchema = {
  $id: 'CrewPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...crewSchema.properties
  }
}
export const crewPatchValidator = getValidator(crewPatchSchema, dataValidator)
export const crewPatchResolver = resolve({})

// Schema for allowed query properties
export const crewQuerySchema = {
  $id: 'CrewQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(crewSchema.properties)
  }
}
export const crewQueryValidator = getValidator(crewQuerySchema, queryValidator)
export const crewQueryResolver = resolve({})
