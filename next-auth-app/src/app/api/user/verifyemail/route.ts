import { connectionDB } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectionDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        if (token) {
            const user = await User.findOne(
                {
                    VerifyToken: token,
                    VerifyTokenExpiry: { $gt: Date.now() }
                })

            if (!user) {
                return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
            }

            user.isVerified = true
            user.VerifyToken = undefined
            user.VerifyTokenExpiry = undefined
            await user.save()

            return NextResponse.json({
                success: true,
                message: 'User Verified Successfully !'
            }, { status: 200 })

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}