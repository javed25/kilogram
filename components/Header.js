
import React from 'react'

import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from '@heroicons/react/outline'

import { HomeIcon } from "@heroicons/react/solid"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../modalAtom';

function Header() {

    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();


    return (
        <div>
            <div className='shadow-sm border-b sticky top-0 Z-50 flex justify-between max-w-6xl mx-auto lg:mnavbtn bg-white'>

                {/* LOGO STARTS  */}

                <div onClick={()=>router.push("/")} className='logo__Sec relative hidden lg:inline-grid w-24'>
                    {/* <img className='header__logo' src="./logo.jpg" /> */}
                    <img className='header__logo' src="https://t3.ftcdn.net/jpg/01/97/14/58/360_F_197145865_xCYKmR3nAt8noX9l9YKU5xvF5dcojlXW.jpg" />
                    
                    <p className='logo__text'>Kilogram</p>
                </div>

                <div onClick={()=>router.push("/")} className='relative lg:hidden flex-shrink-0'>
                    <img className='header__logo' src="https://t3.ftcdn.net/jpg/01/97/14/58/360_F_197145865_xCYKmR3nAt8noX9l9YKU5xvF5dcojlXW.jpg" />
                </div>

                {/* LOGO ENDS */}


                {/* SEARCH STARTS  */}

                <div className='relative mt-1 p-3 rounded-md'>
                    <div className='absolute mt-1 pt-1.5  pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-600' />
                    </div>
                    <input className='bg-gray-50 block w-full  pl-10 sm:text-sm border-gray-400 focus:ring-black focus:border-black rounded-md' type="text" placeholder='Search' />

                </div>

                {/* SEARCH ENDS */}



                {/* ICONS STARTS  */}
                <div style={{ marginTop: "-23px" }} className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={()=>router.push("/")} className='navbtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />

                    {session ? (
                        <>
                            <div className='relative navbtn'>
                                <PaperAirplaneIcon className='navbtn rotate-45' />
                                <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse font-bold text-md text-white'>9+</div>
                            </div>
                            <PlusCircleIcon onClick={()=>setOpen(true)} className='navbtn block' />
                            <UserGroupIcon className='navbtn' />
                            <HeartIcon className='navbtn' />
                            <img 
                            onClick={signOut}
                            src={session.user.image} alt="profile" className='h-10 rounded-full cursor-pointer' />


                        </>

                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}

                </div>
            </div>
        </div>
    )
};

export default Header;
