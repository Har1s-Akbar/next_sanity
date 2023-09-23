'use client'
import React from 'react'
import {Auth} from '@supabase/auth-ui-react'
// import { clientSupabase } from '../lib/supabaseClient'
import {ThemeSupa} from '@supabase/auth-ui-shared'

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
      // ..
    },
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
      //..
    },
  },
  // You can also add more theme variations with different names.
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
      //..
    },
  },
}

function page() {
  return (
    <main className='w-1/2 mx-auto'>
      <h1 className='text-3xl text-center'>Sign In</h1>
      {/* <Auth
      supabaseClient={clientSupabase}
      appearance={{theme:ThemeSupa, extend: true, style:{
        button:{background: '#4b4b4b', color:'aqua', marginTop: '1rem', borderColor:'GrayText'},
        input:{color:'aquamarine'}
      }}}
      providers={['google', 'facebook', 'twitter']}
      /> */}
    </main>
  )
}

export default page