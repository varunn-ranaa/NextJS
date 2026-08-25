'use client'

import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

function ResetPasswordPage() {

    const router =  useRouter()

    const [email, setEmail] = useState('')
    const [loading, setloading] = useState(false)

    const handleSubmit = async (e: any) => {

        e.preventDefault()
        setloading(true)

        if (!email) {
            toast.error('email is required')
            return
        }

        try {

            const res = await axios.post('/api/user/forgotpassword', {email})
            toast.success('Email sent!')
            router.push('/resetpassword')

        }catch (error: any) {
            const message = error.response?.data?.error || 'Something went wrong'
            toast.error(message)
        } finally {
            setloading(false)
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset your password</CardTitle>
                    <CardDescription>Check your email and span folder</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => { setEmail(e.target.value ) }}
                                placeholder="Enter email"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full mt-2">
                            {loading ? 'Sending...' : 'Send mail'}
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPasswordPage