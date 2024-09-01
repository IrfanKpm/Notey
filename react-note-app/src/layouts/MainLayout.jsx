import React from 'react'
import NavBar from '../components/navbar/NavBar'
import { Outlet } from 'react-router-dom'

function MainLayout({ onSearchChange }) {
  return (
    <>
      <NavBar onSearchChange={onSearchChange}/>
      <Outlet/>
    </>
  )
}

export default MainLayout
