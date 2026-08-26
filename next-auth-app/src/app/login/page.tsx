'use client'

import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

function Loginpage() {

  const router = useRouter()

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const [loading, setloading] = useState(false)

  const handleSubmit = async (e : any) => {

    e.preventDefault()
    setloading(true)

     if (!user.username || !user.password) {
      toast.error('All fields are required')
      return
    }

    try {
      const res = await axios.post('/api/user/login', user)
      toast.success('Login successful ! ')
      router.push('/profile')
    } catch (error: any) {
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
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Login to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={e=>{setUser({...user , username : e.target.value})}}
                placeholder="Enter username"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={e=>{setUser({...user , password : e.target.value})}}
                placeholder="Enter password"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-sm text-center mt-4 text-muted-foreground">
            <Link href="/resetpassword" className="text-blue-600 hover:underline">
              forgot password
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Loginpage