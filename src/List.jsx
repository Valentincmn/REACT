const cities = [
    { id: 1, name: 'London', inhabitants: 8982000 },
    { id: 2, name: 'Berlin', inhabitants: 3769000 },
    { id: 3, name: 'Madrid', inhabitants: 3223000 },
    { id: 4, name: 'Rome', inhabitants: 2873000 },
    { id: 5, name: 'Paris', inhabitants: 2148000 },
    { id: 6, name: 'Bucharest', inhabitants: 1836000 },
    { id: 7, name: 'Vienna', inhabitants: 1897000 },
    { id: 8, name: 'Hamburg', inhabitants: 1841000 },
    { id: 9, name: 'Budapest', inhabitants: 1756000 },
    { id: 10, name: 'Warsaw', inhabitants: 1794000 }
];

function List() {
    return ( 
        <>
            <ul>
                {cities.map((city) => 
                    <li key={city.id}>
                        {city.name} : {city.inhabitants} habitants
                    </li>
                )}
            </ul>
        </>
     );
}

export default List;