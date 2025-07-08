export const crewPath = 'crew'

export const crewMethods = ['find', 'get', 'create', 'patch', 'remove']

export const crewClient = client => {
  const connection = client.get('connection')

  client.use(crewPath, connection.service(crewPath), {
    methods: crewMethods
  })
}
