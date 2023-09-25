'use client'
import React from 'react'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa, supabase} from '@supabase/auth-ui-shared'
import clientSupabase from '../lib/supabaseConfig'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
    },
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
    },
  },
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
    },
  },
}

function page() {
    const router = useRouter()
    
    clientSupabase.auth.onAuthStateChange((event, session)=>{
        // console.log(event, session)
        if(event == 'SIGNED_IN'){
            router.push(`/profile/${session?.access_token}`)
        }
        if(event == 'SIGNED_OUT'){
            console.log('signed out')
        }
    })

    const signOut = () =>{
        clientSupabase.auth.signOut()
    }

  return (
    <main className='w-1/2 mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Sign In</h1>
      <Auth
      supabaseClient={clientSupabase}
      appearance={{theme:ThemeSupa, extend: true, style:{
        button:{marginTop: '1rem', borderColor:'GrayText'},
        input:{color:'aquamarine'}
      }}}
      providers={['google', 'facebook', 'twitter']}
      />
      <button className='text-center' onClick={signOut}>sign out</button>
    </main>
  )
}

export default page