class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.dewpoint = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
    }

    paint(weather) {
        this.location.textContent = `${weather.name}`
        this.desc.textContent = `${weather.weather[0].description.replace(/\b\w/g, l => l.toUpperCase())}`
        this.string.textContent = `${weather.main.temp}° F`;
        this.icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`
        this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like}`
        this.dewpoint.textContent = `Min: ${weather.main.temp_min}° F, Max: ${weather.main.temp_max}° F`
        this.wind.textContent = `Wind Gusts: ${weather.wind.gust} mph`
    }
}