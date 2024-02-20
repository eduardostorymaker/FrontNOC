import { NextResponse } from "next/server";
import PoolPG from "../../lib/PoolPG";

const poolPG = PoolPG()

export async function GET() {
    const client = await poolPG.connect()
    const data = await client.query('SELECT * from "Sites";')
 
    //const res = await clientPG.query('SELECT * from "Sites";')

    client.release()

    return NextResponse.json({
        data: data.rows
    })
}