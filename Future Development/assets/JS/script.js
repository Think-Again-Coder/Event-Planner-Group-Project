// Code for drop down activity and material suggestions for Future Development Feature
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