import React, { useState } from 'react'
import Registration from './pages/Registration';
import Login from './pages/Login';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Notes from './components/Notes';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
  <BrowserRouter>
    <Routes> 
      <Route path = "/" element = {<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='notes' element={
          <ProtectedRoute>
          <Notes/>
          </ProtectedRoute> 
      }/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Registration/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
