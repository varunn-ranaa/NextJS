import { connectionDB } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";

connectionDB()

export async function POST(request:NextRequest) {

    try{
    const reqBody = await request.json()
    const { email } = reqBody

    const user = await User.findOne({email})

     if (!user) {
            return NextResponse.json({ error: "No user exists" }, { status: 400 })
        }

    const userId = user._id

    await sendEmail({email , emailType : 'RESET' , userId })  // Reset mail

    return NextResponse.json({
            success : true,
            message : 'Verification mail sent !', 
        } , {status : 201})
    }catch(error : any ){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}