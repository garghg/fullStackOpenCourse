import { useState } from "react"

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const CountryList = ({ country, countriesData }) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        const updatedShow = !show
        setShow(updatedShow)
        return updatedShow
    }

    if (show) {
        return (
            <div>
                <ShowCountry countriesData={countriesData} selectedCountry={country}/>
            </div>
        )
    } else {
        return (
        <div>
            <p>{country}<Button text={'Show'} onClick={handleShow}/></p>
        </div>
        )
    }
}

const ShowCountry = ({ countriesData, selectedCountry }) => {
    const countryData = countriesData.filter(country => country.name.common === selectedCountry)[0]
    const flag = countryData.flags.png
    const name = countryData.name.common
    const capital = countryData.capital[0]
    const area = countryData.area
    const languagesArr = Object.values(countryData.languages)
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <h2>Languages</h2>
            <ul>
                {languagesArr.map(language => (<li key={language}>{language}</li>))}
            </ul>
            <img src={flag} alt="Flag" />
        </div>
    )
}


const Countries = ({ countries, countriesData }) => {

    if (countries.length >= 10) {
        return (
            <div>
                Too many countries; Please be more specific.
            </div>
        )
    } else {
        return (
        <div>
            {countries.map(country => <CountryList country={country} key={country} countriesData={countriesData}/>)}
        </div>
    )
    }
    
}

export default Countries