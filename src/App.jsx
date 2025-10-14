import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import NotFound from "./pages/NotFound"; 4
import ErrorBoundary from "./components/ErrorBoundary"; 

export default function App() {
  return (
    <Router>
      
      <ErrorBoundary>
       
        <Layout>
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            
            
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}