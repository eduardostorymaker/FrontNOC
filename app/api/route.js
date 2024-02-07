import { NextResponse } from "next/server";

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "Claro4455$$"  // set mypw to the hr schema password

async function run() {

    const connection = await oracledb.getConnection ({
        user          : "C15380[OYMTOC]",
        password      : mypw,
        connectString : "scan-fcprod:1521/oymtocdb"
    });

    const result = await connection.execute(
        `SELECT * from INCIDENTSTOCONLY`
    );
    console.log("Oracle exitoso")
    console.log(result.rows);
    await connection.close();
}

run();

export async function GET() {

    return NextResponse.json({
        hello:"world"
    })
}