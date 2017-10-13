  /*Filename: menu.js
	Author: Johannes Pikel
	Date: 2016.11.07
	Description: js script file to add a menu to each page
	Class: CS290-400
	Assignment: How to guide
	Due Date: 2016.11.16
	*/

function addMenu(){
	var newMenu = document.createElement('select');
	newMenu.id = "menu";
	newMenu.value = "menu";
	
	newMenu.addEventListener('change', function(){
		if(this.value != "menu"){
			window.location.href = this.value;
			console.log(this.value);
			event.preventDefault();
		}
	});
	
	var title = document.createElement('option');
	title.textContent = "Navigation";
	newMenu.appendChild(title);
	
	var home = document.createElement('option');
	home.textContent = "Home";
	home.value = "index.html";
	
	var getStarted = document.createElement('option');
	getStarted.textContent = "Introduction";
	getStarted.value = "start.html";
	
	var signUp = document.createElement('option');
	signUp.textContent = "Sign Up - The Basics";
	signUp.value = "signup.html";
	
	var seeIt = document.createElement('option');
	seeIt.textContent = "APOD Implemented";
	seeIt.value = "seeit.html";
	
	var mars = document.createElement('option');
	mars.textContent = "Mars Rover API";
	mars.value = "mars.html";
	
	var mars2 = document.createElement('option');
	mars2.textContent = "Mars Pictures Rover API";
	mars2.value = "mars2.html";
	
	newMenu.appendChild(home);
	newMenu.appendChild(getStarted);
	newMenu.appendChild(signUp);
	newMenu.appendChild(seeIt);
	newMenu.appendChild(mars);
	newMenu.appendChild(mars2);
	
	var firstElement = document.getElementById('heading');
	document.body.insertBefore(newMenu, firstElement);
}

document.addEventListener('DOMContentLoaded', function(){
	addMenu();
	var links = document.getElementsByClassName('newtab');
	for(var i = 0; i < links.length; i++){
		links[i].target = "_blank";
	}
});