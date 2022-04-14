import React, { useState } from "react";
import "../App.css";

const Main = () => {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [firstDayIcon, setFirstDayIcon] = useState("");
  const [averageTemp, setAverageTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [infoAreaDisplayStyle, setInfoAreaDisplayStyle] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [dailyWeather, setDailyWeather] = useState([]);
  // For day text
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  // API configuration
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      "X-RapidAPI-Key": "8bae050daemsh7be5cdc8f96d391p15cd4bjsndca62a995cfe",
    },
  };
  // Get forecast from weather API
  const getWeatherForecast = () => {
    fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${inputValue}&days=3`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // Is input value  correct check
        if (response.error) {
          setErrorMessage("Incorrect City or Country Name");
          setInfoAreaDisplayStyle("none");
        } else {
          // If correct

          // Weather current forecast
          setCity(response.location.name); //get location name
          setMaxTemp(response.forecast.forecastday[0].day.maxtemp_c); // get maximum temp  C°
          setAverageTemp(response.forecast.forecastday[0].day.avgtemp_c); // get average temp  C°
          setMinTemp(response.forecast.forecastday[0].day.mintemp_c); // get minumum temp  C°
          setFirstDayIcon(response.current.condition.icon);
          // get current weather icon

          setInfoAreaDisplayStyle(""); // info area show

          setCurrentTemp(response.current.temp_c); // get current temp  C°
          setDailyWeather(response.forecast.forecastday); //get three days forecast
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-container">
      <div className="search-area">
        <input
          type="search"
          id="searchInput"
          placeholder="Enter City Or Country Name"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button id="searchButton" onClick={getWeatherForecast}>
          Search
        </button>
      </div>
      <div>
        <header> {city} </header>
      </div>
      <div className="error-message">
        <strong>{errorMessage}</strong>
      </div>
      <div className="info-area" style={{ display: infoAreaDisplayStyle }}>
        <div>
          <img src={firstDayIcon} alt="" />
        </div>

        <div>{currentTemp} C°</div>
        <div> Average Temperature : {averageTemp} C°</div>
        <div> Max. Temperature : {maxTemp} C°</div>
        <div> Min. Temperature : {minTemp} C°</div>
        <hr></hr>
        <div>
          {dailyWeather.map((daily, index) => {
            return (
              <div className="daily-item row" key={index}>
                <div className="col-4">
                  <img
                    src={daily.day.condition.icon}
                    alt=""
                    style={{ width: 64, height: 64 }}
                  />
                </div>
                <div className="col-4 info-text">
                  {/* Get day text by current day index */}
                  <b>{days[new Date(daily.date).getDay()]}</b>
                </div>
                <div className="col-4 info-text">
                  <b>{daily.day.avgtemp_c} C°</b>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
