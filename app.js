var APPID = "61f94a9fa8130d49c23ed0f74d7e97af";
var tempC,tempF, loc, icon, humidity, wind, direction, city;

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);
            var weather = {};
            weather.icon = data.weather[0].icon;
            weather.humidity = data.main.humidity;
            weather.wind = KM(data.wind.speed); // this is for km
            //weather.wind = data.wind.speed;  //this is for miles
            weather.loc = data.name;
            weather.tempC = K2C(data.main.temp);
            weather.tempF = K2F(data.main.temp);
            weather.direction = degreesToDirection(data.wind.deg);
            update(weather);
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function updateByCityName(name) {
     var url = "http://api.openweathermap.org/data/2.5/weather?"+
        "q="+name+
        "&APPID="+APPID;
    sendRequest(url);
}

function degreesToDirection(degres){
    var range = 360/8;
    var low = 360 - range;
    var high = (low + range) % 360;
    var angles = ["N", "NE", "E", "ES", "S", "SW", "W", "NW"];
    
    for (var i = 0; i < angles.length; i++){
        
        if (degres >= low && degres < high){
            return angles[i];
        }
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    return "N"
}

function K2C(k) {
    return Math.round(k - 273.15);
}

function K2F(k) {
    return Math.round(k*(9/5)-459.67);
}

function KM(km){
    
    var trn = km / 5;
    var min = km - trn;
    var k = (min * 2);
    return k.toFixed(1)
}

function update(weather){
    
    tempC.innerHTML = weather.tempC;
    tempF.innerHTML = weather.tempF;
    loc.innerHTML = weather.loc;
    icon.src = "img/icons/" + weather.icon + '.png';
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
}

function citys(){
    tempC = document.getElementById('temperatureC');
    tempF = document.getElementById('temperatureF');
    loc = document.getElementById('location');
    icon = document.getElementById('icon');
    humidity = document.getElementById('humidity');
    wind = document.getElementById('wind');
    direction = document.getElementById('direction');
    city = document.getElementById('city').value || 'fremont';
    
    updateByCityName(city);
}























