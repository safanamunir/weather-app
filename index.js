var city = document.getElementById("city");
var country = document.getElementById("country");
var temp = document.getElementById("temperature");
var main = document.getElementById("main");
let day = document.getElementById("day");
let month = document.getElementById("month");
let tempUnit = document.getElementById("tempUnit");
let image = document.getElementById("image");

window.onload =  function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  
  //API call
    axios.get('https://weather-proxy.freecodecamp.rocks/api/current?lat=' + lat + "&lon=" + lon) 
  .then(response => {
    var resData = response.data;
    main.innerHTML = resData.weather[0].description;
    
    temp.innerHTML = resData.main.temp.toFixed(1);
    city.innerHTML = resData.name;
    country.innerHTML =  resData.sys.country;
    //get day
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    day.innerHTML = days[d.getDay()];
    //get month and year
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    month.innerHTML = months[d.getMonth()] + " , " + d.getFullYear();
    //set icon
    document.getElementById("myImage").src = resData.weather[0].icon;

    //convert to f
    tempUnit.onclick = function setToF(){
      if(tempUnit.innerHTML == "F"){
        tempUnit.innerHTML = "C";
        var celcius = resData.main.temp;
        temp.innerHTML = celcius.toFixed(1);
    
      }else if(tempUnit.innerHTML == "C"){
        tempUnit.innerHTML = "F";
        var farenheit = (resData.main.temp * 9 / 5) + 32;
        console.log("C to F", farenheit);
        temp.innerHTML = Math.floor(farenheit);
      }
     
    }
  }, err =>{
    console.log(err);
  })

}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }
