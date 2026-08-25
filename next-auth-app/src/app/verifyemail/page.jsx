'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Verifymailpage() {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const searchParam = useSearchParams()
    const token = searchParam.get('token')

    const sendToken = async () => {

        if (!token) {
            toast.error('No verification token found')
            return
        }

        setLoading(true)

        try {
            const res = await axios.post('/api/user/verifyemail', { token })
            toast.success('User verified Successfully !')
            router.push('/login')

        } catch (error) {
            const message = error.response?.data?.error || 'Something went wrong'
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
       <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">User Verification</h2>
        <p className="mt-1 text-sm text-gray-500 mb-6">
          Click the button below to complete your registration
        </p>

        <Button 
          className="w-full bg-black text-white hover:bg-gray-800 h-11 rounded-lg"
          disabled={loading || !token} 
          onClick={sendToken}
        >
          {loading ? 'Verifying...' : 'Click to verify'}
        </Button>
      </div>
    </div>
  )
}


export default Verifymailpage