getQuote();
getWeather();

async function getWeather(){
    await $.ajax({
        url: '//api.openweathermap.org/data/2.5/weather?units=metric&lat=51.759445&lon=19.457216&appid=',
        dataType: 'json',
        success: function(apiResponse) {
          console.log(apiResponse)
          populateWeatherData(apiResponse);
        },
      });
}

async function getQuote(){
    await fetch("https://quotes.rest/qod?language=en").then(response => response.json())
    .then(response => { console.log(response);
      populateQuote(response);})
    .catch(error => console.log(error));
}

function populateWeatherData(jsonObject){
    const weatherCode = 113;
    // jsonObject.weather[0].id;

    const weatherDesc = jsonObject.weather[0].description;
    const currentTemperature = jsonObject.main.temp;
    const pressure = jsonObject.main.pressure;
    const windSpeed = jsonObject.wind.speed;

    checkWeatherCodeToSetWeather(weatherCode, weatherDesc);

    $("#temperature").html("Temperature: " + currentTemperature + "℃");
    $("#pressure").html("Pressure: " + pressure + " hpa");
    $("#wind").html("Wind speed: " + windSpeed + " km/h");
}

function checkWeatherCodeToSetWeather(weatherCode, weatherDesc){
  $('#weatherContainer__figureImg figcaption').text(weatherDesc);
    if(weatherCode == 113){
      $("#iconId").attr("src","imgs/sun.png");
    }
}
function calculateTemperature(){

}
function populateQuote(jsonObject){
  const quote = jsonObject.contents.quotes[0].quote;
  const author = jsonObject.contents.quotes[0].author;
  
  $('#quotesContainer__blockquote__text').html(quote);
  $('#quotesContainer__figure-blockquote figcaption').text("- " + author);
}