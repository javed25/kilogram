import React from 'react'
import {getProviders, signIn as signinprovider} from "next-auth/react"
import Header from '../../components/Header';

function signin({providers}) {
    return (
        <>
    
        <Header/>
        <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>

        <div className='mt-40'>
          <div className='flex justify-center'>

            <img src="/logo.jpg" alt="" className='h-40'/>
          </div>
            <p className='font-xs italic'>Please Note: This is not an Instagram app. Your account will not conatin any of your Instagram data such as your posts or profile picture.</p>

          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className='p-3 mt-3 bg-blue-500 rounded-lg text-white' onClick={() => signinprovider(provider.id,{callbackUrl:"/"})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
        </div>
        </>
      )
    }
    

export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props : {
            providers
        }
    }
}
export default signin;
