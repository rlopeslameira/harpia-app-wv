import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from './pages/Login/Login';

const MainRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      {/* <Route element={<MainLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />        
      </Route> */}
    </Routes>
  )
}

export default MainRoutes;