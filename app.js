$('document').ready(function () {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            $.ajax({
                url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9cc747ed3457f77c3b4daf1950e83e8e`
                , success: function (data) {

                    let weatherCondition = data.weather[0].main;
                    let weatherDescription = data.weather[0].description;
                    let weatherTime = data.weather[0].icon;

                    $("#current-temp").text(Math.round((data.main.temp) / 10) + '°C');
                    $("#current-weather-description").text(weatherDescription);
                    $("#location-header").text(data.name + ', ' + data.sys.country);


                    $("#table-detail-weather").css('display', "table")
                    $("#feels_like").text((data.main.feels_like / 10).toFixed(2) + '°C');
                    $("#temp_min").text((data.main.temp_min / 10).toFixed(2) + '°C');
                    $("#temp_max").text((data.main.temp_max / 10).toFixed(2) + '°C');
                    $("#pressure").text(data.main.pressure + ' hPa');
                    $("#humidity").text(data.main.humidity + '%');

                    var icons = new Skycons({ "color": "orange" });

                    switch (weatherCondition) {
                        case "Clouds":
                            if (weatherTime.indexOf("d") >= 0) {
                                icons.set("weather-icon", Skycons.PARTLY_CLOUDY_DAY);
                                break;
                            } else {
                                icons.set("weather-icon",  Skycons.PARTLY_CLOUDY_NIGHT);
                                break;
                            }
                        case "Clear":
                            if (weatherTime.indexOf("d") >= 0) {
                                icons.set("weather-icon", Skycons.CLEAR_DAY);
                                break;
                            } else {
                                icons.set("weather-icon", Skycons.CLEAR_NIGHT);
                                break;
                            }
                        case "Rain":
                            icons.set("weather-icon", Skycons.RAIN);
                            break;
                        case "Snow":
                            icons.set("weather-icon", Skycons.SNOW);
                            break;
                        case "Sleet":
                            icons.set("weather-icon", Skycons.SLEET);
                            break;
                        case "Wind":
                            icons.set("weather-icon", Skycons.WIND);
                            break;
                        case "Fog":
                            icons.set("weather-icon", Skycons.FOG);
                            break;
                    }
                  
                    icons.play();
                }
            });
        });


    } else {
        alert("Geolocation is not supported by this browser.\n/Please let us know your location");
    }

})
