document.addEventListener("DOMContentLoaded",() => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "82cb967c12cc25e47762f54e1d1fbd51"; //env variable

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city){
            showError("Please enter a city name.")
            return; 
        }

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error){
            showError(error.message || "An error occurred while fetching weather data.");
        }

    });

    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the city name and try again.");
            } else {
                throw new Error("An error occurred while fetching weather data.");
            }
        }

        return await response.json();
    } 

    function displayWeatherData(data){
        const{ name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        
        //Show weather info and hide error message
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");
    }

    function showError(message){ 
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }

})