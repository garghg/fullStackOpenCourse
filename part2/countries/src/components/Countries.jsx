import { useState, useEffect } from "react"
import ShowCountry from "./ShowCountry"
import CountryList from "./CountryList"

const Countries = ({ countries, countriesData }) => {

    const [selected, setSelected] = useState(null)

    const handleSelect = (selectedCountry) => {
        setSelected(selectedCountry)
    }

    useEffect(() => {
        setSelected(null)
    }, [countries])

    if (countries.length >= 10) {
        return (
            <div>
                Too many countries; Please be more specific.
            </div>
        )
    } else if (selected != null) {
        return <ShowCountry countriesData={countriesData} selectedCountry={selected}/>
    } else {
        return (
        <div>
            {countries.map(country => <CountryList country={country} key={country} selectCountry={handleSelect}/>)}
        </div>
    )
    }
    
}

export default Countries