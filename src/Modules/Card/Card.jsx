import React from 'react';
import axios from 'axios';
import { options, error, backgrounds } from '../../js/functions.mjs';
import { useState, useEffect } from 'react';
import './Card.css';

const Card = () => {
    const key = "f5c51686bf9b67fbaa05482bffad8ac4"
    const [data, setData] = useState("");
    const [backgroundImage, setBackgroundImage] = useState(backgrounds.default)
    const [units, setUnits] = useState(true);
    const [current, setCurrent] = useState(0)

    // Obtengo la ubicación del usuario.
    const success = async (pos) => {
        const crd = await pos.coords
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}&lang=es`)
            .then( res => setData(res.data) )
            .catch( error => console.log(error) );
    }

    // console.log(backgroundImage);
    useEffect( () =>{
        navigator.geolocation.getCurrentPosition(success, error, options);
        console.log(current.toFixed(0));
        setCurrent(data.main?.temp - 273.15)
    },[])


    const convert = () => {
        setUnits(!units)
        let Fahrenheit = ((data.main?.temp - 273.15) * 9 / 5 + 32).toFixed(0)
        let Celsius = (data.main?.temp - 273.15).toFixed(0)

        if(units){
            console.log(data.main);
            setCurrent(Celsius)
        }else{
            setCurrent(Fahrenheit)
        }
    };

    const loadPanel = () => {
        if (!data){
            return (
                <>
                    <div className="loader__container">
                        <span className="loader"></span>
                    </div>
                </>
                )
        }else{
            return(
                <>
                    <div className="weather__img">
                        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
                        <h2 className='city__status'>{data.weather?.[0].description}</h2>
                        <p className="weather__current">{current} {units ? '°F' : '°C'}</p>
                    </div>
                    <div className="weather__head">
                        <h1 className='city'>{data.name}, {data.sys?.country}</h1>
                    </div>
                    <div className="data__temp">
                        <button className="temp__units" onClick={convert}>
                            <i className="fa-solid fa-rotate"></i> {units ? 'Fahrenheit' : 'Celsius'}
                        </button>
                        <p>Min/Max: {data.main?.temp_min} / {data.main?.temp_max}</p>
                        <p>Sensacion: {data.main?.feels_like}</p>
                    </div>
                    <div className="temp__atmosphere">
                        <p>Humedad: {data.main?.humidity}%</p>
                        <p>Presion: {data.main?.pressure}hPa</p>
                    </div>
                </>
            )
        }
    }

    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = "cover";

    return (
        <div className='card'>
            {loadPanel()}
        </div>
    );
};

export default Card;