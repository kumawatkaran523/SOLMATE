import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div style={{ backgroundColor: 'black', color: '#02D8E9' }} className='min-h-screen mx-auto px-96 font-audio' >
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AppLayout