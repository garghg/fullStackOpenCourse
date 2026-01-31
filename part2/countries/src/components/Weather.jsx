import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY


const Weather = ({ capital }) => {
    const [geoData, setGeoData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
    axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${api_key}`)
        .then(res => setGeoData(res.data))
    }, [capital])

    useEffect(() => {
    if (geoData) {
        const { lat, lon } = geoData[0]
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        .then(res => setWeatherData(res.data))
    }
    }, [geoData])

    if (weatherData) {
        const iconCode = weatherData.weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
        return (
        <div>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <img src={iconUrl} alt={weatherData.weather[0].description} />
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
        )
    }

}

export default Weather