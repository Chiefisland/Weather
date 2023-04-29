const cityInput = document.getElementById("input-bar");
const submitButton = document.getElementById("button");
const city = document.getElementById("city");
const temperatureSection = document.getElementById("temperature");
const weatherIcon = document.getElementById("icon")
const weatherDescription = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind")
const timeZone = document.getElementById("timezone")

let apiRequest = new XMLHttpRequest();
submitButton.addEventListener('click', ($event) => {
    $event.preventDefault();
    const chosenCity = cityInput.value;
    apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
    apiRequest.send();
});

cityInput.addEventListener('keyup', ($event) => {
    $event.preventDefault();
    if ($event.key === 'Enter'){
        const chosenCity = cityInput.value;
        apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
        apiRequest.send();
    }
})

apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        if (apiRequest.status === 404) {
            return temperatureSection.textContent = 'City not found'
        }
        const response = JSON.parse(apiRequest.response);
        let timeName = ""
        switch (response.timezone) {
            case -43200:
                timeName = 'International Date Line West';
                break;
            case -39600:
                timeName = 'Samoa Standard Time';
                break;
            case -36000:
                timeName = 'Hawaiian Standard Time';
                break;
            case -32400:
                timeName = 'Alaska Standard Time';
                break;
            case -28800:
                timeName = 'Pacific Standard Time';
                break;
            case -25200:
                timeName = 'Mountain Standard Time';
                break;
            case -21600:
                timeName = 'Central Standard Time';
                break;
            case -18000:
                timeName = 'Eastern Standard Time';
                break;
            case -14400:
                timeName = 'Atlantic Standard Time';
                break;
            case -12600:
                timeName = 'Newfoundland Standard Time';
                break;
            case -10800:
                timeName = 'Argentina Time';
                break;
            case -7200:
                timeName = 'Brasilia Time';
                break;
            case -3600:
                timeName = 'Fernando de Noronha Time';
                break;
            case 0:
                timeName = 'Greenwich Mean Time';
                break;
            case 3600:
                timeName = 'Central European Time';
                break;
            case 7200:
                timeName = 'Eastern European Time';
                break;
            case 10800:
                timeName = 'Moscow Standard Time';
                break;
            case 12600:
                timeName = 'Iran Standard Time';
                break;
            case 14400:
                timeName = 'Gulf Standard Time';
                break;
            case 16200:
                timeName = 'Armenia Time';
                break;
            case 18000:
                timeName = 'Pakistan Standard Time';
                break;
            case 19800:
                timeName = 'India Standard Time';
                break;
            case 20700:
                timeName = 'Nepal Time';
                break;
            case 21600:
                timeName = 'Bangladesh Standard Time';
                break;
            case 23400:
                timeName = 'Myanmar Time';
                break;
            case 25200:
                timeName = 'Indochina Time';
                break;
            case 28800:
                timeName = 'China Standard Time';
                break;
            case 31500:
                timeName = 'Australia Central Western Standard Time';
                break;
            case 34200:
                timeName = 'Japan Standard Time';
                break;
            case 36000:
                timeName = 'Australia Central Standard Time';
                break;
            case 37800:
                timeName = 'Lord Howe Island';
                break;
            case 39600:
                timeName = 'Australia Eastern Standard Time';
                break;
            case 43200:
                timeName = 'New Zealand Standard Time';
                break;
            case 46800:
                timeName = 'Chatham Standard Time';
                break;
            default:
                timeName = 'Unknown Timezone';
        } 
        city.textContent = 'Weather in: ' + response.name
        temperatureSection.textContent = (response.main.temp-273.15).toFixed(0) + ' °C ';
        weatherDescription.textContent = response.weather[0].description
        humidity.textContent = 'Humidity: ' + response.main.humidity + '%'
        windSpeed.textContent = 'Wind speed: ' + response.wind.speed + ' km/h'
        var iconCode = response.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; 
        console.log(iconUrl);
        weatherIcon.setAttribute('src', iconUrl);
        timeZone.textContent = 'Timezone: ' + timeName
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + response.name + "')"  
    }
}