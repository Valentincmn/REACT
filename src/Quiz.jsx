import quiz from "./data/quiz"
import { useState } from "react"

// PAGE DU QUIZ !

// Vous devez à partir de quiz.js générer un petit QCM :

// Pour chaque élément de quiz vous afficherez : 
// - La question 
// - Les choix possibles de réponses 
// - La réponse est validée lorsque l'on clique sur celle-ci  
// - Vous devrez ensuite vérifier que la réponse choisie soit bien la bonne (regarder dans quiz.js)
// - Une fois toutes les questions répondues le jeu s'arrete et un bouton permet de recommencer 

// BONUS : affichage du score 


// Concepts à utiliser : 

// useState (le numéro de la question, le score ...)
// Le rendu conditionnel (if .. else => ? :)
// Ecouteur d'événement avec onClick (lorsque l'on clique sur une des réponses)
// méthode .map pour afficher les différents choix possibles


// Indices : 

// Un state pourra s'occuper de l'index de la question (index à 1 au départ pour la première question 
// puis lorsque l'on répond on incrémente celui-ci)
// Un state sera aussi très utile pour le score (à chaque bonne réponse on incrémente ce state de 1)
// If ... else à utiliser aussi dans le JSX (ex: si le state de l'index arrive à la fin on affiche 
// un bouton recommencer et le score sinon on affiche les questions)


// Comment utiliser l'index:

// Pour récupérer une question avec un certain index : quiz[index].question
// Pareil pour les choix : quiz[index].choices


function Quiz() {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)

    // Fonction pour passer à la question suivante (et ajouter +1 au score si bonne réponse)
    function handleClick(choice) {
        if (choice === quiz[questionIndex].correctAnswer) {
            // Ajout de +1 au score
            setScore(score + 1)
        }

        // Passer à la question suivante
        setQuestionIndex(questionIndex + 1)
    }

    // Fonction de reset (on remet index et score à 0)
    function handleReset() {
        setQuestionIndex(0)
        setScore(0)
    }


    return ( 
        <>
            <h2>Quiz en React</h2>  

            <h2>Score : {score} / 5</h2>

            {/* Ci-dessous l'opérateur ternaire (if ... else) : 
            Si (après le ?) le questionIndex est inférieur à la longueur de quiz on affiche la question et le reste 
            Sinon (après le : ) on affiche le bouton de reset */}


            { (questionIndex < quiz.length) 
            
                ? 

                <>       
                    <h2>{quiz[questionIndex].question}</h2>
                    {quiz[questionIndex].choices.map((choice, index) => 
                        <button key={index} onClick={() => handleClick(choice)}>{choice}</button>)} 
                </>

                :

                <>
                    <h2>Fin de partie !</h2>
                    <button onClick={() => handleReset()}>Recommencer</button>         
                </>
            }
        </>
    )
}

export default Quiz;