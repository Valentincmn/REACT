import { useState, useEffect } from "react"

// API à utiliser : https://restcountries.com/v3.1/all (pas de clé API)

// Dans ce composant vous devrez : 

// 1 - Afficher un drapeau aléatoire 
// 
// 2 - Au choix : 
// 
// En dessous, afficher 4 boutons chacun ayant un nom de pays 
// et dont l'un d'eux ayant le bon nom de pays. 
//
// OU
//
// Un inpyut dans lequel vous devrez mettre le bon nom de pays. 
// On mettra la réponse en minuiscule, on échappe les caractères spéciaux, les espaces 
// et on viendra vérifier si la réponse est la bonne en Francais et en Anglais 

// ON fera en sorte qu'une manche dure 10 tours et on affiche le score (+1 pour bonne réponse)

function GeoQuiz() {
    const [country, setCountry] = useState(null)
    const [options, setOptions] = useState([])
    const [score, setScore] = useState(0)
    const [round, setRound] = useState(1)
    const [correction, setCorrection] = useState("")

    // On vient fetch l'API pour recup la liste des pays lors du premier render 
    // mais aussi lorsque le state "round" change de valeur
    useEffect(() => {
        fetchAPI()
    }, [round]) 

    // Notre fonction pour fetch 
    function fetchAPI() {
        fetch( "https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            // On vide le message dit de correction (Bonne ou mauvaise réponse)
            setCorrection("")

            // On genere un index aléatoire pour recup un pays aléatoire
            let randomIndex = Math.floor(Math.random() * data.length)
            // On enregistre le pays dans le state "country"
            setCountry(data[randomIndex])
            // On appelle la fonction d'affichage des options en lui passant l'index du pays 
            // (pour avoir la bonne réponse et pouvoir comparer) et aussi data qui contient la liste des pays 
            // afin d'y piocher 3 autres pays random pour les options
            fetchOptions(randomIndex, data)
        })
        .catch(error => console.log(error))
    }

    function fetchOptions(currentIndex, data) {
        // On génère un chiffre random dans l'optique de mélanger les elems du tableau de réponses
        // (afin que la bonne réponse ne soit pas toujours au meme endroit)
        let random = Math.floor(Math.random() * 4)

        // On crée un tableau destiné à recevoir nos options 
        let newArray = []

        // Avec une boucle on vient ajouter 3 fois un pays aléatoire à notre tableau 
        // plus le pays dont le drapeau est affiché que l'on ajoute au tableau après 
        // l'index aléatoire généré plus haut (random)
        for (let i=0; i < 4; i++) {
            if (i == random) {
                newArray.push(data[currentIndex])
            } else {
                let randomIndex =  Math.floor(Math.random() * data.length)

                if (randomIndex != currentIndex) {
                    newArray.push(data[randomIndex])
                } else {
                    newArray.push(data[randomIndex + 1])
                }
            }
        }
        // On vient ajouter notre tableau d'options au state "options"
        setOptions(newArray)
    }

    // Fonction qui vioent vérifier la réponse, mettre à jour le score, 
    // afficher le message dit de "correction" et passe au tour suivant au bout de 3 sec
    function handleOptionClick(optionName) {
        if (optionName === country.name.common) {
            setScore(score + 1)
            setCorrection("Bonne réponse !")

            setTimeout(() => {
                setRound(round + 1)
            }, 3000);
        } else {
            setCorrection("Faux ! La réponse est : " + country.name.common)

            setTimeout(() => {
                setRound(round + 1)
            }, 3000);
        }
    }

    // Fonction pour redémarrer le jeu : on remet les rounds et le score à 0
    function handleRestart() {
        setScore(0)
        setRound(0)
    }


    return ( 
        <>
            <h2>Geo Quiz en React</h2>

            {/* Affichage conditionnel : si nous sommes en dessous des 10 rounds on affiche drapeau et options 
            sinon on affiche le score et le bouton pour recommencer  */}
            { (round === 11) ?
                <>
                    <div>
                        <h3>Fin de partie !</h3>
                        <h3>Votre score est de {score} / 10</h3>
                        <button onClick={() => handleRestart()}>Recommencer</button>
                    </div>
                </>

                :
                
                <>
                    <h3>Round : {round} / 10</h3>
                    <h3>Score : {score} / 10</h3>

                    { country && <img src={country.flags.png}></img> }
                
                    { options &&  options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option.name.common)}>{ option && option.name.common}</button>
                    ))}

                    { correction && <h3>{correction}</h3>  }
                </>
            }
        </> 
    );
}

export default GeoQuiz;