'use client'

import React, { useState } from 'react'
import axios from 'axios'
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




export default function SignupPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!user.username || !user.email || !user.password) {
      toast.error('All fields are required')
      return
    }

    try {
      setLoading(true)

      const res = await axios.post('/api/user/signup', user)

      toast.success('Signup successful! Please verify your email.')
      router.push('/login')

    } catch (error: any) {
      const message = error.response?.data?.error || 'Something went wrong'
      toast.error(message)
    }
    finally {
      setLoading(false)
    }
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setUser({...user , [e.target.name] : e.target.value})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
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
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-sm text-center mt-4 text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

