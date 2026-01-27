import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const countryNames = countries.map(country => country.name.common)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filterCountries = () => {
    return countryNames.filter(country => country.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div>
      <form>
        Find countries: <input value={search} onChange={handleSearch} />
      </form>
      <Countries countries={filterCountries()} countriesData={countries}/>
    </div>
  )
}

export default App
