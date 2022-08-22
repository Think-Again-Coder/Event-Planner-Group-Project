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
var bringSelect = document.getElementById("bringSelect");

// append choices fron javascript to html class
var eventLocation = document.getElementById('eventLocation');
var locationEl = document.createElement('h2')

var foodChoices = document.getElementById("food");
var activities = document.getElementById("activity");
var bringItems = document.getElementById("bring");

// button click
locationBtn.addEventListener('click', storeLocation);
foodBtn.addEventListener('click', storeFood);
// bringSelect.addEventListener('click', loadOptions);
activityBtn.addEventListener('click', storeActivity);
bringBtn.addEventListener('click', storeWhatToBring);


// weather variables
var weatherDisplay = document.getElementById('weatherDisplay');
var newcityEl = document.createElement('h2');
var getCityCoordinates = ``
var cityCoordinates = ``

var weatherDisplay = document.getElementById('weatherDisplay');
var temp0 = document.getElementById('temp0');
var wind0 = document.getElementById('wind0');
var humidity0 = document.getElementById('humidity0');

// moment.js time
var currentDay = document.getElementById('currentDay')

// button functions
function storeLocation(event) {
    event.preventDefault();

    let date = datePicker.value;
    let location = addLocation.value;

    // Make sure a date has been chosen and user is not inputting an empty string
    if (date == '') {
        alert("Please choose a date.");
        return;
    } else if (location == '') {
        alert("Please enter a location.");
        return;
    }


    // Check if this date exists in localStorage
    let data = localStorage.getItem(date);


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

    loadData();
}

function storeFood(event) {
    event.preventDefault();

    let date = datePicker.value;
    let food = addFood.value;

    // Make sure a date has been chosen and user is not inputting an empty string
    if (date == '') {
        alert("Please choose a date.");
        return;
    } else if (food == '') {
        alert("Please enter a food.");
        return;
    }
    let data = localStorage.getItem(date);

    if (data === null) {
        // If date is not in localStorage

        let date_data = `{"food":["${food}"]}`;

        localStorage.setItem(date, date_data);

    } else {
        // If date is in localStorage

        let date_data = JSON.parse(localStorage.getItem(date));
        let foodArray = date_data.foodArray;

        if (foodArray === undefined) {
            // If there is no food array.

            date_data.foodArray = [food];

        } else {
            // If there is a food array.

            console.log(foodArray);
            date_data.foodArray.push(food);

        }
        localStorage.setItem(date, JSON.stringify(date_data));
    }
    loadData();
}

function storeWhatToBring(event) {
    event.preventDefault();

    let date = datePicker.value;
    let bringItem = whatToBring.value;
    let activitySelected = bringSelect.value;

    // Make sure a date has been chosen and user is not inputting an empty string
    // and an activity has been selected.
    if (date == '') {
        alert("Please choose a date.");
        return;
    } else if (bringItem == '') {
        alert("Please enter an item.");
        return;
    } else if (activitySelected == 'Select Activity') {
        alert("Please select an activity.");
        return;
    }
    let data = localStorage.getItem(date);

    if (data === null) {
        // If date is not in localStorage

        alert("Please create an activity first.");
        return;

    } else {
        // If date is in localStorage

        let date_data = JSON.parse(localStorage.getItem(date));
        let bringArray = date_data.activityObj[activitySelected];
        console.log("first");

        if (bringArray === undefined) {
            // If there is no bringArray.

            date_data.activityObj[activitySelected] = [bringItem];
            console.log("second");

        } else {
            // If there is a bringArray.

            bringArray.push(bringItem);
            console.log("third");
        }

        localStorage.setItem(date, JSON.stringify(date_data));
    }
    loadData();
}

