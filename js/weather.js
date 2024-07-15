document.addEventListener('DOMContentLoaded', function () {
    const defaultCities = ['Tbilisi', 'Kutaisi', 'Batumi'];
    const defaultWeatherContainer = document.querySelector('#city-weather');
    const weatherResult = document.querySelector('#weather-result');
    const forecastResult = document.querySelector('#forecast-result');
    const defaultWeatherSection = document.querySelector('#default-weather');

    defaultCities.forEach(city => fetchDefaultWeather(city));

    document.querySelector('#weather-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const location = document.querySelector('#location').value;
        document.getElementById('showingWeather').innerText = 'Weather In ' + location;
        fetchWeather(location);
        fetchWeatherForecast(location);
    });

    function fetchDefaultWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c10f1d99353da28a2b5f54d8ec855617&units=metric`)
            .then(response => response.json())
            .then(data => {
                const cityWeatherDiv = document.createElement('div');
                cityWeatherDiv.className = 'weather-card';
                cityWeatherDiv.innerHTML = `<strong>${city}:</strong> ${data.main.temp} °C`;
                defaultWeatherContainer.appendChild(cityWeatherDiv);
            })
            .catch(err => console.error(`Error fetching weather for ${city}:`, err));
    }

    function fetchWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c10f1d99353da28a2b5f54d8ec855617&units=metric`)
            .then(response => response.json())
            .then(data => {
                weatherResult.style.display = 'block';
                defaultWeatherSection.style.display = 'none';
                weatherResult.innerHTML = `<div class="weather-card"><strong>Current Temperature:</strong> ${data.main.temp} °C</div>`;
            })
            .catch(err => console.error('Error fetching current weather:', err));
    }

    function fetchWeatherForecast(location) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=c10f1d99353da28a2b5f54d8ec855617&units=metric`)
            .then(response => response.json())
            .then(data => {
                forecastResult.style.display = 'block';
                forecastResult.innerHTML = `<h4>5-Day / 3-Hour Forecast:</h4>`;
                data.list.forEach((forecast, index) => {
                    if (index % 8 === 0) {
                        forecastResult.innerHTML += `<div class="weather-card"><p><strong>${forecast.dt_txt}:</strong> Temp: ${forecast.main.temp} °C</p></div>`;
                    }
                });
            })
            .catch(err => console.error('Error fetching weather forecast:', err));
    }
});
