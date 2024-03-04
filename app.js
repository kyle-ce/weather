var weatherApp = angular.module("weatherApp", []);

// Define controller
weatherApp.controller("WeatherController", [
  "$scope",
  "$http",
  ($scope, $http) => {
    $scope.getWeather = () => {
      const APIKEY = "e1894d66c30930391b3c8577326fbf74";

      // get city lat and long for weather api call
      console.log("city:", $scope.city);
      const DESTINATIONURL = `http://api.openweathermap.org/geo/1.0/direct?q=${$scope.city}&limit=5&appid=${APIKEY}`;
      $http
        .get(DESTINATIONURL)
        .then((response) => {
          const { lat, lon } = response.data[0];
          const WEATHERURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
          return $http.get(WEATHERURL);
        })
        .then((weatherResponse) => {
          $scope.weatherData = {
            temp: weatherResponse.data.main.temp,
            description: weatherResponse.data.weather[0].description,
          };
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching weather data:", error);
        });
    };
  },
]);
