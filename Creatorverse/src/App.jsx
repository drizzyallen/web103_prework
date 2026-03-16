import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Hero Section */}
        <header className="hero-banner" style={{
          backgroundImage: `url('https://creatorverse-production.up.railway.app/static/media/banner.de5659898d3bfc5eb8ea.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '5rem', 
            fontWeight: '900', 
            letterSpacing: '4px',
            marginBottom: '2rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            textTransform: 'uppercase'
          }}>
            Creatorverse
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.location.href = "/"}>VIEW ALL CREATORS</button>
            <button onClick={() => window.location.href = "/new"}>ADD A CREATOR</button>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<ShowCreators />} />
            <Route path="/new" element={<AddCreator />} />
            <Route path="/creators/:id" element={<ViewCreator />} />
            <Route path="/edit/:id" element={<EditCreator />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
