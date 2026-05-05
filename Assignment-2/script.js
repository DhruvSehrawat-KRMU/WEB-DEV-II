// get elements
const searchBtn = document.querySelector("#searchBtn");
const cityInput = document.querySelector("#searchBox");
const historyDiv = document.querySelector("#historyList");

const city = document.querySelector("#cityValue");
const temp = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#windSpeed");
const pressure = document.querySelector("#pressure");
const rain = document.querySelector("#precipitation");

// get saved cities
let cities = JSON.parse(localStorage.getItem("cityNameList")) || [];

// show old history
cities.forEach(c => {
    addToHistory(c);
});

// search button click
searchBtn.addEventListener("click", () => {

    let cityName = cityInput.value.trim();

    if (!cityName) {
        alert("Enter city name");
        return;
    }

    cityName = cityName.toLowerCase();

    // avoid duplicates
    if (!cities.includes(cityName)) {
        cities.push(cityName);
        localStorage.setItem("cityNameList", JSON.stringify(cities));
        addToHistory(cityName);
    }

    getWeather(cityName);
    cityInput.value = "";
});

// add city to history UI
function addToHistory(name) {
    let item = document.createElement("div");
    item.className = "listItem";
    item.innerText = name;

    historyDiv.appendChild(item);

    item.addEventListener("click", () => {
        cityInput.value = name;
        getWeather(name);           
    });
}

// fetch weather data
function getWeather(cityName) {
    let url = `https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=${cityName}&aqi=no`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            city.innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1);
            temp.innerHTML = data.current.temp_c + " °C";
            humidity.innerHTML = data.current.humidity + "%";
            wind.innerHTML = data.current.wind_kph + " kph";
            pressure.innerHTML = data.current.pressure_mb + " mb";
            rain.innerHTML = data.current.precip_mm + " mm";

        })
        .catch(err => {
            console.log("Error:", err);
        });
}
