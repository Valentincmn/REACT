import { useState, useEffect } from "react"

function Movies() {
    const [search, setSearch] = useState("")
    const [value, setValue] = useState("")
    const [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState([])
    const [showFavorites, setShowFavorites] = useState(false)


    useEffect(() => {
        setShowFavorites(false)
        fetchApi(search)
    }, [search])


    function fetchApi(search) {
        let apiKey = "eed08b06"

        fetch(`https://omdbapi.com/?apiKey=${apiKey}&s=${search}`)
        .then(res => res.json())
        .then(data => {
            if (data.Search) {
                setMovies(data.Search)
            } 
        })
        .catch(err => console.log(err))
    }

    function searchMovies() {
        setShowFavorites(false)
        setSearch(value)
    }

    function addToFav(movie) {
        setFavorites([ ... favorites, movie])
    }

    function deleteFromFav(movie) {

        let arrayCopy = [ ... favorites ]

        let index = arrayCopy.indexOf(movie)

        arrayCopy.splice(index, 1)

        setFavorites(arrayCopy)
    }

    console.log(favorites)


    return ( 
        <>
            <h2>OMDB API : Movies app</h2>

            <input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => searchMovies()}>Rechercher</button>
            <button onClick={() => setShowFavorites(true)}>Favoris</button>
            
            <ul className="movies-list">
                {(movies && showFavorites === false) && movies.map((movie) => 
                    <li key={movie.imdbID}>
                        <img src={movie.Poster} />
                        <h2>{movie.Title}</h2>
                        <h2>{movie.Year}</h2>
                        <button onClick={() => addToFav(movie)}>Ajouter aux favoris</button>
                    </li>
                )}
            </ul>

            <ul className="fav-list">
                {(favorites && showFavorites === true) && favorites.map((movie) => 
                    <li key={movie.imdbID}>
                        <img src={movie.Poster} />
                        <h2>{movie.Title}</h2>
                        <h2>{movie.Year}</h2>
                        <button onClick={() => deleteFromFav(movie)}>Supprimer des favoris</button>
                    </li>
                )}
            </ul>
    </>
     );
}

export default Movies;