import { connectionDB } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import  {getDataFromToken} from '@/utils/getDataToken'


connectionDB()

export async function GET(request : NextRequest){
   try{

    //extract data from token 
    
    const userId  = await getDataFromToken(request)

    const user = await User.findById(userId).select("-password") // **
    
    if(!user){
        return NextResponse.json({ error: "No user found !" }, { status: 400 })
    }

    return NextResponse.json({
        success : true,
        message : "User Found !",
        user
    },{status : 200})

   }catch(error : any){
    return NextResponse.json({ error: error.message }, { status: 500 })
   }
}