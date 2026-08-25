'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function ChangePasswordPage() {

    const [passwords, setPasswords] = useState({
        oldpassword: '',
        newpassword: '',
        token: ''
    })

    const router = useRouter()
    const searchParam = useSearchParams()
    const token = searchParam.get('token')


    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (!passwords.newpassword || !passwords.oldpassword ) {
            toast.error('All fields are required')
            return
        }

        try {
            setLoading(true)

            const res = await axios.post('/api/user/resetpassword',{...passwords , token : token})
            toast.success('Password Chnaged Succesfully. Please login!')
            router.push('/login')

        } catch (error: any) {
            const message = error.response?.data?.error || 'Something went wrong'
            toast.error(message)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">New password</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="password">Old Password</Label>
                            <Input
                                id="oldpassword"
                                name="oldpassword"
                                type="password"
                                value={passwords.oldpassword}
                                onChange={e=>(setPasswords({...passwords, oldpassword : e.target.value }))}
                                placeholder="Enter old password"
                            />
                        </div>

                         <div className="flex flex-col gap-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="newpassword"
                                name="newpassword"
                                type="password"
                                value={passwords.newpassword}
                                onChange={e=>(setPasswords({...passwords, newpassword : e.target.value }))}
                                placeholder="Enter new password"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full mt-2">
                            {loading ? 'Changeing...' : 'Change'}
                        </Button>
                    </form>

                    
                </CardContent>
            </Card>
        </div>
    )
}

