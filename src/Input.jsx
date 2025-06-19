function Input({ name, value, placeholder, handleChange }) {

    return ( 
        <>
            <input 
                type="text" 
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </>
     );
}

export default Input;