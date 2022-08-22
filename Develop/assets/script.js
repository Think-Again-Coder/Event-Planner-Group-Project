// api key
const api = {
    key: 'af2b8cf771c6e5a5786673756f8b170b',
};
// button ids
var locationBtn = document.getElementById('locationBtn');
var foodBtn = document.getElementById('foodBtn');
var bringBtn = document.getElementById('bringBtn');

// ids in the input button

var addLocation = document.getElementById('addLocation');
var addFood = document.getElementById('addFood');
var whatToBring = document.getElementById('whatToBring');

// append choices fron javascript to html class
var eventLocation = document.getElementById('eventLocation');
var foodChoices = document.getElementById('foodChoices');
var bringList = document.getElementById('bringList');

var locationEl = document.createElement('h2')
var foodEl = document.createElement('h2')
var bringEl = document.createElement('li')

// button click
locationBtn.addEventListener('click', storeLocation);
foodBtn.addEventListener('click', storeFood);
bringBtn.addEventListener('click', storeWhatToBring);

foodArray = []

// weather variables
var weatherDisplay = document.getElementById('weatherDisplay');
var newcityEl = document.createElement('h2');
var getCityCoordinates =``
var cityCoordinates = ``

var weatherDisplay = document.getElementById('weatherDisplay');
var temp0 = document.getElementById('temp0')
var wind0 = document.getElementById('wind0');
var humidity0 = document.getElementById('humidity0');

// var temp = []
// var wind = []
// var humidity = []
// var weatherDisplay = []

// moment.js time
var currentDay= document.getElementById('currentDay')

function getDay(){
currentDay.textContent = moment().format('MMMM Do YYYY');
}
getDay();

// Code for drop down activity and material suggestions
var e = document.getElementById("bringBtn");
var list = document.querySelector('#bringList');
var list2 = document.createElement('ol');
var bring = document.createElement('li');
var bring2 = document.createElement('li');
var bring3 = document.createElement('li');

function onChange() {
    var text = e.options[e.selectedIndex].text;
    // console.log(text);
    if (text == "Basketball") {
        var basket = "Basketball";
		var net = "Net";
		var board = "Whiteboard for Score Keeping"
        bring.textContent = basket;
		bring2.textContent = net;
		bring3.textContent = board;
        list.appendChild(bring);
		list.appendChild(bring2);
		list.appendChild(bring3);
    } else if (text == "Volleyball") {
        var volley = "Volleyball";
		var net = "Net";
		var board = "Whiteboard for Score Keeping"
        bring.textContent = volley;
		bring2.textContent = net;
		bring3.textContent = board;
        list.appendChild(bring);
		list.appendChild(bring2);
		list.appendChild(bring3);
    } else if (text == "S'mores") {
        var marshmallow = "Marshmallows";
		var chocolate = "Chocolate";
		var cracker = "Graham Crackers";
        bring.textContent = marshmallow;
		bring2.textContent = chocolate;
		bring3.textContent = cracker;
        list.appendChild(bring);
		list.appendChild(bring2);
		list.appendChild(bring3);
	} else if (text == "BBQ") {
        var meat = "Meat";
		var charcoal = "Charcoal";
		var condiments = "Condiments";
        bring.textContent = meat;
		bring2.textContent = charcoal;
		bring3.textContent = condiments;
        list.appendChild(bring);
		list.appendChild(bring2);
		list.appendChild(bring3);
	}
}
e.onchange = onChange;
onChange();


// button functions
function storeLocation (event){
	event.preventDefault();

    localStorage.setItem('location', addLocation.value);
	var location = localStorage.getItem('location'); 
	locationEl.textContent = location;
	eventLocation.appendChild(locationEl); 

    cityLocation();
}

function storeFood (event){
	event.preventDefault();

    localStorage.setItem('food', addFood.value);
	var food = localStorage.getItem('food'); 
	foodArray.push(food);

	foodEl.textContent = foodArray[0];
	console.log(foodArray)

	foodChoices.appendChild(foodEl); 
}

function storeWhatToBring (event){
	event.preventDefault();

    localStorage.setItem('whatToBring', whatToBring.value);
	var bring = localStorage.getItem('whatToBring');
	bringEl.textContent = bring;
	bringList.appendChild(bringEl);


}


//calendar date 
const calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
calendars.forEach(calendar => {
	// Add listener to select event
	calendar.on('select', date => {
		console.log(date);
	});
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', datepicker => {
		console.log(datepicker.data.value());
	});
}


// City Weather


function cityLocation(){
	var location = localStorage.getItem('location'); 
	getCityCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=af2b8cf771c6e5a5786673756f8b170b`

	fetch(getCityCoordinates)
		.then(function(response){
		return response.json();
		})
		.then(function(data){
			console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            cityCoordinates = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api.key}`
            console.log(cityCoordinates)
	
			cityWeather();
			
		})
}


function cityWeather(){
	fetch(cityCoordinates)
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			console.log(data)
			weatherIcon = data.daily[0].weather[0].main;
			temp = data.daily[0].temp.day;
			wind = data.daily[0].wind_speed;
			humidity = data.daily[0].humidity;


			temp0.textContent = `Temp: ${temp}F`
			wind0.textContent = `Wind: ${wind}mph`
			humidity0.textContent = `Humidity: ${humidity}%`

			console.log(temp)
			iconDisplay();
			console.log(weatherIcon)
		})
}

function iconDisplay(){
	if(weatherIcon == 'Clouds'){
        weatherDisplay.textContent = '⛅'
    }else if(weatherIcon == 'Rain'){
        weatherDisplay.textContent = '🌦️'
    }else if(weatherIcon == 'Clear'){
        weatherDisplay.textContent = '🌞'
    }
}