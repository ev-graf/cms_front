import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./components/Header/Header.jsx"
import Home from './pages/Home/Home.jsx';
import Search from './pages/Search/Search.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Settings from './pages/Settings/Settings.jsx'
import Album from './pages/Album/Album.jsx';

export default function App() {
  return (
    <>
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:albumId" element={<Album />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
    </>
  )
}
