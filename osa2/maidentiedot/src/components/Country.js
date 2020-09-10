import React from 'react'

const Country = ({country, showOneCountry}) => {

    const handleClick = () => {
        showOneCountry(country)
    }

    return (

        <div>{country.name}<button onClick={handleClick}>show</button></div>
            

    )
}
export default Country