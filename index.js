let sunrise;
let sunset;
let dateTime;

getQuote();
getWeather();

async function getWeather(){
    await $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&lat=51.759445&lon=19.457216&appid=',
        dataType: 'json',
        success: function(apiResponse) {
          console.log(apiResponse)
          populateWeatherData(apiResponse);
        },
      });
}

async function getQuote(){
    await fetch("https://quotes.rest/qod?language=en").then(response => response.json())
    .then(response => { 
      // console.log(response);
      populateQuote(response);})
    .catch(error => console.log(error));
}

function populateWeatherData(jsonObject){
    const weatherCode = jsonObject.weather[0].id;
    sunrise = jsonObject.sys.sunrise;
    sunset = jsonObject.sys.sunset;
    dateTime = jsonObject.dt;

    const weatherDesc = jsonObject.weather[0].description;
    const currentTemperature = jsonObject.main.temp;
    const pressure = jsonObject.main.pressure;
    const windSpeed = jsonObject.wind.speed;

    checkDataToSetPics(weatherCode);

    $('#weatherContainer__figureImg__figcaption').html(weatherDesc).css("text-transform","capitalize");
    $("#temperature").html("Temperature: " + currentTemperature + "℃");
    $("#pressure").html("Pressure: " + pressure + " hpa");
    $("#wind").html("Wind speed: " + windSpeed + " km/h");
}

function checkDataToSetPics(weatherCode){
    if(weatherCode == 800 && !isNightOrDay()) {
      $("#iconId").attr("src","imgs/clearSkyNight.png");
      return;
    }
    if(weatherCode == 801 && !isNightOrDay()) {
      $("#iconId").attr("src","imgs/fewCloudsNight.png");
      return;
    }

    if(weatherCode == 800) $("#iconId").attr("src","imgs/clearSky.png");

    if(weatherCode == 801) $("#iconId").attr("src","imgs/fewClouds.png");
    if(weatherCode >= 802 && weatherCode <= 803) $("#iconId").attr("src","imgs/scatteredClouds.png")
    if(weatherCode == 804) $("#iconId").attr("src","imgs/brokenClouds.png");

    if(weatherCode >= 701 && weatherCode <= 781) $("#iconId").attr("src","imgs/mist.png");

    if(weatherCode >= 600 && weatherCode <= 622) $("#iconId").attr("src","imgs/snow.png");

    if(weatherCode >= 300 && weatherCode <= 501 ) $("#iconId").attr("src","imgs/rain.png");
    if(weatherCode >= 502 && weatherCode <= 531) $("#iconId").attr("src","imgs/showerRain.png");
    
    if(weatherCode >= 200 && weatherCode <= 232) $("#iconId").attr("src","imgs/thunderstorm.png");
}

function populateQuote(jsonObject){
  const quote = jsonObject.contents.quotes[0].quote;
  const author = jsonObject.contents.quotes[0].author;
  
  $('#quotesContainer__blockquote__text').html(quote);
  $('#quotesContainer__figure-blockquote figcaption').html("- " + author);
}

function isNightOrDay(){
  // true = day, false = night
  var dayOrNight = dateTime < sunrise ? false : true;
  return dayOrNight;
}