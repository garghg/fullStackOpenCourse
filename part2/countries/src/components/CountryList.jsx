const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const CountryList = ({ country, selectCountry }) => {
    return (
        <div>
            <p>{country}<Button text={'Show'} onClick={() => selectCountry(country)}/></p>
        </div>
        )
}

export default CountryList