

import React, { useState, useEffect } from 'react'
import pService from "./services/people"
import "./index.css"

const Note = ({msg}) => {
  if(!msg){
  return(null)
  }
  return(
    <div className = "message" >{msg}</div>
  )
}
const ErrNote = ({err}) => {
  if(!err){
    return null
  }
  return(
    <div className = "err" >{err}</div>
  )
}

const Pluettelo = ({datarows , del}) =>{
  return(
    <ul>
      { datarows.map( datarow => 
      <li key = {datarow.id}>{datarow.name} {datarow.number}
      <button onClick = {() => del(datarow.id , datarow.name)}>delete</button>
      </li>
      )}
    </ul>
  )

}

const Pform = ({namef , numf, subf}) => {
  return(
    <form>
        <div>
          name: <input onChange = {namef} />
        </div>
        <div>
          number: <input onChange = {numf} />
        </div>
        <div>
          <button type="submit" onClick = {subf}>add</button>
        </div>
      </form>
  )
}

const Pfilter = ({filterf}) => {
  return (
    <>
    filter shown with<input onChange = {filterf} />
    </>
  )

}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setFilter] = useState('')
  const [msg , setMsg] = useState('')
  const [err , setErr] = useState('')
  useEffect(() => {
    pService.getAll()
    .then(people => {
      setPersons(people)
    }
    )

  }, [])

  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      name:newName,
      number:newNumber
    }
    let person = persons.find((person) => person.name === newName)
    if(person){
      if(window.confirm(`${newName} is already added to phonebook, replace old number 
with new one?`)){
        pService.change(person.id , newData)
        .then(obj => {
          setPersons(persons.map(p => p.id !== person.id ? p : obj))
          setMsg("number changed")
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        }).catch(error => {
          setErr(`information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErr(null)
          }, 5000)
        })
      }
      return
    }else{
    pService.create(newData)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMsg("person added")
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    })
    }
  }
  
  const namesShown = () =>{
    return persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()));
  }

  const del = (id , name) =>{
    if(window.confirm(`Delete ${name}`)){
    pService.del(id)
    .then( () => {
    setPersons(persons.filter(a => a.id !== id))
    setMsg("person deleted")
    setTimeout(() => {
      setMsg(null)
    }, 5000)
     })
  }
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Note msg = {msg} />
      <ErrNote err = {err} />
      <Pfilter filterf = {(event)=> setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <Pform namef = {handleNameChange} numf = {handleNumberChange} 
        subf = {handleSubmit} />   
      <h3>Numbers</h3>
      <Pluettelo datarows = {namesShown()} del = {del} />
    </div>
  )

}

export default App