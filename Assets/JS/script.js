// api key
const api = {
    key: 'af2b8cf771c6e5a5786673756f8b170b',
};
// button ids
var locationBtn = document.getElementById('locationBtn');
var foodBtn = document.getElementById('foodBtn');
var bringBtn = document.getElementById('bringBtn');
var activityBtn = document.getElementById('activityBtn');

// ids in the input button

var addLocation = document.getElementById('addLocation');
var addFood = document.getElementById('addFood');
var whatToBring = document.getElementById('whatToBring');
var addActivity = document.getElementById('addActivity');
var datePicker = document.getElementById('datePicker');

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
var getCityCoordinates = ``
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
var currentDay = document.getElementById('currentDay')

function getDay() {
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
function storeLocation(event) {
    event.preventDefault();

    let date = datePicker.value;

    // Make sure a date has been chosen
    if (date == '') {
        alert("Please choose a date.");
        return;
    }

    // Check if this date exists in localStorage
    let data = localStorage.getItem(date);
    let location = addLocation.value;

    if (data === null) {
        // If date is not in localStorage
        let date_data = `{"location":"${location}"}`;

        localStorage.setItem(date, date_data);

    } else {
        // If date is in localStorage
        let date_data = JSON.parse(localStorage.getItem(date));

        date_data.location = location;

        localStorage.setItem(date, JSON.stringify(date_data));
    }
    getLocation(location);

    cityLocation();
}

//var foodArray = [];

function storeFood(event) {
    event.preventDefault();

    let date = datePicker.value;

    // Make sure a date has been chosen
    if (date == '') {
        alert("Please choose a date.");
        return;
    }
    let data = localStorage.getItem(date);

    if (data === null) {
        // If date is not in localStorage

        let date_data = `{"food":["${addFood.value}"]}`;

        localStorage.setItem(date, date_data);

    } else {
        // If date is in localStorage

        let date_data = JSON.parse(localStorage.getItem(date));
        let foodArray = date_data.foodArray;

        if (foodArray === undefined) {
            // If there is no food array.

            date_data.foodArray = [addFood.value];

        } else {
            // If there is a food array.

            console.log(foodArray);
            date_data.foodArray.push(addFood.value);

        }
        localStorage.setItem(date, JSON.stringify(date_data));
    }
}

// var bringArray = []

function storeWhatToBring(event) {
    event.preventDefault();

    let date = datePicker.value;

    // Make sure a date has been chosen
    if (date == '') {
        alert("Please choose a date.");
        return;
    }
    let data = localStorage.getItem(date);

    if (data === null) {
        // If date is not in localStorage

        let date_data = `{"bringArray":["${whatToBring.value}"]}`;

        localStorage.setItem(date, date_data);

    } else {
        // If date is in localStorage

        let date_data = JSON.parse(localStorage.getItem(date));
        let bringArray = date_data.bringArray;

        if (bringArray === undefined) {
            // If there is no food array.

            date_data.bringArray = [whatToBring.value];

        } else {
            // If there is a food array.

            console.log(bringArray);
            date_data.bringArray.push(whatToBring.value);

        }
        localStorage.setItem(date, JSON.stringify(date_data));
    }

    // if (bringArray.length == 0) {
    //     localStorage.setItem('bring1', whatToBring.value);
    //     var bring1 = localStorage.getItem('bring1');
    //     bringArray.push(bring1)
    //     bringItem1.textContent = bringArray[0];
    // } else if (bringArray.length == 1) {
    //     localStorage.setItem('bring2', whatToBring.value);
    //     var bring2 = localStorage.getItem('bring2');
    //     bringArray.push(bring2)
    //     bringItem2.textContent = bringArray[1];
    // } else if (bringArray.length == 2) {
    //     localStorage.setItem('bring3', whatToBring.value);
    //     var bring3 = localStorage.getItem('bring3');
    //     bringArray.push(bring3)
    //     bringItem3.textContent = bringArray[2];
    // }

}

var activityArray = [];

function storeActivity(event) {
    event.preventDefault();

    if (activityArray.length == 0) {
        localStorage.setItem('activity1', addActivity.value);
        var activity1 = localStorage.getItem('activity1');
        activityArray.push(activity1)
        activityChoice1.textContent = activityArray[0];
    } else if (activityArray.length == 1) {
        localStorage.setItem('activity2', addActivity.value);
        var activity2 = localStorage.getItem('activity2');
        activityArray.push(activity2)
        activityChoice2.textContent = activityArray[1];
    } else if (activityArray.length == 2) {
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


function cityLocation() {
    var location = localStorage.getItem('location');
    getCityCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=af2b8cf771c6e5a5786673756f8b170b`

    fetch(getCityCoordinates)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            cityCoordinates = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api.key}`
            console.log(cityCoordinates)

            cityWeather();

        })
}


function cityWeather() {
    fetch(cityCoordinates)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
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

function iconDisplay() {
    if (weatherIcon == 'Clouds') {
        weatherDisplay.textContent = '⛅'
    } else if (weatherIcon == 'Rain') {
        weatherDisplay.textContent = '🌦️'
    } else if (weatherIcon == 'Clear') {
        weatherDisplay.textContent = '🌞'
    }
}