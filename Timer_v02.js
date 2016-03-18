
var Timer = (function() {
	// globals
	var Timer_versionNum = "v0.2";
	var consoleWindow = document.getElementById("consoleWindow"); // get the element containing the parent Banner Tools
	var timerPanel = document.createElement("div");
	var title = document.createElement("div");

	var display = new Array(); // array for individual numbers in the timer display

	var minutesDigit = 0;
	var secondsTenDigit = 0;
	var secondsOneDigit = 0;
	var oneTenthDigit = 0;
	var oneHundredthDigit = 0;

	var timer;
	var timerRunning = false; // boolean indicating if timer is running

	// get the prior status of the timer start on reload
	// true, false
	var timerStartOnLoad = sessionStorage.getItem("timerStartOnLoad");

	///////////////////////////////////////////////////////////
	// internal functions
	///////////////////////////////////////////////////////////

	// init function
	(function () {
		consoleWindow.appendChild(timerPanel);
		timerPanel.style.paddingBottom = "5px";
		title.style.fontFamily = "sans-serif";
		title.style.position = "relative";
		title.style.fontSize = "12px";
		title.style.paddingBottom = "5px";
		title.innerHTML = "Timer " + Timer_versionNum;
		timerPanel.appendChild(title);
	})();

	var buttonStartStop = document.createElement("button");
	var buttonBreak = document.createElement("button");
	var checkbox01 = document.createElement('input');
	checkbox01.type = "checkbox";

	buttonStartStop.id = "timer_button01";
	buttonStartStop.innerHTML = "Start";
	buttonBreak.id = "timer_button02";
	buttonBreak.innerHTML = "Break";

	var checkBox01_field = document.createElement("div");
	checkBox01_field.style.marginTop = "5px";
	checkBox01_field.style.width = "150px";
	checkbox01.id = "checkbox01";

	checkbox01.addEventListener("click", calc, false);

	var label = document.createElement('label');
	label.htmlFor = "checkbox01";
	label.style.fontFamily = "sans-serif";
	label.style.fontSize = "12px";
	label.appendChild(document.createTextNode('Start on Reload'));

	timerPanel.appendChild(buttonStartStop);
	timerPanel.appendChild(buttonBreak);
	timerPanel.appendChild(checkBox01_field);
	checkBox01_field.appendChild(checkbox01);
	checkBox01_field.appendChild(label);

	var timerDisplay = document.createElement("div");
	timerDisplay.style.fontFamily = "sans-serif";
	timerDisplay.style.position = "relative";
	timerDisplay.style.fontSize = "20px";
	timerDisplay.style.marginTop = "5px";
	timerDisplay.style.paddingLeft = "2px";

	timerDisplay.innerHTML = "0:00.00";
	timerPanel.appendChild(timerDisplay);

	var timerBreakPointsBox = document.createElement("div");

	timerBreakPointsBox.style.width = "180px";
	timerBreakPointsBox.style.height = "160px";
	timerBreakPointsBox.style.border = "1px solid #AAAAAA";
	// timerBreakPointsBox.style.marginBottom = "0px";
	timerBreakPointsBox.style.overflowY = "scroll";
	timerPanel.appendChild(timerBreakPointsBox);

	// button1.addEventListener("click", button1Click, false);
	// function button1Click(event) {
	// 	clearTimeout(t);
	// }

	buttonBreak.addEventListener("click", buttonBreakClick, false);
	function buttonBreakClick(event) {
		if (timerRunning) {
			var temp = display[0] + ":" + display[1] + display[2] + "." + display[3] + display[4];
			addTimerBreakPoint(temp, "break button");
		}

	}

	buttonStartStop.addEventListener("click", buttonStartClick, false);
	function buttonStartClick(event) {
		startTimer();
		timerRunning = true;
		buttonStartStop.innerHTML = "Stop";
		buttonStartStop.removeEventListener("click", buttonStartClick, false);
		buttonStartStop.addEventListener("click", buttonStopClick, false);
	}
	function buttonStopClick(event) {
		stopTimer();
		timerRunning = false;
		buttonStartStop.innerHTML = "Start";
		buttonStartStop.removeEventListener("click", buttonStopClick, false);
		buttonStartStop.addEventListener("click", buttonStartClick, false);
	}

	if (timerStartOnLoad=="true") {
		checkbox01.checked = true;
		startTimer();
		timerRunning = true;
		buttonStartStop.innerHTML = "Stop";
		buttonStartStop.removeEventListener("click", buttonStartClick, false);
		buttonStartStop.addEventListener("click", buttonStopClick, false);
	} else {
		checkbox01.checked = false;
	}


	function calc(event) {
		console.log(checkbox01.checked);
		if (checkbox01.checked == true) {
			sessionStorage.setItem("timerStartOnLoad", "true");
		} else {
			sessionStorage.setItem("timerStartOnLoad", "false");
		}
	}

	var breakPointList = new Array(); // Array to contain multiple timer break points


	function addTimerBreakPoint(breakTimeString, breakTimeLabel) {
		var breakpointObject = document.createElement("div");
		breakpointObject.style.position = "relative";
		breakpointObject.style.width = "auto";
		// breakpointObject.style.height = "30px";
		breakpointObject.style.borderBottom = "1px dashed #BBBBBB";
		// breakpointObject.style.borderTop = "1px solid red";

		breakpointObject.style.fontFamily = "sans-serif";
		breakpointObject.style.fontSize = "20px";
		breakpointObject.style.paddingTop = "4px";
		breakpointObject.style.paddingBottom = "3px";
		breakpointObject.style.paddingLeft = "4px";

		breakpointObject.innerHTML = breakTimeString;
		timerBreakPointsBox.appendChild(breakpointObject);

		var breakpointLabel = document.createElement("div");
		breakpointLabel.style.position = "absolute";
		breakpointLabel.style.top = "4px";
		breakpointLabel.style.left = "80px";
		breakpointLabel.style.fontSize = "10px";
		breakpointLabel.innerHTML = breakTimeLabel;
		breakpointObject.appendChild(breakpointLabel);
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


	///////////////////////////////////////////////////////////
	// public functions
	///////////////////////////////////////////////////////////

	function changeToVerticalLayout() {
		timerPanel.style.display = "inline-block";

		timerPanel.style.position = "relative";
		timerPanel.style.paddingTop = "3px";
		timerPanel.style.paddingLeft = "3px";
		timerPanel.style.margin = "0px";
		timerPanel.style.boxSizing = "border-box";
		timerPanel.style.border = "none";
		timerPanel.style.borderBottom = "1px solid #666666";
		timerPanel.style.right = "0px";
		timerPanel.style.top = "auto";
		timerPanel.style.width = "200px";
		timerPanel.style.height = "auto";
		timerPanel.style.background = "#dddddd";
		timerPanel.style.verticalAlign = "none";

		timerBreakPointsBox.style.position = "relative";
		timerBreakPointsBox.style.left = "0px";
		timerBreakPointsBox.style.top = "0px";
	}

	function changeToHorizontalLayout() {
		timerPanel.style.display = "inline-block";

		timerPanel.style.position = "relative";
		timerPanel.style.paddingTop = "3px";
		timerPanel.style.paddingLeft = "3px";
		timerPanel.style.margin = "0px";
    	timerPanel.style.boxSizing = "border-box";
		timerPanel.style.border = "none";
		timerPanel.style.borderRight = "1px solid #666666";
    	timerPanel.style.right = "auto";
		timerPanel.style.top = "auto";
    	timerPanel.style.width = "370px";
    	timerPanel.style.height = "200px";
    	timerPanel.style.background = "#dddddd";
		timerPanel.style.verticalAlign = "top";
		timerPanel.style.whiteSpace = "initial";

		timerBreakPointsBox.style.position = "absolute";
		timerBreakPointsBox.style.left = "170px";
		timerBreakPointsBox.style.top = "25px";
	}


	function startTimer () {
		display = addToTime();
		timerDisplay.innerHTML = display[0] + ":" + display[1] + display[2] + "." + display[3] + display[4];

		timer = setTimeout(function() {startTimer()},10);
	};

	function stopTimer () {
		clearTimeout(timer);
	};

	return {
		verticalLayout: changeToVerticalLayout,
		horizontalLayout: changeToHorizontalLayout,
		start: startTimer,
		stop: stopTimer
	};

})();

BannerTools.registerTool(Timer);
// Timer.start();
