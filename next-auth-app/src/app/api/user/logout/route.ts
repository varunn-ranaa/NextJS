import { connectionDB } from "@/dbConfig/dbConnect"
import { NextRequest, NextResponse } from "next/server"

connectionDB();

export async function GET(request : NextRequest){

    try{

        const response = NextResponse.json({
          message : 'Logout Successfully',
          success : true
        }, {status : 200})

        response.cookies.delete('token')

        return response

    }
    catch(error : any ){
    return NextResponse.json({ error: error.message }, { status: 500 })
    }
}