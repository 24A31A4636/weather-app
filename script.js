const apiKey = "8b3e52ffcd1aaf784cc630647965b06f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404) {
        alert("Invalid City Name");
        return;
    }

    var data = await response.json();

    // Updating Text Content
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Changing "Mood" Backgrounds & Icons
    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
        document.body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    } 
    else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
        document.body.style.background = "linear-gradient(135deg, #f7b733, #fc4a1a)";
    }
    else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
        document.body.style.background = "linear-gradient(135deg, #00c6fb, #005bea)";
    }
    else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
        document.body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
    }
    else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
        document.body.style.background = "linear-gradient(135deg, #606c88, #3f4c6b)";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Allow "Enter" key to search
searchBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});