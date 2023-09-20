import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Index from './components/Index';
import React, { useEffect } from "react";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
