const apiKey = 'e9bf7dfe314e226e5b1bdd101faf6160';
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents page reload
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

const locationBtn = document.getElementById('locationBtn');

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        // Show a "Loading..." state if you like
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by your browser");
    }
});

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherByCoords(lat, lon);
}

function error() {
    alert("Unable to retrieve your location. Please check your browser permissions.");
}

// New function to fetch weather using Latitude and Longitude
async function fetchWeatherByCoords(lat, lon) {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok) throw new Error("Location data not found");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (err) {
        alert(err.message);
    }
}

async function fetchWeather(city) {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok) throw new Error("City not found");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

function displayCurrentWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('desc').innerText = data.weather[0].description;
    document.getElementById('icon').innerHTML = getIcon(data.weather[0].main, "fa-5x");
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ""; 

    // Filter to get one forecast per day (checking for midday)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <p>${dayName}</p>
            ${getIcon(day.weather[0].main, "fa-lg")}
            <p><strong>${Math.round(day.main.temp)}°</strong></p>
        `;
        forecastDiv.appendChild(card);
    });
}

function getIcon(condition, sizeClass) {
    switch (condition) {
        case "Clear": return `<i class="fas fa-sun ${sizeClass}"></i>`;
        case "Clouds": return `<i class="fas fa-cloud ${sizeClass}"></i>`;
        case "Rain": 
        case "Drizzle": return `<i class="fas fa-cloud-showers-heavy ${sizeClass}"></i>`;
        case "Snow": return `<i class="fas fa-snowflake ${sizeClass}"></i>`;
        case "Thunderstorm": return `<i class="fas fa-bolt ${sizeClass}"></i>`;
        default: return `<i class="fas fa-cloud-sun ${sizeClass}"></i>`;
    }
}