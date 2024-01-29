import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Footer from "./components/Footer";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Question from './components/Question';
import Answer from './components/Answer';


function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/question" element={<Question />}></Route>
          <Route path="/answer/:id" element={<Answer />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App















