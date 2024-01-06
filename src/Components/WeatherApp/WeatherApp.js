import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/04 Weather App React Assets/Assets/search.png";
import clear_icon from "../Assets/04 Weather App React Assets/Assets/clear.png";
import cloud_icon from "../Assets/04 Weather App React Assets/Assets/cloud.png";
import drizzle_icon from "../Assets/04 Weather App React Assets/Assets/drizzle.png";
import rain_icon from "../Assets/04 Weather App React Assets/Assets/rain.png";
import snow_icon from "../Assets/04 Weather App React Assets/Assets/snow.png";
import wind_icon from "../Assets/04 Weather App React Assets/Assets/wind.png";
import humidity_icon from "../Assets/04 Weather App React Assets/Assets/humidity.png";


export const WeatherApp = () => {
  const api_key = "aa4c98aa7f98fdc3a52e7cf0bff823f6";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    wind: "",
    temperature: "",
    location: "",
    icon: cloud_icon,
  });

  const iconMapping = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clear_icon,
    "02n": clear_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async () => {
    if (city === "") {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      setWeatherData({
        humidity: data.main.humidity + "%",
        wind: Math.floor(data.wind.speed) + "MPH",
        temperature: Math.floor(data.main.temp) + "°f",
        location: data.name,
        icon: iconMapping[data.weather[0].icon] || clear_icon,
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    search();
  }, [city]);

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div
          className="search-icon"
          onClick={search}
        >
          <img src={search_icon} alt="Searching Icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherData.icon} alt="weather icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
