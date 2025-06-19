import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import QueueMusicIcon from '@mui/icons-material/QueueMusic';

import "./Album.css"

function Album() {
    const [album, setAlbum] = useState(null)


    const { id } = useParams()
    let apiLink = `https://itunes.apple.com/lookup?id=${id}&entity=song`

    useEffect(() => {
        fetch(apiLink)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAlbum(data.results)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        localStorage.setItem("playlist", JSON.stringify(playlistTracks))
    }, [playlistTracks])

    function playExtract(e, extract) {
        let audio = e.target.audio || new Audio(extract)


        let button = e.target

        if (audio.paused) {
            button.textContent = "⏸️"
            audio.play()
        } else {
            button.textContent = "▶️"
            audio.pause()
        }

        button.audio = audio
    }

    function addToPlaylist(track) {
        setPlaylistTracks([...playlistTracks, track])
    }

    console.log(playlistTracks)

    return (
        <>
            {album && <>
                <h2>{album[0].artistName} - {album[0].collectionName}</h2>
                <h3>{new Date(album[0].releaseDate).toLocaleDateString("fr-FR")}</h3>
            </>}

            <div className="album-part">

                {album &&
                    <div className="album-cover">
                        <img src={album[0].artworkUrl100.replace("100x100", "500x500")} />
                    </div>
                }

                <div className="album-tracks">
                    {album && album.map(track => (
                        (track.kind) &&
                        <div key={track.trackId} className="track">
                            <button onClick={() => addToPlaylist(track)}>< QueueMusicIcon /></button>
                            <button onClick={(e) => playExtract(e, track.previewUrl)}>▶️</button>
                            <p>{track.trackNumber} - {track.trackName}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Album;