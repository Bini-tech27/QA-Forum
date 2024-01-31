import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Footer from "./components/Footer";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Question from './components/Question';
import Answer from './components/Answer';
import Dashboard from './components/Dashboard'

function App() {
  const role = localStorage.getItem("role");

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          {role === "user" ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/question" element={<Question />} />
              <Route path="/answer/:id" element={<Answer />} />
            </>
          ) : (
            <Route path="/home" element={<Dashboard />} />
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;



















