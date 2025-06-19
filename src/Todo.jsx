import { useState, useEffect } from "react"

// TODO APP : 

// A faire : 
// - Un input pour rentrer les todos 
// - Un bouton de soumission 
// - Un espace reservé sous ces 2 éléments afin d'afficher nos todos

// Chaque todo contiendra : 
// - Du texte, le contenu tapé dans l'input
// - Un bouton de check => quand on clique dessus la todo est barrée ou en sous-brillance 
// - Un bouton de suppression de la todo 

// Le local storage 
// - Chaque todo doit etre enregistrée en LS 
// - Lorsue l'on arrive sur notre page, les todos sauvegardées en LS doivent s'afficher

// BONUS : 
// - Un bouton d'edit de la todo qui nous êrmet de modifier son contenu


function Todo() {
    const [value, setValue] = useState("")
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
    const [error, setError] = useState("")
    const [edit, setEdit] = useState(null)

    // Dès que le tableau, qui est un state, des "todos" change de valeur ou est mis à jour, 
    // on enregistre la nouvelle version du tableau en Local Storage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    // Fonction d'ajout d'une todo
    function addTodo() {
        // Si la todo a plus de 5 caractères on l'ajoute a notyre tableau todos
        if (value.length > 5) {

            let newTodo = {
                content: value,
                check: false
            }

            // On met à jour le 
            setTodos([ ... todos, newTodo])
            setError("")
        
        // Sinon on affiche une erreur 
        } else  {
            setError("Votre todo doit contenir au moins 5 caractères")
        }
        // On vide l'input une fois la todo soumise
        setValue("")
    }

    // Fonction de suppression d'une todo, qui se base sur son contenu 
    function deleteTodo(index) {
        // On fait une copie de todos 
        let todosCopy = [ ... todos ]
        // On vient filtrer la copie 
        todosCopy = todosCopy.filter((todo) => todo.content != todos[index].content)
        // On eneregistre la copie dans le state todos
        setTodos(todosCopy)
    }

    // Fonction qui vient changer la valeur de check
    function handleCheck(todo, index) {
        // On change la valeur de check dans l'objet de notre todo
        todo.check = !todo.check
        // On fait une copie de todos : todosCopy
        let todosCopy = [ ... todos ]

        // On vient remplacer l'ancienne todo par la nouvelle avant de l'ajouter 
        // au state "todos"
        todosCopy.splice(index, 1, todo)
        setTodos(todosCopy)
    }

    function editTodo(todo) {
        setEdit({
            todo, 
            newTodo : "",
            open: true

        })
    }

    // Fonction à corriger / améliorer (ou partir sur autre chose ...)
    function updateTodo() {
        let newTodo = {
            content : edit.newTodo,
            check: edit.todo.check
        }

        let todosCopy = [ ... todos ]
        
        let index = todosCopy.indexOf(edit.todo)

        console.log("index dans updateTodo : " + index)

        todosCopy = todosCopy.splice(index, 1, newTodo)

        setTodos(todosCopy)
        setEdit({ ... edit, open: false})
    }

    console.log(edit)
    console.log(todos)

    return ( 
        <>
            { edit && edit.open && 
                <div className="edit-modal">
                    <input type="text" placeholder={edit.todo.content} onChange={(e) => setEdit({ ... edit, newTodo : e.target.value })} />
                    <button onClick={() => updateTodo()}>Valider</button>
                </div>
            }

            <h2>Bienvenue sur ma Todo App</h2>

            <div className="todo-input">
                <input 
                    type="text" 
                    placeholder="Insérer votre todo ..."
                    name="todo"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => addTodo()}>Ajouter</button>
            </div>

            { error && <p>{error}</p> }

            <div className="todo-list">
                {todos && todos.map((todo, index) => (
                    <div key={index} className="todo">
                        { todo.check ? <p style={{ textDecoration : "line-through" }}>{todo.content}</p> : <p>{todo.content}</p> }
                        
                        <input onClick={() => handleCheck(todo, index)} type="checkbox" checked={todo.check}/>

                        <button onClick={() => editTodo(todo)}>🖋️</button>
                        
                        <button onClick={() => deleteTodo(index)}>x</button>
                    </div>
                ))}
            </div>
        </>
     );
}

export default Todo;