import React from 'react';
import axios from 'axios';
import { options, error } from '../../js/functions.mjs';
import { useState, useEffect } from 'react';
import './Card.css';

const Card = () => {
    const key = "f5c51686bf9b67fbaa05482bffad8ac4"
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [data, setData] = useState("");
    const [units, setUnits] = useState(true);

    const convert = () => {
        setUnits(!units)
    }

    //  http://api.openweathermap.org/geo/1.0/reverse?lat={latitude}&lon={longitude}&limit={limit}&appid={key}
    // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units ? 'metric' : 'imperial'}&lang=es`
    // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={key}
    useEffect( () =>{
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units? 'metric':'imperial'}&lang=es`)
            .then(res => setData(res.data))
            .catch(error => console.log(error));
    },[])

    if (!data) return null;

    const success = (pos) => {
        const crd = pos.coords;
        setLatitude(crd.latitude);
        setLongitude(crd.longitude);
    }


    navigator.geolocation.getCurrentPosition(success, error, options);

    // console.log(data);
    // console.log(data.name);
    return (
        <div className='card'>
            <h1>{data.name},{data.sys?.country}</h1>
            <h2>{data.weather?.[0].description}</h2>
            <ul>
                <li><i className="fa-solid fa-temperature-three-quarters"></i> {data.main?.temp} {units ? '°C' : '°F'}</li>
                <li>min {data.main?.temp_min} {units ? '°C' : '°F'}</li>
                <li>max {data.main?.temp_max} {units ? '°C' : '°F'}</li>
                <li>Sensacion: {data.main?.feels_like} {units ? '°C' : '°F'}</li>
                <li><i className="fa-solid fa-water"></i> {data.main?.sea_level}</li>
                <li><i className="fa-solid fa-droplet"></i> {data.main?.humidity}%</li>
                <li>Presion: {data.main?.pressure}hPa</li>
            </ul>
            <button onClick={convert}>Change</button>
        </div>
    );
};

export default Card;