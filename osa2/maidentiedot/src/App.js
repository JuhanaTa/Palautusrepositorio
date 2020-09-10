import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import OneCountry from './components/OneCountry'


function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [country, setCountry] = useState([])
  //boolean used for hiding and making visible search results
  const [filterBool, setBool] = useState(true)
  let alert = ""

  const hook = () => {
    console.log('countries api')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])




  const handleSearch = (event) =>{
    //every change in search bar sets boolean false 
    setBool(false)
    console.log(filterBool, "bool changed")
    setCountryFilter(event.target.value.toLowerCase())
    setCountry([])
  }


  let countriesToShow = []
  
  if(countryFilter.length > 0){
    countriesToShow = countries.filter(country => country.name.toLowerCase().includes(countryFilter))
    console.log(countriesToShow)
  }
  if(countriesToShow.length > 10 ){
    countriesToShow = []
    alert = "too many matches"
  }
 //additional info shown if length of array is 1 and filter boolean is false
  if(countriesToShow.length === 1 && filterBool === false){

   
    console.log("one country detected")
    setBool(true)
    setCountry(countriesToShow)
    console.log(countriesToShow)
    alert = []
  }


  const showOneCountry = (maa) =>{
    console.log('inside one country')
    setCountry([maa])

  }
  console.log(country)
  
  return (
    <div>
      find countries: <input onChange={handleSearch}/>
      {countriesToShow.map((country, i) =>
      <Country key={i} country={country} showOneCountry={showOneCountry}/>
      )}
  
      <div>{alert}</div>
      <div>
        {country.map((one, i) =>
        <OneCountry key={one.name} one={one}/>
        )}
      </div>
    </div>
  );
  
}

export default App;
