let searchBtn = document.getElementById("search-btn");
let cityRef1 = document.getElementById("city");
let result = document.getElementById("result");
let getWeather = () => {
  let cityValue = cityRef1.value;
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    // let f="dfhdff"
    // console.log(cityValue);
    var api_s = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_key}&units=metric`;
    console.log(api_s);

    cityRef.value = "";
    fetch(api_s)
      .then((resp2) => resp2.json())
      //If city name is valid
      .then((data2) => {
        console.log(data2);
        console.log(data2.weather[0].icon);
        console.log(data2.weather[0].main);
        console.log(data2.weather[0].description);
        console.log(data2.name);
        console.log(data2.main.temp_min);
        console.log(data2.main.temp_max);

        var min_t2=data2.main.temp_min;
            var max_t2=data2.main.temp_max;
            if(min_t2==max_t2)
            {
                console.log("Same");
                min_t2=min_t2-2.37
                max_t2=max_t2+2.45;
                max_t2=Math.round(100*max_t2)/100;
                min_t2=Math.round(min_t2*100)/100;
            }

        var date3 = new Date(data2.sys.sunrise * 1000);
        console.log(date3.toLocaleTimeString("default"));
        var date4 = new Date(data2.sys.sunset * 1000);
        console.log(date4.toLocaleTimeString("default"));

        result.innerHTML = `
        <h2>${data2.name}</h2>
        <h4 class="weather">${data2.weather[0].main}</h4>
        <h4 class="desc">${data2.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data2.weather[0].icon}.png">
        <h1>${data2.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${min_t2}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${max_t2}&#176;</h4>
            </div>
        </div>
        <div class="temp-container">
        <div>
            <h4 class="title">Sunrise</h4>
            <h4 class="temp">${date3.toLocaleTimeString("default")}</h4>
        </div>
        <div>
            <h4 class="title">Sunset</h4>
            <h4 class="temp">${date4.toLocaleTimeString("default")}</h4>
        </div>
    </div>
        `;

      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
