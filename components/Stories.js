import React, { useEffect, useState } from 'react'
import faker from 'faker';
import Story from './Story';
import {useSession } from "next-auth/react"

function Stories() {
    const [stories,setStories] = useState([])
    const { data: session } = useSession();

    useEffect(() => {
      const fakeStories = [...Array(20)].map((n,index) => ({
          ...faker.helpers.contextualCard(),
          id:index
      }))

      setStories(fakeStories)
    }, [])

    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thumb-black scrollbar-thin'>

            {session && (
                <Story img_src={session.user.image} username={session.user.username} />
            )}

            {
                stories.map(profile => (
                    <Story key={profile.id} img_src={`https://picsum.photos/20${profile.id}`} username={profile.username} />
                ))
            }
        </div>
    )
}

export default Stories;
