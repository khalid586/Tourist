import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function Root() {
  return (
    <div className='font-custom'>
        <NavBar></NavBar>
        <div className='min-h-[70vh]'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Root