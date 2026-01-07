const apiKey = 'YOUR_API_KEY_HERE';
const btn = document.getElementById('searchBtn');

btn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
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
    } catch (error) {
        alert("City not found!");
    }
}