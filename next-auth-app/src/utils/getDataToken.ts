import { NextRequest , NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function getDataFromToken(request : NextRequest){

        const token = request.cookies.get('token')?.value 

        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const decodedToken : any = jwt.verify(token , process.env.TOKEN_SECRET!)

        return decodedToken.id

}