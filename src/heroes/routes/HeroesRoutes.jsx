import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../shared'
import { DcPage, HeroPage, MarvelPage, SearchPage } from '../pages'

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Outlet />
        <Routes>
          <Route path='marvel' element={<MarvelPage />} />
          <Route path='dc' element={<DcPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='hero/:id' element={<HeroPage />} />
          <Route path='/' element={<Navigate to='/marvel' />} />
        </Routes>
      </div>
    </>
  )
}
