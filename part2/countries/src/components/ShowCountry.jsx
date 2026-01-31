import Weather from "./Weather"

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
            <Weather capital={capital}/>
        </div>
    )
}


export default ShowCountry