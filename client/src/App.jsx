import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Footer from "./components/Footer";
import Register from './components/Register';
import Login from './components/Login';


function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* <Register /> */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/sign-in" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App










