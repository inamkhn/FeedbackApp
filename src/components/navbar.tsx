"use client"
import React from 'react'
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session, status } = useSession()

  // if (status === "authenticated") {
  //   console.log(session.user.email)
  //   return <p>Signed in as {session.user.username}</p>
  // }

  return (
    <div className='flex justify-around p-3'>
      <div>
        <p className='text-2xl font-semibold'>YourFeedBack</p>
      </div>
      <div>
        {
          session ? (
            <div className='flex space-x-2 items-center'>
            <p className='text-lg font-normal'>{session.user.username}</p>
            <button onClick={()=>signOut()} className='bg-slate-600 p-3 rounded-lg text-white'>SignOut</button>
            </div>
          ) : (
            <div className='flex space-x-2 items-center'>
            <Link href="/sign-in"><button className='bg-slate-600 px-2 py-1 rounded-xl text-white'>SignIn</button></Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar