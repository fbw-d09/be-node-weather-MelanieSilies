require('dotenv').config();
const axios = require('axios');

const city = process.argv[2];
const apiKey = process.env.API_KEY;
let colors = require('colors');

const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

axios.get(apiURL)
    .then(response => {
        const weatherData = response.data;
        console.log('Stadt:'.bgGreen, weatherData.location.name);
        console.log('aktuelle Temperatur:'.bgMagenta, weatherData.current.temp_c,'°C');
        console.log('aktuelle Temperatur:'.bgMagenta, weatherData.current.temp_f,'°F');
        console.log('Wetterbedingungen:'.bgCyan, weatherData.current.condition.text);
        console.log('')
        console.log('5 Tage Wetter:'.bgGreen);
        weatherData.forecast.forecastday.forEach(day => {
            console.log('Datum:'.bgWhite, day.date);
            console.log('Temperatur:', day.day.maxtemp_c, '°C');
            console.log('Temperatur:', day.day.maxtemp_f, '°F');
            console.log('Wetterbedingungen:', day.day.condition.text);
            console.log('---');
        });
    })
    .catch(error =>
        {
            console.log('Fehler beim Abrufen der Daten', error.message)
        })
