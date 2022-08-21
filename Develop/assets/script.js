// form

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


// button functions
function storeLocation (event){
	event.preventDefault();

    localStorage.setItem('location', addLocation.value);
	var location = localStorage.getItem('location'); 
	locationEl.textContent = location;
	eventLocation.appendChild(locationEl); 
    
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


