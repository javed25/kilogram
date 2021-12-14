import React, { useEffect, useState } from 'react';
import faker from 'faker';
import Avatar from 'react-avatar';

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(5)].map((n, index) => ({
            ...faker.helpers.contextualCard(),
            id: index
        }))

        setSuggestions(suggestions);

    }, [])

    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-500 '>Suggestions for you</h3>
                <button className='text-gray-700'>See More</button>
            </div>

            {
                suggestions.map(profile => (
                    <div key={profile.id} className='flex items-center justify-between mt-3'>

                        <Avatar src={`https://picsum.photos/30${profile.id}`} size="70" className='w-10 h-10 border p-[2px] rounded-full' />

                        <div className='flex-1 mt-4'>
                            <h2 className='font-semibold text-sm '>{profile.username}</h2>
                            <h3 className='text-xs text-gray-500'>Placed in {profile.company.name}</h3>
                        </div>

                        <button className='text-blue-500 text-xs font-bold'>Follow</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Suggestions;
