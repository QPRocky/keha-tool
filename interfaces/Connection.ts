import ConnectionType from "./ConnectionType"

interface Connection {
  uid: string
  connectionType: ConnectionType
  server: string
  port: number
  database: string
  user: string
  password: string
}

export default Connection