var icons = {
				"clear-day" : "B", 
				"clear-night" : "C", 
				"rain" : "R", 
				"snow" : "G", 
				"sleet" : "X", 
				"wind" : "S", 
				"fog" :"N", 
				"cloudy" : "Y",
				"partly-cloudy-day" : "H", 
				"partly-cloudy-night" : "I"
			};

var cities = {
				"london"		: 	{coords: {latitude: 51.5074, longitude:0.1278}},
				"berlin"		: 	{coords: {latitude: 52.5200, longitude:13.4050}},
				"new york" 		: 	{coords: {latitude: 40.672060, longitude:-73.983898}},
				"los angeles" 	: 	{coords: {latitude: 34.101422, longitude: -118.341224}},
				"san francisco" : 	{coords: {latitude: 37.788531, longitude: -122.407237}},
				"current location" : ""
			};

function loadWeather(cityCoords){
	var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
	var forecastURL = "https://api.forecast.io/forecast/a29ebbc1dbf640ebc8b98b911dbeb333/"+latlng+"?units=uk2";

	$.ajax({
		url: forecastURL,
		jsonpCallback: 'jsonCallback',
		contentType: 'application/json',
		dataType: 'jsonp',
		success: function(json){
			console.log(json);
			$("#current_temp").html(Math.round(json.currently.temperature)+"&#176;C");
			$("#current_summary").html(json.currently.summary);
			$("#current_temp").attr("data-icon",icons[json.currently.icon]);
		},
		error: function(e){
			console.log(e.message);
		}
	});
}

function loadCity(city){
	$("#location").html(city);

	if(city.toLowerCase() == "current location"){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity);
		}
		else{
			loadDefaultCity();
		}
	}
	else{
		loadWeather(cities[city.toLowerCase()]);
	}
}

function loadDefaultCity(){
	loadCity("London");
}

$(document).ready(function(){
	loadCity("London");

	$("a.city").bind("click",function(){
		loadCity($(this).html());
	})
});