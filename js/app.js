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
			$("#current_img").html('<img src="img/'+json.currently.icon+'.svg" alt="'+json.currently.summary+'" class="icons">')

			for (i = 0; i <= 3; i++) {
				var today = new Date();
				var day = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i);
				var date = day.getDate() + "/" + (day.getMonth()+1) + "/" + day.getFullYear();

				$("#day_"+i+"_date").html(date);
				$("#day_"+i+"_temp").html(Math.round(json.daily.data[i].temperatureMin)+"-"+Math.round(json.daily.data[i].temperatureMax)+"&#176;C");
				$("#day_"+i+"_summary").html(json.daily.data[i].summary);
				$("#day_"+i+"_img").html('<img src="img/'+json.daily.data[i].icon+'.svg" alt="'+json.currently.summary+'" class="icons-sm">')
			}
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