function storeActivity(event) {
    event.preventDefault();

    let date = datePicker.value;
    let activityKey = addActivity.value;

    // Make sure a date has been chosen and user is not inputting an empty string
    if (date == '') {
        alert("Please choose a date.");
        return;
    } else if (activityKey == '') {
        alert("Please enter an activity.");
        return;
    }
    let data = localStorage.getItem(date);

    if (data === null) {
        // If date is not in localStorage

        let date_data = `{"activityObj":{${activityKey}:[]}}`;

        localStorage.setItem(date, date_data);

    } else {
        // If date is in localStorage

        let date_data = JSON.parse(localStorage.getItem(date));

        let activityObj = date_data.activityObj;

        if (activityObj === undefined) {
            date_data.activityObj = {};
        }

        let activities = date_data.activityObj[activityKey];

        if (activities === undefined) {
            // If there is no activityKey.

            date_data.activityObj[activityKey] = [];

        } else {
            // If there is an activityKey.

            // Do nothing. The activity already exists.
            return;
        }
        localStorage.setItem(date, JSON.stringify(date_data));
    }
    loadData();
}

//calendar date 
const calendars = bulmaCalendar.attach('[type="date"]');

// Loop on each calendar initialized
calendars.forEach(calendar => {
    // Add listener to select event
    calendar.on('select', function() {
        setTimeout(() => {
            loadData();
        }, 100)
    });
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
    // bulmaCalendar instance is available as element.bulmaCalendar
    element.bulmaCalendar.on('select', datepicker => {

    });
}

// City Weather
function cityLocation() {

    var loc = JSON.parse(localStorage.getItem(datePicker.value)).location;
    getCityCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=5&appid=af2b8cf771c6e5a5786673756f8b170b`

    fetch(getCityCoordinates)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var lat = data[0].lat
            var lon = data[0].lon
            cityCoordinates = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api.key}`

            cityWeather();

        })
}

function cityWeather() {
    fetch(cityCoordinates)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            weatherIcon = data.daily[0].weather[0].main;
            temp = data.daily[0].temp.day;
            wind = data.daily[0].wind_speed;
            humidity = data.daily[0].humidity;

            temp0.textContent = `Temp: ${temp}F`
            wind0.textContent = `Wind: ${wind}mph`
            humidity0.textContent = `Humidity: ${humidity}%`

            iconDisplay();
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

// Load data from localStorage on page.
function loadData() {
    removeNodes(foodChoices);
    removeNodes(activities);
    removeNodes(bringItems);
    eventLocation.innerText = '';

    if (datePicker.value == '') { return }
    let date_data = JSON.parse(localStorage.getItem(datePicker.value));

    if (date_data == null) { return; }

    if (date_data.location != undefined) {
        eventLocation.innerText = date_data.location;
    }
    // load the food array
    if (date_data.foodArray != undefined) {
        date_data.foodArray.forEach(function(val) {
            let foodChild = document.createElement("li");

            foodChild.textContent = val;
            foodChoices.appendChild(foodChild);
        })
    }
    // load the array containing activities and what to bring
    if (date_data.activityObj) {
        for (const [key, value] of Object.entries(date_data.activityObj)) {
            let keyChild = document.createElement("li");

            keyChild.textContent = key;
            activities.appendChild(keyChild);

            value.forEach(function(val) {
                let elChild = document.createElement("li");

                elChild.textContent = val;
                bringItems.appendChild(elChild);
            })
        }
    }
    loadOptions();
}

function removeNodes(p) {
    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
}

function loadOptions() {

    let bringSelect = document.getElementById("bringSelect");

    removeNodes(bringSelect);
    let firstChild = document.createElement("option");
    firstChild.innerText = "Select Activity";
    bringSelect.add(firstChild);
    if (datePicker.value == '') { return }

    let date_data = JSON.parse(localStorage.getItem(datePicker.value));

    if (date_data == null) { return; }

    for (let key in date_data.activityObj) {
        let newChild = document.createElement("option");
        newChild.innerText = key;
        bringSelect.add(newChild);
    }
}