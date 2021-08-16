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
          populateWeatherData(apiResponse);
        },
      });
}

async function getQuote(){
    await fetch("https://quotes.rest/qod?language=en").then(response => response.json())
    .then(response => { 
      populateQuote(response);})
    .catch(error => console.log(error));
}

function populateWeatherData(jsonObject){
    const weatherCode = jsonObject.weather[0].id;;

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
      $("#mainContainer").css("backgroundImage","url(./imgs/bgClearSkyNight.jpeg");
      $("#mainContainer").css("color","rgba(192,191,186,1)");
      return;
    }
    if(weatherCode == 801 && !isNightOrDay()) {
      $("#iconId").attr("src","imgs/fewCloudsNight.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgFewCloudsNight.jpeg");
      $("#mainContainer").css("color","rgba(192,191,186,0.8)");
      return;
    }

    if(weatherCode == 800){
       $("#iconId").attr("src","imgs/clearSky.png");
       $("#mainContainer").css("backgroundImage","url(./imgs/bgClearSky.jpeg");
       $("#mainContainer").css("color","rgba(10,10,15,0.8)");
       $("#glassContainer").css("background","rgba(250, 250, 250, 0.4)")
    }

    if(weatherCode == 801) {
      $("#iconId").attr("src","imgs/fewClouds.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgFewClouds.jpeg");
      $("#glassContainer").css("background","rgba(200, 200, 200, 0.5)")
    }
    if(weatherCode >= 802 && weatherCode <= 803) {
      $("#iconId").attr("src","imgs/scatteredClouds.png")
      $("#mainContainer").css("backgroundImage","url(./imgs/bgScatteredClouds.jpeg");
      $("#glassContainer").css("background","rgba(150, 150, 150, 0.5)")
    }
    if(weatherCode == 804){
       $("#iconId").attr("src","imgs/brokenClouds.png");
       $("#mainContainer").css("backgroundImage","url(./imgs/bgBrokenClouds.jpg");
       $("#mainContainer").css("color","rgba(182,181,176,1)");
       $("#glassContainer").css("background","rgba(0, 0, 0, 0.5)")
    }

    if(weatherCode >= 701 && weatherCode <= 781) {
      $("#iconId").attr("src","imgs/mist.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgMist.jpeg");
      $("#mainContainer").css("color","rgba(220,230,220,0.8)");
    }

    if(weatherCode >= 600 && weatherCode <= 622) {
      $("#iconId").attr("src","imgs/snow.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgSnow.jpeg");
      $("#glassContainer").css("background","rgba(0, 0, 0, 0.5)")
      $("#mainContainer").css("color","rgba(250,250,250,0.8)");
    }

    if(weatherCode >= 300 && weatherCode <= 501 ) {
      $("#iconId").attr("src","imgs/rain.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgRain.jpg");
      $("#mainContainer").css("color","rgba(163,170,176,1)");
    }
    if(weatherCode >= 502 && weatherCode <= 531) {
      $("#iconId").attr("src","imgs/showerRain.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgShowerRain.jpg");
    }
    
    if(weatherCode >= 200 && weatherCode <= 232) {
      $("#iconId").attr("src","imgs/thunderstorm.png");
      $("#mainContainer").css("backgroundImage","url(./imgs/bgThunderstorm.jpeg");
      $("#mainContainer").css("color","rgba(200,200,200,0.8)");
    }
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