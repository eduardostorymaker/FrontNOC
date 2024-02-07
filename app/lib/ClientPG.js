import { Client } from 'pg'

export default function ClientPG() {

    const client = new Client({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_CLIENT,
        password: process.env.DATABASE_PASSWORD,
      })

    return client
}