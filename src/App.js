import './App.css';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import FirstPage from './FirstPage';
import WeatherPage from './WeatherPage';
import ErrorPage from './ErrorPage';
import Bio from './Bio';

function App() {

  const [status, setStatus] = useState(0);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(new Date())

  useEffect(()=>{
    const hour = date.getHours();
    let str = "";
    if (hour >= 0 && hour < 6) {
      str = "night";
    } else if (hour >= 6 && hour < 12) {
      str = "morning";
    } else if (hour >= 12 && hour < 18) {
      str = "afternoon";
    } else {
      str = "evening";
    }
    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/YunusDogru/WeatherApp-React/main/public/img/${str}${Math.random < 0.5 ? 1 : 2}.jpg)`;
    console.log(`https://raw.githubusercontent.com/YunusDogru/WeatherApp-React/main/public/img/${str}${Math.random < 0.5 ? 1 : 2}.jpg`);
  }, [])

  useEffect(()=>{
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
    else {
      setStatus(2);
  }
  },[]);

  const onSuccess = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8e393450d5e241e1a76c05ed77bd6152`;
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=bc821cb969d7c778df30a0d748bf43f9`;

    axios.all([axios.get(url), axios.get(url2)])
    .then(axios.spread((...responses) => {
      setLocation(responses[0].data.results[0].components);
      setWeather(responses[1].data.list);
      setStatus(1);
    }))
    .catch(error => console.log(error, "error"));
  }
  const onError = () => {
    setStatus(2);
  }
  setInterval(()=>{setDate(new Date())},1000)
  return (
    <>
      <Bio/>
      {(() => {
        switch (status) {
          case 0:
            return <FirstPage />;
          case 1:
            return <WeatherPage location={location} weather={weather} date={date}/>;
          case 2:
            return <ErrorPage/>;
          default:
            return null;
        }
      })()}
    </>
  );
}
export default App;
