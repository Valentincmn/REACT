import Layout from "./Layout.jsx"
import NoPage from "./NoPage.jsx"
import Cars from "./Cars.jsx"
import Quiz from "./Quiz.jsx"
import Home from "./Home.jsx"
import Input from "./Input.jsx"
import Movies from "./Movies.jsx"
import GeoQuiz from "./GeoQuiz.jsx"
import Todo from "./Todo.jsx"
import Music from "./Music.jsx"
import Album from "./Album.jsx"
import './App.css'
import PlaylistDrawer from "./PlaylistDrawer.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useState, useEffect } from "react"


function App() {
  const [playlistTracks, setPlaylistTracks] = useState(JSON.parse(localStorage.getItem("playlist")) || [])
  
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />}>
            <Route index element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="input" element={<Input />} />
            <Route path="cars" element={<Cars />} />
            <Route path="movies" element={<Movies />} />
            <Route path="geoquiz" element={<GeoQuiz />} />
            <Route path="todo" element={<Todo />} />
            <Route path="music" element={<Music />} />
            <Route path="music/album/:id" element={<Album playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
