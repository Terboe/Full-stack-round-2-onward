
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({languages}) => {
  return(
    <ul>
      {languages.map(lang => {
        return(
        <li key = {lang.name}>
          {lang.name}
        </li>
        )
      })
      }
    </ul>
  )
}
     
const Weather = ({capital}) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
  const [weather, setWeather] = useState({})

  useEffect(()=>{
    axios
    .get(url)
    .then(response =>{
      setWeather(response.data.current)
    }
    )   
  } , [url])
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature: </b>{weather.temperature} celsius</p>
      <img src={weather.weather_icons} alt= "weather" width="200" height= "200" />
      <p><b>wind: </b>{weather.wind_speed} <b>mph direction </b>{weather.wind_dir}</p>
    </div>
  )
}

const ListOfCountries = ({countries , but , weather , setWeather}) =>{
  if(countries.length > 10){
    return(
      <p>too many matches, specify another filter</p>
    )
  }
  if(countries.length >1 && countries.length < 11){
    return(
      <>
      {countries.map(country =>{
        return(
        <p key = {country.name}>{country.name} <button onClick = {() => but(country.name)}>
          show</button></p>
        )
      })
      }
      </>
    )
  }
  return(
    <>
    {countries.map(country => {
      return(
      <div key = {country.name}>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>languages</h3>
      <Languages languages = {country.languages} />
      <img src = {country.flag} width="200" height = "200" alt = "flag"/>
      <Weather capital  = {country.capital} />
      </div>
      )
    })
    }
    </>
  )
}
const App = () => {

  const [search , setSearch] = useState('')
  const [data , setData] = useState([])

  useEffect(() => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    setData(response.data)
  })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const getShown = () => {
    const shown = data.filter(d => d.name.toLowerCase().startsWith(search.toLowerCase()))
    if(shown.length === 1 ){
      
    }
    return(
      shown
    )
  }
  
 

  return (
    <div>
      find countries<input onChange = {handleSearch}/>
      <ListOfCountries countries = {getShown()} but = {setSearch} />
    </div>
  )
}

export default App;
