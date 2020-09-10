import React from 'react'



const OneCountry = ({one}) => {

    
    return (
        <div>
            
            <h1>{one.name}</h1>
            <p>{one.capital}</p>
            <p>{one.population}</p>
            <h2>languages</h2>
            <ul>
            {one.languages.map((language, i) =>
            <li key={i}>{language.name}</li>)}
            </ul>
            <img src={one.flag} alt="lippu" width="20%" ></img>
            
        </div>
    )
}
export default OneCountry