import React, { useState, useEffect } from 'react'

const WeatherPage = ({location, weather, date}) => {
    const [showFirst, setShowFirst] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
          setShowFirst(prev => !prev);
        }, 7000);
        return () => clearInterval(interval);
      }, []);

    const returnWeekDay = (num) => {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        if(num > 6) {
            return days[num - 7]
        }
        else {
            return days[num]
        }
    }
    const setDirection = (direction) => {
        let degree = (direction/22.5).toFixed(0) % 16;
        const directions = [
            "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
        ];
        return directions[degree];
    }
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <>
        <div className="today">
            <div className="section-1">
                <div className="date">
                    <h3 className="dayofweek">{returnWeekDay(date.getDay())}</h3>
                    <h5 className="dayofmonth">{months[date.getMonth()]} {date.getDate()}</h5>
                </div>        
                <h1 className="clock">
                    {date.getHours() % 12 === 0 ? 12 : date.getHours() % 12 < 10 ? '0' + date.getHours() % 12 : date.getHours() % 12}
                    <span className="colon">:</span>
                    {date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
                    <span className='pmam'>{date.getHours() > 12 ? "PM" : "AM"}</span>
                    </h1>
                <div className="location">
                    <h3 className="country">{location.state} {location.country_code.toUpperCase()}</h3>
                    <h5 className="city">{location.town}</h5>
                </div>
            </div>
            <div className="section-2"> 
                {
                    showFirst ? 
                    <img src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}.png`} alt="" className="todayImg"/>
                    :
                    <div className="hourly"> 
                    {[1,2,3,4,5,6].map((i) => (
                        <div className="hours" key={i}>
                            <span className="hour">{weather[i].dt_txt.slice(11,13)}{weather[i].dt_txt.slice(11,13) < 12 ? "am" : "pm"}</span>
                            <img src={`https://openweathermap.org/img/wn/${weather[i].weather[0].icon}.png`} className='hourImg'/>
                            <span className='hourDeg'>{Math.floor(weather[i].main.temp) - 273}°</span>
                        </div>
                    ))}
                    </div>
                }
            </div>

            <div className="section-3">
                <div className="rain-humidity">
                    <div className="rain"><i className="uil uil-cloud-showers-alt"></i><span className='rainPerc'>{weather[0].pop}%</span></div>
                    <div className="humidity"><i className="uil uil-raindrops-alt"></i><span className="humidityPerc">{weather[0].main.humidity}%</span></div>
                </div>
                <div className="currentDeg">
                    <p className='current'>{Math.floor(weather[0].main.temp) -273}°</p>
                </div>
                <div className="wind">
                    <div className="windSpeed"><span className="speedValue">{(weather[0].wind.speed * 2.237).toFixed(1)}</span><span className="speedUnit">mph</span></div>
                    <div className="windDir"><span className="direction">{setDirection(weather[0].wind.deg)}</span> <i className="uil uil-wind"></i></div>
                </div>
            </div>
        </div>
        <div className="other_days">
            {
                [1,2,3,4,5].map((item) => (
                    <div className="dayBoxes" key={item}>
                        <h3>{returnWeekDay(date.getDay() + item)}</h3>
                        <img src={`https://openweathermap.org/img/wn/${weather[item * 8 - 1].weather[0].icon}.png`} alt=""/>
                        <h3>{Math.floor(weather[item * 8 - 1].main.temp) -273}°</h3>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default WeatherPage
