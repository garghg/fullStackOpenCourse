const CountryList = ({ country }) => {
    return (
        <div>
            <p>{country}</p>
        </div>
    )
}

const Country = ({ flag }) => {
    return (
        <div>
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
        return (
            <div>
                <Country flag={flag}/>
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