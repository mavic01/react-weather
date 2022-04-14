import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation("");
    }
  };
  // searchLocation()
  return (
    <div className="app">
      <div className="title"><h2><span style={{color: "#b8f2e6"}}>mavic</span> Weather App</h2></div>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            {data.sys && <p>{data.sys.country}</p>}
          </div>
          <div className="temp">{data.main && <h2>{data.main.temp}°C</h2>}</div>
          <div className="description">
            {/* {data.weather && <p>{data.weather[0].main}</p>} */}
            {data.weather && <p>{data.weather[0].description}</p>}
          </div>

          {data.name !== undefined && 
           <div className="bottom">
           <div className="feels">
             {data.main && <p className="bold">{data.main.feels_like}°C</p>}
             <p>Feels Like</p>
           </div>
           <div className="humidity">
             {data.main && <p className="bold">{data.main.humidity}%</p>}
             <p>Humidity</p>
           </div>
           <div className="wind">
             {data.wind && <p className="bold">{data.wind.speed}m/s</p>}
             <p>Wind Speed</p>
           </div>
           <div className="wind">
             {data.wind && <p className="bold">{data.wind.deg}°</p>}
             <p>Wind Direction</p>
           </div>
         </div>
          }

          
        </div>
      </div>
    </div>
  );
}

export default App;
