/* "use client";

import { useState, useEffect } from "react";
import "./Weather.css";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setTimeout(() => {
          setWeather({
            temperature: 22,
            condition: "soleado",
            city: "Tucuman",
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "soleado":
        return "☀️";
      case "nublado":
        return "☁️";
      case "lluvioso":
        return "🌧️";
      default:
        return "☀️";
    }
  };

  if (loading) {
    return (
      <div className="weather-bar loading">
        <div className="container">
          <div className="weather-content">
            <div className="spinner"></div>
            <span>Cargando información del clima...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-bar">
      <div className="container">
        <div className="weather-content">
          <span className="weather-icon">
            {getWeatherIcon(weather.condition)}
          </span>
          <span className="weather-text">
            {weather.city}: {weather.temperature}°C - {weather.condition}
          </span>
        </div>
      </div>
    </div>
  );
}
 */

"use client";

import { useState, useEffect } from "react";
import "./Weather.css";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "2ffd7d4fea35c32c2ef99bb3b8a040e0";
    

  useEffect(() => {
   const fetchWeather = async () => {
     try {
       const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=San Miguel de Tucumán,AR&appid=${apiKey}&units=metric&lang=es`
       );
       const data = await response.json();
       console.log("Datos del clima:", data); // 👈 Verificar en consola

       if (data.cod === 200) {
         setWeather({
           temperature: Math.round(data.main.temp),
           condition: data.weather[0].description,
           city: data.name,
         });
       } else {
         console.error("Error API Clima:", data.message);
         setWeather(null);
       }
     } catch (error) {
       console.error("Error fetching weather:", error);
       setWeather(null);
     } finally {
       setLoading(false);
     }
   };


    fetchWeather();
  }, []);

const getWeatherIcon = (condition) => {
  const cond = condition.toLowerCase();
  const esNoche = cond.includes("noche") || cond.includes("nocturno");

  const tieneSol = cond.includes("sol") || cond.includes("despejado");
  const tieneNubes =
    cond.includes("nublado") ||
    cond.includes("nuboso") ||
    cond.includes("nubes");

  if (tieneSol && tieneNubes) {
    return esNoche ? "🌙☁️" : "🌤️☁️"; // parcialmente nublado
  }

  if (tieneSol) return esNoche ? "🌙" : "☀️";

  if (tieneNubes) return esNoche ? "☁️🌙" : "☁️";

  if (
    cond.includes("lluvia") ||
    cond.includes("lluvioso") ||
    cond.includes("llovizna")
  ) {
    return esNoche ? "🌧️🌙" : "🌧️";
  }

  if (cond.includes("nieve")) {
    return esNoche ? "❄️🌙" : "❄️";
  }

  if (cond.includes("tormenta")) {
    return esNoche ? "⛈️🌙" : "⛈️";
  }

  // Agregado para niebla/neblina
  if (cond.includes("niebla") || cond.includes("neblina")) {
    return esNoche ? "🌫️🌙" : "🌫️";
  }

  return esNoche ? "🌙⛅" : "🌤️";
};
  


  if (loading) {
    return (
      <div className="weather-bar loading">
        <div className="container">
          <div className="weather-content">
            <div className="spinner"></div>
            <span>Cargando información del clima...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-bar">
      <div className="container">
        <div className="weather-content">
          <span className="weather-icon">
            {getWeatherIcon(weather.condition)}
          </span>
          <span className="weather-text">
            {weather.city}: {weather.temperature}°C - {weather.condition}
          </span>
        </div>
      </div>
    </div>
  );
}
