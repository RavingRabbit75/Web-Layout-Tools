
var Timer = (function() {

	var textDisplay; // Final formatted string of elapsed time to be displayed

	var display;
	var button1;
	var button2;
	var button1Text;
	var button2Text;

	var oneHundredthDigit = 0;
	var oneTenthDigit = 0;
	var secondsOneDigit = 0;
	var secondsTenDigit = 0;
	var minutesDigit = 0;

	var t;

	var body = document.getElementById("main");
    var banner = document.getElementById("bannerContent");
    var node = document.createElement("DIV");
    node.style.position = "absolute";
    node.style.border = "1px solid black";
    node.style.right = "0px";
    node.style.top = "0px";
    node.style.width = "120px";
    node.style.height = "90px";
    node.style.background = "white";

    textDisplay = document.createTextNode("0:00.00");

    button1 = document.createElement("DIV");
    button1.style.position = "absolute";
    button1.style.bottom = "0px";
    button1.style.left = "0px";
    button1.style.width = "40px";
    button1.style.height = "40px";
    button1.style.background = "#082168";
    button1.style.color = "white";
    button1.style.cursor = "pointer";
    button1.style.fontSize = "10pt";
    button1.style.textAlign = "center";
    button1Text = document.createTextNode("Stop");
    button1.appendChild(button1Text);

    button2 = document.createElement("DIV");
    button2.style.position = "absolute";
    button2.style.bottom = "0px";
    button2.style.left = "42px";
    button2.style.width = "40px";
    button2.style.height = "40px";
    button2.style.background = "#074e00";
    button2.style.color = "white";
    button2.style.cursor = "pointer";
    button2.style.fontSize = "10pt";
    button2.style.textAlign = "center";
    button2Text = document.createTextNode("Hide");
    button2.appendChild(button2Text);

    node.appendChild(button1);
    node.appendChild(button2);
    node.appendChild(textDisplay);
    node.style.fontFamily = "Arial,sans-serif";
    node.id = "timeDisplayNode";
    body.insertBefore(node, document.getElementById(""));



    var minimalNode = document.createElement("DIV");
    minimalNode.style.position = "absolute";
    minimalNode.style.right = "0px";
    minimalNode.style.top = "0px";
    minimalNode.style.width = "100px";
    minimalNode.style.height = "30px";
    minimalNode.style.background = "#ff9bb3";
    minimalNode.style.visibility = "hidden";
    body.insertBefore(minimalNode, document.getElementById(""));


	function minimizeDisplay() {
		clearTimeout(t);
		node.style.visibility = "hidden";
		minimalNode.style.visibility = "visible";
		minimalNode.style.cursor = "pointer";
		minimalNode.addEventListener("click", maximizeDisplay, false);
		function maximizeDisplay(event) {
			minimalNode.style.visibility = "hidden";
			node.style.visibility = "visible";
		}
	}

	button1.addEventListener("click", button1Click, false);
	function button1Click(event) {
		clearTimeout(t);
	}

	button2.addEventListener("click", button2Click, false);
	function button2Click(event) {
		minimizeDisplay();
	}


	function addToTime() {

		oneHundredthDigit = oneHundredthDigit + 1;
		if (oneHundredthDigit === 10) {
			oneHundredthDigit = 0;
			oneTenthDigit = oneTenthDigit + 1;

			if (oneTenthDigit === 10) {
				oneTenthDigit = 0;
				secondsOneDigit = secondsOneDigit + 1;
				if (secondsOneDigit === 10) {
					secondsOneDigit = 0;
					secondsTenDigit = secondsTenDigit + 1;

					if (secondsTenDigit === 6) {
						secondsTenDigit = 0;
						minutesDigit = minutesDigit + 1;
					}
				}
			}
		}

		return [minutesDigit, secondsTenDigit, secondsOneDigit, oneTenthDigit, oneHundredthDigit];
	}


	bannerContent.addEventListener('build', function (event) {
	  console.log("banner has ended");
	}, false);

	var startTimer = function () {
		display = addToTime();
		textDisplay.nodeValue = display[0] + ":" + display[1] + display[2] + "." + display[3] + display[4];

		t = setTimeout(function(){startTimer()},10);
	};

	var stopTimer = function () {
		clearTimeout(t);
	};

	return {
		start: startTimer,
		stop: stopTimer,
	};

})();
