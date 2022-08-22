// api key
const api = {
    key: 'af2b8cf771c6e5a5786673756f8b170b',
};
// button ids
var locationBtn = document.getElementById('locationBtn');
var foodBtn = document.getElementById('foodBtn');
var bringBtn = document.getElementById('bringBtn');
var activityBtn = document.getElementById('activityBtn')

// ids in the input button

var addLocation = document.getElementById('addLocation');
var addFood = document.getElementById('addFood');
var whatToBring = document.getElementById('whatToBring');
var addActivity = document.getElementById('addActivity');

// append choices fron javascript to html class
var eventLocation = document.getElementById('eventLocation');
var locationEl = document.createElement('h2')

var foodChoice1 = document.getElementById('foodChoice1');
var foodChoice2 = document.getElementById('foodChoice2');
var foodChoice3 = document.getElementById('foodChoice3');

var bringItem1 = document.getElementById('bringItem1');
var bringItem2 = document.getElementById('bringItem2');
var bringItem3 = document.getElementById('bringItem3');

var activityChoice1 = document.getElementById('activityChoice1');
var activityChoice2 = document.getElementById('activityChoice2');
var activityChoice3 = document.getElementById('activityChoice3');


// button click
locationBtn.addEventListener('click', storeLocation);
foodBtn.addEventListener('click', storeFood);
bringBtn.addEventListener('click', storeWhatToBring);
activityBtn.addEventListener('click', storeActivity);


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

// button functions
function storeLocation (event){
	event.preventDefault();

    localStorage.setItem('location', addLocation.value);
	var location = localStorage.getItem('location'); 
	locationEl.textContent = location;
	eventLocation.appendChild(locationEl); 

    cityLocation();
}

var foodArray = []
function storeFood (event){
	event.preventDefault();

	if(foodArray.length == 0){
		localStorage.setItem('food1', addFood.value);
		var food1 = localStorage.getItem('food1'); 
		foodArray.push(food1);
		foodChoice1.textContent = foodArray[0];
	}else if(foodArray.length == 1){
		localStorage.setItem('food2', addFood.value);
		var food2 = localStorage.getItem('food2'); 
		foodArray.push(food2);
		foodChoice2.textContent = foodArray[1];
	}else if(foodArray.length == 2){
		localStorage.setItem('food3', addFood.value);
		var food3 = localStorage.getItem('food3'); 
		foodArray.push(food3);
		foodChoice3.textContent = foodArray[2];
	}
	console.log(foodArray)
}

var bringArray = []
function storeWhatToBring (event){
	event.preventDefault();

	if(bringArray.length == 0){
		localStorage.setItem('bring1', whatToBring.value);
		var bring1 = localStorage.getItem('bring1');
		bringArray.push(bring1)
		bringItem1.textContent = bringArray[0];
	}else if(bringArray.length == 1){
		localStorage.setItem('bring2', whatToBring.value);
		var bring2 = localStorage.getItem('bring2');
		bringArray.push(bring2)
		bringItem2.textContent = bringArray[1];
	}else if(bringArray.length == 2){
		localStorage.setItem('bring3', whatToBring.value);
		var bring3 = localStorage.getItem('bring3');
		bringArray.push(bring3)
		bringItem3.textContent = bringArray[2];
	}

}

var activityArray = [];
function storeActivity(event){
	event.preventDefault();

	if(activityArray.length == 0){
		localStorage.setItem('activity1', addActivity.value);
		var activity1 = localStorage.getItem('activity1');
		activityArray.push(activity1)
		activityChoice1.textContent = activityArray[0];
	}else if(activityArray.length == 1){
		localStorage.setItem('activity2', addActivity.value);
		var activity2 = localStorage.getItem('activity2');
		activityArray.push(activity2)
		activityChoice2.textContent = activityArray[1];
	}else if(activityArray.length == 2){
		localStorage.setItem('activity3', addActivity.value);
		var activity3 = localStorage.getItem('activity3');
		activityArray.push(activity3)
		activityChoice3.textContent = activityArray[2];
	}
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


