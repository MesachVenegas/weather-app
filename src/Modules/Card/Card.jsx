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

    // Obtengo la ubicación del usuario.
    const success = async (pos) => {
        const crd = await pos.coords
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}&units=${units ? 'metric' : 'imperial'}&lang=es`)
            .then(res => setData(res.data))
            .catch(error => console.log(error));
    }

    useEffect( () =>{
        navigator.geolocation.getCurrentPosition(success, error, options);
    },[])

    const convert = () => {
        setUnits(!units)
        navigator.geolocation.getCurrentPosition(success, error, options);
    };

    console.log(data);

    const loadPanel = () => {
        if (!data){
            return (
                <h1>Loading ...</h1>
            )
        }else{
            return(
                <>
                    <div className="weather__img">
                        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
                        <h2 className='city__status'>{data.weather?.[0].description}</h2>
                    </div>
                    <div className="weather__head">
                        <h1 className='city'>{data.name}, {data.sys?.country}</h1>
                    </div>
                    <div className='weather__data'>
                        <p><i className="fa-solid fa-temperature-three-quarters"></i> {data.main?.temp} {units ? '°C' : '°F'}</p>
                        <p>min {data.main?.temp_min} {units ? '°C' : '°F'}</p>
                        <p>max {data.main?.temp_max} {units ? '°C' : '°F'}</p>
                        <p>Sensacion: {data.main?.feels_like} {units ? '°C' : '°F'}</p>
                        <p><i className="fa-solid fa-droplet"></i> {data.main?.humidity}%</p>
                        <p>Presion: {data.main?.pressure}hPa</p>
                    </div>
                    <button onClick={convert}>Change</button>
                </>
            )
        }
    }

    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = "cover";

    // console.log(data);
    // console.log(data.name);
    return (
        <div className='card'>
            {loadPanel()}
        </div>
    );
};

export default Card;