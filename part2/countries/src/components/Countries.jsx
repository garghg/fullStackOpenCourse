const CountryList = ({ country }) => {
    return (
        <div>
            <p>{country}</p>
        </div>
    )
}

const Country = ({ name, flag, capital, area, languages }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => (<li>{language}</li>))}
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
    } else if (countries.length === 1) {
        const country = countriesData.filter(country => country.name.common === countries[0])[0]
        const flag = country.flags.png
        const name = country.name.common
        const capital = country.capital[0]
        const area = country.area
        const languagesArr = Object.values(country.languages)
        return (
            <div>
                <Country name={name} flag={flag} capital={capital} area={area} languages={languagesArr}/>
            </div>
        )
    } else {
        return (
        <div>
            {countries.map(country => <CountryList country={country} key={country}/>)}
        </div>
    )
    }
    
}

export default Countries