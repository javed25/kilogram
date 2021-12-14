import React from 'react'
import Posts from './Posts'
import RightProfile from './RightProfile'
import Stories from './Stories'
import Suggestions from './Suggestions'
import {useSession } from "next-auth/react"

function Body() {
    const { data: session } = useSession();
    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/* Body 1 STARTS  */}

            <section className='col-span-2'>
                <Stories />
                <Posts />
            </section>
            {/* Body 1 ENDS */}


{
    session && (
        <section className='hidden xl:inline-grid md:col-span-1'>
        <div className='fixed'>
            <RightProfile />
            <Suggestions />
        </div>
    </section>
    )
}

        </main>
    )
}

export default Body
