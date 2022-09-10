
var API_key = "76c9c8be1b8e842eb3df93dfb3b68250";
var lat, lon;
// let searchBtn = document.getElementById("search-btn");
let result_b = document.getElementById("result");
let cityRef = document.getElementById("city");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(howPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function howPosition(position) {
    //   x.innerHTML = "Latitude: " + position.coords.latitude +
    //   "<br>Longitude: " + position.coords.longitude;
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    console.log(lat);
    console.log(lon);
    let api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
    console.log(api_url);
    fetch(api_url)
        .then((resp) => resp.json())
        //If city name is valid
        .then((data) => {
            console.log(data);
            // console.log(data);
            console.log(data.weather[0].icon);
            console.log(data.weather[0].main);
            console.log(data.weather[0].description);
            console.log(data.name);
            console.log(data.main.temp_min);
            console.log(data.main.temp_max);
            console.log(data.sys.sunrise);
            console.log(data.name);
            var date1 = new Date(data.sys.sunrise * 1000);
            console.log(date1.toLocaleTimeString("default"));
            var date2 = new Date(data.sys.sunset * 1000);
            console.log(date2.toLocaleTimeString("default"));
            cityRef.value = data.name;
            var min_t=data.main.temp_min;
            var max_t=data.main.temp_max;
            if(min_t==max_t)
            {
                console.log("Same");
                min_t=min_t-2.37
                max_t=max_t+2.45;
                max_t=Math.round(100*max_t)/100;
                min_t=Math.round(min_t*100)/100;
            }
            result_b.innerHTML = `<h2>${data.name}</h2>
            <h4 class="weather">${data.weather[0].main}</h4>
            <h4 class="desc">${data.weather[0].description}</h4>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <h1>${data.main.temp} &#176;</h1>
            <div class="temp-container">
                <div>
                    <h4 class="title">min</h4>
                    <h4 class="temp">${min_t}&#176;</h4>
                </div>
                <div>
                    <h4 class="title">max</h4>
                    <h4 class="temp">${max_t}&#176;</h4>
                </div>
            </div>
            <div class="temp-container sr">
                <div>
                    <h4 class="title">Sunrise 🌅</h4>
                    <h4 class="temp">${date1.toLocaleTimeString("default")}</h4>
                </div>
                <div>
                    <h4 class="title">Sunset 🌇</h4>
                    <h4 class="temp">${date2.toLocaleTimeString("default")}</h4>
                </div>
            </div>
            `; 
        });
}
getLocation();
