  /*Filename: apod.js
	Author: Johannes Pikel
	Date: 2016.11.07
	Description: js script file to view the Astronomy picture of the Day
	in Full HD!
	Class: CS290-400
	Assignment: How to guide
	Due Date: 2016.11.16
	*/
	
function getData() {
  var req = new XMLHttpRequest;
  req.open("GET", "https://jpikel.com:8443/apod", true);

  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      if (response["media_type"] === "video") {
        var newVideo = document.createElement("iframe");
        newVideo.id = "video";
        newVideo.src = response["url"];
        document.getElementById('apod').appendChild(newVideo);
      } else {
		var newImg = document.createElement("img");
		newImg.src = response["hdurl"];
		newImg.id = "finalApod";
		document.getElementById('apod').appendChild(newImg);
      }
      
	  var newDiv = document.createElement("div");
	  var newP = document.createElement("p");
	  newP.textContent = response["title"] + ", Date: " + response["date"];
	  newDiv.appendChild(newP);
	  
	  var newP = document.createElement("p");
	  newP.textContent = "Copyright: " + response["copyright"];
	  newDiv.appendChild(newP);
	  
	  var newP = document.createElement("p");
	  newP.textContent = response["explanation"];
      newDiv.appendChild(newP);
	  
	  document.getElementById('apod').appendChild(newDiv);
      
      
    }
  });

  req.send(null);
}

getData();
