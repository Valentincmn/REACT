import { useState, useEffect } from "react"


function Home() {
    function fetchAPI() {
        fetch("http://localhost:3000/test")
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    return ( 
        <>
            <h2>Bienvenue sur la Homepage</h2>
            <button onClick={() => fetchAPI()}>Click for the API</button>
        </> 
    );
}

export default Home; 