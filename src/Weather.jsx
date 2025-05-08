import React, { useState } from 'react';
import './Weather.css';

const api = {
  key: "e997b7853198e1e40df7c2f00cd31e16",
  base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [bgClass, setBgClass] = useState('default'); // Default

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
          updateBackground(result.weather[0].main);
          console.log(result);
        });
    }
  };

  const updateBackground = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clouds':
        setBgClass('cloudy');
        break;
      case 'rain':
        setBgClass('rainy');
        break;
      case 'snow':
        setBgClass('snow');
        break;
      case 'thunderstorm':
        setBgClass('thunder');
        break;
        case 'haze':
            setBgClass('haze');
            break;
      case 'clear':
        setBgClass('sunny');
        break;
      default:
        setBgClass('clear'); // Default background
        break;
    }
  };

  const searchClick = () => {
  if (city !== '') {
    fetch(`${api.base}/weather?q=${city}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setCity('');
        console.log(result);
      });
  }
};


  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={`weather-container ${bgClass}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={search}
        />
         <button className="search-button" onClick={searchClick}>Search</button>
      </div>

      {weather.main && (
        <>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys?.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
