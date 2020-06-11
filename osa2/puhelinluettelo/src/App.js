import React, { useState, useEffect } from 'react'
import './index.css'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('')
 
  let result = true
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {        
    setPersons(initialPersons)
  })
  }, [])

  const removePersonOf = person => {
    result = window.confirm(`Do you want to delete ${person.name}?`);

    if(result === true){
      personService
      .remove(person.id)
      .then(
        setPersons(persons.filter(n => n.id !== person.id))  
      )
    }
  }

  
  const handleNameChange = (event) => {       
    setNewName(event.target.value)  
  }
  const handleNumberChange = (event) =>{    
    setNewNumber(event.target.value) 
  }
  const handleFilterChange = (event) =>{
    //text changed to lowercase in order to filtering with it
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) =>{
    event.preventDefault()

    const person = persons.map(person => person.name) //names in own array
    console.log(persons)
    if(person.includes(newName)){
      result = window.confirm(`${newName} is already added, want to replace number with new one?`)
      if(result === true){
        const idArray = persons.map(person => person.id) //id:s in own array

        const index = person.indexOf(newName) //gets the index of array with new name

        const id = idArray[index] // creates right id with the name index
        console.log(id)

        const changingNumber = persons.find(n => n.id === id)
        const changedNumber = {...changingNumber, number: newNumber}
        
        personService
        .update(id, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
        .catch(error =>{
          setNotificationColor('red')
          setNotificationMessage(
            `${newName} is already removed`
          )
          
          setTimeout(() => {          
            setNotificationMessage(null)        
          }, 2000)
          
        })

      }
    }
    else{
    const personObject = {
        name: newName,
        number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationColor('green')
    })
    
    setNotificationMessage(
      `Added ${newName}`
    )
    setTimeout(() => {          
      setNotificationMessage(null)        
    }, 2000)
    }
  }

  let namesToShow = []
  if(filter.length === 0){
      namesToShow = persons
  }
  else{
    //filter is in lowerCase so we must change person.name to lowerCase
      namesToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  }
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notcolor={notificationColor}  />
      filter with: <input
      onChange={handleFilterChange}/>
      <form onSubmit={addPerson}>
        <h2>Add new</h2>
        <div>
            name: <input 
            onChange={handleNameChange}/>
        </div>
        <div>
            number: <input 
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {namesToShow.map((person, i) =>
            <Person key={person.name} person={person}
            removePerson={() => removePersonOf(person)}
            />
        )}
        
    </div>
  )

}
export default App
