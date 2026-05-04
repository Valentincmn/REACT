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

    // Fetch API au premier render et à chaque changement de manche
    useEffect(() => {
        function fetchOptions(currentIndex, data) {
            const random = Math.floor(Math.random() * 4)
            const newArray = []

            for (let i = 0; i < 4; i++) {
                if (i === random) {
                    newArray.push(data[currentIndex])
                } else {
                    const randomIndex = Math.floor(Math.random() * data.length)

                    if (randomIndex !== currentIndex) {
                        newArray.push(data[randomIndex])
                    } else {
                        newArray.push(data[randomIndex + 1])
                    }
                }
            }
            setOptions(newArray)
        }

        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                setCorrection("")
                const randomIndex = Math.floor(Math.random() * data.length)
                setCountry(data[randomIndex])
                fetchOptions(randomIndex, data)
            })
            .catch((error) => console.log(error))
    }, [round])

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