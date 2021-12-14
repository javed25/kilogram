import React from 'react'
import { signOut,useSession } from "next-auth/react"

function RightProfile() {

    const { data: session } = useSession();
    
    return (
        <div className='flex items-center justify-between mt-14 ml-10'>
            <img src={session?.user?.image} alt="profile" className='rounded-full border p-[2px] w-16 h-16' />

            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>{session?.user?.username}</h2>
                <h3 className='text-sm text-gray-600'>Kilogram User</h3>
            </div>

            <button onClick={signOut} className='text-blue-500 test-sm font-semibold'>Sign Out</button>
        </div>
    )
}

export default RightProfile;
