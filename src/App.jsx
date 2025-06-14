import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Carousel from './components/Carousel'
import Team from './components/Team'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Login from './components/Login'
import FAQ from './components/FAQ'
import Chatbot from './components/Chatbot'
import { ShootingStars } from './components/ui/shooting-stars'
import { StarsBackground } from './components/ui/stars-background'

import './App.css'

function AppContent() {
  const location = useLocation();
  const isChatbotRoute = location.pathname === '/chatbot';

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {!isChatbotRoute && (
        <>
          <div className="fixed inset-0 z-0">
            <ShootingStars />
            <StarsBackground />
          </div>
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <Benefits />
                  <Carousel />
                  <Team />
                  <FAQ />
                </main>
              } />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
            <Footer />
          </div>
        </>
      )}
      {isChatbotRoute && (
        <Routes>
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App