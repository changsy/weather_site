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

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('desc').innerText = data.weather[0].description;
    
    const mainWeather = data.weather[0].main;
    updateIcon(mainWeather);
}

function updateIcon(weather) {
    const iconDiv = document.getElementById('icon');
    let iconHTML = "";

    switch (weather) {
        case "Clear":
            iconHTML = '<i class="fas fa-sun fa-5x"></i>';
            break;
        case "Clouds":
            iconHTML = '<i class="fas fa-cloud fa-5x"></i>';
            break;
        case "Rain":
        case "Drizzle":
            iconHTML = '<i class="fas fa-cloud-showers-heavy fa-5x"></i>';
            break;
        case "Snow":
            iconHTML = '<i class="fas fa-snowflake fa-5x"></i>';
            break;
        case "Thunderstorm":
            iconHTML = '<i class="fas fa-bolt fa-5x"></i>';
            break;
        default:
            iconHTML = '<i class="fas fa-cloud-sun fa-5x"></i>';
    }
    
    iconDiv.innerHTML = iconHTML;
}