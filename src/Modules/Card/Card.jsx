import React from 'react';
import axios from 'axios';
import { options, error } from '../../js/functions.mjs';
import { useState, useEffect } from 'react';
import './Card.css';

const Card = () => {
    const key = "f5c51686bf9b67fbaa05482bffad8ac4"
    const [data, setData] = useState("");
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

    const loadPanel = () => {
        if (!data){
            return (
                <h1>Loading ...</h1>
            )
        }else{
            return(
                <>
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
                </>
            )
        }
    }

    document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1599209248411-5124adbb1da2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)';
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