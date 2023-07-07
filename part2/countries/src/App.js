import { useState, useEffect } from "react";
import axios from "axios";

const FindCountries = ({ newSearch, handleNewSearch }) => {
  return (
    <div>
      find countries <input value={newSearch} onChange={handleNewSearch}/>
    </div>
  );
}

const Countries = ({ countries, newSearch }) => {

  const [countryOpen, setCountryOpen] = useState({});

  const toggleCountryInfo = (countryKey) => {
    setCountryOpen((prevState) => ({
      ...prevState,
      [countryKey]: !prevState[countryKey]
    }));
  };

  const filteredCountries= countries
        .filter((country) =>
          country.name.common.toLowerCase().includes(newSearch.toLowerCase())
        )
        .map((country) => country)

  if (newSearch === ''){
    return <div>Search for countries!!!</div>
  }

  if (filteredCountries.length === 1){
    const country = filteredCountries[0];
    return (
      <CountryInfo country={country}/>
    );
  } else if (filteredCountries.length <= 10){
    return (
      <div>
        {filteredCountries.map((country) => 
        <div key={country.altSpellings[0]}>
          {country.name.common} 
          <button onClick={()=>toggleCountryInfo(country.altSpellings[0])}>
            {!countryOpen[country.altSpellings[0]] ? "show": "close"}
          </button>
          {countryOpen[country.altSpellings[0]] ? <CountryInfo country={country}/> : <></>}
        </div>)}
      </div>
    );
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  );
}

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY.trim()}&query=${encodeURIComponent(
    country.capital[0]
  )}`;

  const fetchData = () => {
    axios.get(url).then((response) => {
      setWeather(response.data);
      setIsLoading(false);
    });
  };

  useEffect(fetchData, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      {isLoading ? (
        <p>Loading weather information...</p>
      ) : (
        <>
          <p>
            <b>Temperature: </b>
            {weather.current.temperature} Celsius
          </p>
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
          />
          <p>
            <b>Wind: </b>
            {weather.current.wind_speed} mph direction {weather.current.wind_dir}
          </p>
        </>
      )}
    </div>
  );
};


function App() {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const hook = () =>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook,[]);

  return (
    <div className="App">
      <FindCountries newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <Countries countries={countries} newSearch={newSearch}/>
    </div>
  );
}

export default App;
