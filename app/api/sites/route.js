import { NextResponse } from "next/server";
import ClientPG from "../../lib/ClientPG";

const clientPG = ClientPG()

export async function GET() {
    await clientPG.connect()
 
    const res = await clientPG.query('SELECT * from "Sites";')

    await clientPG.end()

    return NextResponse.json({
        data: res.rows
    })
}