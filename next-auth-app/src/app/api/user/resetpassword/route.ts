import { connectionDB } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectionDB()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { oldpassword, newpassword, token } = reqBody

        const user = await User.findOne(
            {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { $gt: Date.now() },
            })

        if (!user) {
            return NextResponse.json({ message: 'User not found ! Invalid password !' }, { status: 400 })
        }

        const isMatch = await bcryptjs.compare(oldpassword, user.password)

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid old password' }, { status: 400 })
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashNewPassword = bcryptjs.hashSync(newpassword, salt);

        user.password = hashNewPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        const check = bcryptjs.compare(newpassword, user.password);

        if (!check) {
            return NextResponse.json({ message: ' Invalid password !' }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Password Changed Successfully !"
        }, { status: 201 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}