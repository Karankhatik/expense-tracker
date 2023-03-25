import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LandingPage } from "../src/components/LandingPage";
import {AfterLogin } from "../src/components/AfterLogin";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ExpenseProvider from "./context/ExpenseContext";

function App() {
  return (
    <>
      {/* Routing Tables  */}
      <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />        
          <Route path="/user-logged" element={<AfterLogin />} />          
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          {/* <Route path="/*" element={<ErrorPage />} /> */}
        </Routes>
      </Router>
      </ExpenseProvider>
    </>
  );
}

export default App;
