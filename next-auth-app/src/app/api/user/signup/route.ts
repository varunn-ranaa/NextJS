import { connectionDB } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";


connectionDB();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User Already Exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        const userId = savedUser._id

        //verification  email
        await sendEmail({email,emailType : 'VERIFY', userId})

        return NextResponse.json({
            success : true,
            message : 'User registered Successfully !',
            savedUser 
        } , {status : 201})
        
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}