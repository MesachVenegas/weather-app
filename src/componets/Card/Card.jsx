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

    // Obtengo la ubicación del usuario.
    const success = (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);

    // Convierte las unidades de medida de Celsius a Fahrenheit y viseversa.
    // Realiza la solicitud al API y Settea el valor de 'data' con la respuesta obtenida.
    useEffect( () =>{
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units? 'metric':'imperial'}&lang=es`)
        .then(res => setData(res.data))
        // .catch(error => console.log(error));
    },[])

    const convert = () => {
        let tempToFahrenheit = (data.main?.temp) + 32;
        let tempToCelsius = (data.main?.temp) + 32;
        setUnits(!units)
    };

    if (!data){
        console.log('No se pudo obtener la información');
    }else{
        console.log('Loading...');
    }


    // console.log(data);
    // console.log(data.name);
    return (
        <div className='card'>
            <div className="weather__head">
                <h1 className='city'>{data.name}, {data.sys?.country}</h1>
                <h2 className='city__status'>{data.weather?.[0].description}</h2>
            </div>
            <ul className='weather__data'>
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