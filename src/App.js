import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Forecast from './components/forecast'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [forecast, setForecast] = useState({})

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=377a740158ec6984c247960f3393caa0`
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=879d0343fc77e78f633b5793305bb3f9`

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const responsePromises = [
          axios.get(url),
          axios.get(forecast_url)
        ];
        const [responseData, forecastResponse] = await Promise.all(responsePromises);

        setData(responseData.data)
        setForecast(forecastResponse.data)

      }
      catch (error){
        handleAxiosError();
      }

      setLocation('');///initialization
    }

  }

  let isAlertShown = false;

  const handleAxiosError = () => {
    if (!isAlertShown) {
      alert("Oh, You entered invalid input, please enter again the valid location name !!");
      isAlertShown = true
    }
  }

  return (
    <div className="App">

      <div className='search'>
        <input
          value={location}
          onChange={event => { setLocation(event.target.value) }}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type='text'
        />
      </div>
      {data.name &&
        <div className='large_container'>
          <div className='container'>


            <div className='top'>

              <div className='location'>
                <p>Location: <span className='same'>{data.name}</span></p>
              </div>

              <div className='temp'>
                <h1>{data.main.temp.toFixed()} °C <img alt="weather" className='weather-icon' src="icons/03d.png" /></h1>
              </div>

              <div className='description'>
                {data.main ? <p>Description: <span className='same'>{data.weather[0].description}</span></p> : null}
              </div>
            </div>

            <div className="buttom">

              <div className='feels'>
                <p>Feels like: </p>
                {data.main ? <p> {data.main.feels_like.toFixed()}</p> : null}
              </div>

              <div className='humidity'>
                <p>Humidity: </p>
                {data.main ? <p>{data.main.humidity} %</p> : null}
              </div>
              <div className='wind'>
                <p>Wind: </p>
                {data.main ? <p> {data.wind.speed.toFixed()}MPH</p> : null}
              </div>
            </div>

          </div>

          <Forecast data={forecast} />
        </div>
      }
    </div>

  );
}



export default App;