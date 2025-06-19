import { Outlet, Link } from "react-router-dom";
import PlaylistDrawer from "./PlaylistDrawer";

import "./Layout.css"

const Layout = ({ playlistTracks, setPlaylistTracks }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li>
            <Link to="/input">Input</Link>
          </li>
          <li>
            <Link to="/cars">Cars</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/geoquiz">GeoQuiz</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/music">Music</Link>
          </li>
        </ul>

        <PlaylistDrawer playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />

      </nav>

      <Outlet />
    </>
  )
};

export default Layout;