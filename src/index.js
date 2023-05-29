function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Phoenix" />
      </div>
    </div>
  );
}

function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[props.date.getDay()];
  let hours = props.date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = props.date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (
  <span>
  {day} {hours}:{minutes}
    </span>
  );
}
function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
}

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "eac360db5fc86ft86450f3693e73o43f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <a
          href="https://www.shecodes.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logo.png" className="logo" alt="SheCodes Logo" />
        </a>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9 ">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3 p-0">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} city={weatherData.city}/>
        <footer>
          This project was coded by{" "}
      
        </footer>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
  function WeatherForecast(props) {
    const [loaded, setLoaded] = useState(false);
    const [forecast, setForecast] = useState(null);
  }
  
    useEffect(() => {
      setLoaded(false);
    }, [props.coordinates]);
  
    function handleForecastResponse(response) {
      setForecast(response.data.daily);
      setLoaded(true);
    }
  
    if (loaded) {
      return (
        <div className="WeatherForecast row">
          {forecast.map(function (day, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastPreview data={day} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    } else {
      let apiKey = "eac360db5fc86ft86450f3693e73o43f";
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(handleForecastResponse);
  
      return null;
    }
    function WeatherForecastPreview(props) {
      function day() {
        let date = new Date(props.data.time * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return days[day];
      }
    
      function maxTemperature() {
        let temperature = Math.round(props.data.temperature.maximum);
    
        return `${temperature}°`;
      }
    
      function minTemperature() {
        let temperature = Math.round(props.data.temperature.minimum);
    
        return `${temperature}°`;
      }
    
      return (
        <div className="WeatherForecastPreview">
          <div className="forecast-time">{day()}</div>
          <WeatherIcon code={props.data.condition.icon} size={38} />
          <div className="forecast-temperature">
            <span className="forecast-temperature-max">{maxTemperature()}</span>
            <span className="forecast-temperature-min">{minTemperature()}</span>
          </div>
        </div>
      );
      function WeatherIcon(props) {
        const codeMapping = {
          "clear-sky-day": "CLEAR_DAY",
          "clear-sky-night": "CLEAR_NIGHT",
          "few-clouds-day": "PARTLY_CLOUDY_DAY",
          "few-clouds-night": "PARTLY_CLOUDY_NIGHT",
          "scattered-clouds-day": "PARTLY_CLOUDY_DAY",
          "scattered-clouds-night": "PARTLY_CLOUDY_NIGHT",
          "broken-clouds-day": "CLOUDY",
          "broken-clouds-night": "CLOUDY",
          "shower-rain-day": "RAIN",
          "shower-rain-night": "RAIN",
          "rain-day": "RAIN",
          "rain-night": "RAIN",
          "thunderstorm-day": "RAIN",
          "thunderstorm-night'": "RAIN",
          "snow-day": "SNOW",
          "snow-night": "SNOW",
          "mist-day": "FOG",
          "mist-night": "FOG",
        };
    }
    function WeatherInfo(props) {
      return (
        <div className="WeatherInfo">
          <div className="row">
            <div className="col-6">
              <h1>{props.data.city}</h1>
              <ul>
                <li>
                  <FormattedDate date={props.data.date} />, {props.data.description}
                </li>
                <li>
                  Humidity: <strong>{props.data.humidity}%</strong>, Wind:{" "}
                  <strong>{props.data.wind}km/h</strong>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-8">
              <div className="temperature-container d-flex justify-content-end">
                <WeatherIcon code={props.data.icon} size={52} />
                <div>
                  <span className="temperature">
                    {Math.round(props.data.temperature)}
                  </span>
                  <span className="unit">°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    