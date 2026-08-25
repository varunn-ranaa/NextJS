'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { LogOut, User, Mail, Loader2, Fingerprint } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface UserProfile {
    _id: string
    email: string
    username?: string
}

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/user/profile')
                setUser(res.data.user)
            } catch (error: any) {
                const message = error.response?.data?.error || 'Failed to load profile session'
                toast.error(message)
                router.push('/login')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [router])

    const handleLogout = async () => {
        setLogoutLoading(true)
        try {
            await axios.get('/api/user/logout') 
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error: any) {
            const message = error.response?.data?.error || 'Something went wrong during logout'
            toast.error(message)
        } finally {
            setLogoutLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Loader2 className="h-8 w-8 animate-spin text-black" />
                    <p className="text-sm font-medium">Loading profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-md border-gray-200">
                <CardHeader className="space-y-1 pb-4">
                    <div className="mx-auto bg-black text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                        <User className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl text-center font-bold tracking-tight">
                        Your Profile
                    </CardTitle>
                    <CardDescription className="text-center">
                        Account information retrieved from session secure token
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* User Details Box containing only Username and Email */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3.5">
                        <div className="flex items-center gap-3 text-sm">
                            <Fingerprint className="h-4 w-4 text-gray-400 shrink-0" />
                            <div className="overflow-hidden">
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Username</p>
                                <p className="text-gray-900 font-medium truncate">{user?.username || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                            <div className="overflow-hidden">
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                                <p className="text-gray-900 font-medium truncate">{user?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={handleLogout} 
                        disabled={logoutLoading}
                        variant="destructive"
                        className="w-full h-11 flex items-center justify-center gap-2 font-medium"
                    >
                        {logoutLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Logging out...
                            </>
                        ) : (
                            <>
                                <LogOut className="h-4 w-4" />
                                Logout
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
