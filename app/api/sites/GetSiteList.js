import { NextResponse } from "next/server";
import ClientPG from "../../lib/ClientPG";

const clientPG = ClientPG()

export async function GetSiteList() {
    await clientPG.connect()
 
    const res = await clientPG.query('SELECT * from "Sites";')

    await clientPG.end()

    return res.rows
}