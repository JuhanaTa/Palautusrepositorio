import React from 'react'
import App from './Person'

const PersonForm = ({PersonForm}) => {

    const [newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {       
        setNewName(event.target.value)  
      }
      const handleNumberChange = (event) =>{    
        setNewNumber(event.target.value) 
      }
    return (
        
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
    )
}


export default PersonForm