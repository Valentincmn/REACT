// On veut ajouter une fonctionnalité Playlist à notre application 

// On affichera cette playlist dans un "drawer" => regarder sur MUI (Material UI)

// On doit pouvoir ajouter des morceaux à notre playlist mais aussi les supprimer de 
// la playlist. On doit naturellement pouvoir jouer les morceaux dans la playlist.

// Afin de préserver la playlist après refresh on sauvegarde les morceaux 
// en Local Storage

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "react-js-loader"

import "./Music.css"

function Music() {
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")
    const [albums, setAlbums] = useState([])

    let color = "#213547"

    useEffect(() => {
        fetchAPI(search)
    }, [search])

    function fetchAPI(searchTerm) {
        fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=album`)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                setAlbums(data.results)
            }
        })
        .catch(err => console.log(err)) 
    }

    return ( 
        <>
            <h1>MU$IC</h1>

            <div className="search-zone">
                <input 
                    placeholder="Chercher un album ..."
                    type="text" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => setSearch(value)}>Rechercher</button>
            </div>

            { (search && !albums) && <Loader type="spinner-default" bgColor={color} color={color} title={"chargement ..."} size={100} />}

            <div className="result-zone">
                { albums && albums.map(album => (
                    <div className="album" key={album.collectionId}>
                        <Link to={`album/${album.collectionId}`}>
                            <img src={album.artworkUrl100.replace("100x100", "300x300")} alt={album.collectionName} />
                        </Link> 
                        <h3>{album.artistName} - {album.collectionName}</h3>
                        <h4>{new Date(album.releaseDate).toLocaleDateString("fr-FR")}</h4>
                    </div>
                )) }
            </div>
        </>
     );
}

export default Music;