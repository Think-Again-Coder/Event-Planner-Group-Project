// form

// button ids
var locationBtn = document.getElementById('locationBtn');
var foodBtn = document.getElementById('foodBtn');
var bringBtn = document.getElementById('bringBtn');

// input ids

var addLocation = document.getElementById('addLocation');
var addFood = document.getElementById('addFood');
var whatToBring = document.getElementById('whatToBring');

// button click
locationBtn.addEventListener('click', displayResponse);

function displayResponse(event){
    event.preventDefault();

    storeLocation();
    storeFood();
    storeWhatToBring();
}

// button functions
function storeLocation (){
    localStorage.setItem('location', addLocation.value);
    
}

function storeFood (){
    localStorage.setItem('food', addFood.value);
}

function storeWhatToBring (){
    localStorage.setItem('whatToBring', whatToBring.value);
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


