import Input from "./Input.jsx"
import { useState } from "react"

// Je veux 3 input de type texte :
// - Un input pour la marque 
// - Un input pour le modèle de la voiture 
// - Un input pour la couleur 

// Idéalement on utilisera notre composant existant Input

// En dessous de ces inputs un bouton de validation. 
// Une fois le bouton cliqué on affichera dans une phrase en dessous 
// ce que le user aura écrit dans les champs : 

// ex : "Je conduis la Renault Twingo de couleur Jaune" 

function Cars() {
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [color, setColor] = useState("")
    const [submit, setSubmit] = useState(false)

    // Fonction de changement de state (on recup le name de l'input via l'event et on update le bon state) 
    function handleChange(e) {
        if (e.target.name === "brand") {
            setBrand(e.target.value)
        } else if (e.target.name === "model") {
            setModel(e.target.value)
        } else {
            setColor(e.target.value)
        }
    }

    // On gére la soumission du bouton de submit
    function handleSubmit() {
        setSubmit(true)
    }

    // Mon tableau qui contient les infos pour chaque input
    let array = [
        {name: "brand", value: brand, placeholder: "Votre marque ..."},
        {name: "model", value: model, placeholder: "Votre modèle ..."},
        {name: "color", value: color, placeholder: "Votre couleur ..."}
    ]

    return ( 
        <>
            {array.map(elem =>                 
                <Input 
                    name={elem.name}
                    value={elem.value} 
                    placeholder={elem.placeholder}
                    handleChange={handleChange}
            />)}
            
            {/* On a nos 3 Inputs issus du composant Input.jsx */}
            {/* <Input 
                name="brand"
                value={brand} 
                placeholder="Votre marque ..."
                handleChange={handleChange}
            />

            <Input 
                name="model"
                value={model} 
                placeholder="Votre modèle ..."
                handleChange={handleChange}
            />

            <Input 
                name="color"
                value={color} 
                placeholder="Votre couleur ..."
                handleChange={handleChange}
            /> */}

            {/* On écoute le click sur le bouton de soumission et on appelle handleSubmit */}
            <button onClick={() => handleSubmit()}>Afficher infos</button>

            {/* Si on a bien cliqué sur le bouton de soumission on affiche la phrase */}
            { submit &&  <h3>La {brand} {model} est de couleur {color} </h3>  }

            
        </>
     );
}

export default Cars;