import { connectionDB } from "@/dbConfig/dbConnect"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectionDB()

export async function POST(request : NextRequest){

    try{

        const reqBody = await request.json()
        const {username , password} = reqBody

         
        const user = await User.findOne({
            username : username,
        })

        if(!user || !user.isVerified){
            return NextResponse.json({ error: "Verify Email or User not exists" }, { status: 400 })
        }


        const validPassword = await bcryptjs.compare(password,user.password)

        if( !validPassword ){
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 })
        }

        //create JWT token
        const token_payload = {
            id : user._id
        }

        const jwtToken =  jwt.sign(token_payload , process.env.TOKEN_SECRET!,{ expiresIn: '1d' })

        const response = NextResponse.json({
            message : 'Login Successfully',
            success : true 
        },{
            status : 200
        })

        //set cookie
        response.cookies.set("token", jwtToken , {
            httpOnly : true
        })

        return response

    }catch(error : any ){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}