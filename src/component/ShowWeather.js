import React, {Component, useEffect, useState} from "react";
import Axios from 'axios'
import {GoSearch} from 'react-icons/go';

import styles from './ShowWeather.module.css'


function ShowWeather() {

  const [city, setCity] = useState("")
  const [weather, setWeather] = useState([])
  const [error, setError] = useState(false)
  const [active, setActive] = useState(false)

  const searchCity = async (e) => {
    e.preventDefault()
    try {
      const weatherResponse = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.React_App_APIKEY}&lang=en`)
      setError(null)
      setWeather(weatherResponse.data)
    } catch (e) {
      setError("City not found")
      console.log("City not found")
      setCity("")
      console.log(e)
    }
  }

  function showDate(){
    return new Date().toJSON().slice(0,10).replace(/-/g,'/')
  }

  function errorHandler() {
    return <div className={styles.error} role="alert">
      {error}
    </div>
  }

  function showWeatherCard(){
    return setActive(!active)
  }

  return (
    <div>
      <div className={styles.wrap}>
        <form onSubmit={searchCity} className={styles.search}>
          <input
            className={styles.searchTerm}
            type="text"
            name="weatherCity"
            placeholder="City, Country or only City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit" className={styles.searchButton} onClick={() => {
            {
              !active && showWeatherCard()
            }
          }}>
            <a><GoSearch/></a>
          </button>
        </form>
        <div>{errorHandler()}</div>
      </div>
      {active &&
      <div className={styles.weather_container}>
        <div className={styles.inner_container}>
          <div className={styles.location}>
            <div><i className="fas fa-map-marker-alt"/></div>
            {weather && weather.sys && <h3>{weather.name}, {weather.sys.country}</h3>}
          </div>
          <div>{showDate()}</div>
          <div className={styles.weather_icon}>

            {weather.weather &&
            <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="cloud image"/>}
          </div>
          <div className={styles.cloud_status}>

            {weather.weather && <h2>{weather.weather[0].main}</h2>}
          </div>
          <div className={styles.temp}>
            {weather.main && <h1>{weather.main.temp}&deg;C</h1>}
          </div>
          <div className={styles.wind_hum}>
            {weather.wind && <span><i className="fas fa-wind"/>WS: {weather.wind.speed} km/s</span>}
            {weather.main && <span><i className="fas fa-tint"/>Humidity: {weather.main.humidity}%</span>}
          </div>
        </div>
      </div>
      }
    </div>
  )
}


export default ShowWeather