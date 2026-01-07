const apiKey = 'e9bf7dfe314e226e5b1bdd101faf6160';
const btn = document.getElementById('searchBtn');

btn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
    const cityInput = document.getElementById('cityInput');

    // This listens for the 'Enter' key press
    cityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const city = cityInput.value;
            fetchWeather(city);
        }
    });
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('desc').innerText = data.weather[0].description;
        
        // Icon Logic
        const mainWeather = data.weather[0].main; // e.g., "Clouds", "Rain", "Clear"
        updateIcon(mainWeather);

    } catch (error) {
        alert("City not found!");
    }
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