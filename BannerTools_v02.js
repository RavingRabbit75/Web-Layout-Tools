
var BannerTools = (function() {
	// globals
	var BT_versionNum = "v0.2";
	var consoleWindow = document.createElement("div"); // container for all the panels
	var tinyWindow = document.createElement("div"); // container for minimized version
	var bannerToolsPanel = document.createElement("div"); // container for banner tool's own panel
	var bannerContainer; // default HTML tag container for the banner
	var modulesList = new Array(); // array list of registered tools. each tool will register themselves

	var body = (function () {
        var tempNode = document.getElementsByTagName("body");
        return tempNode[0];
    })();

	// get the prior status of the banner tool window
	// minimized, right, bottom, null
	var consoleWinMinimized = sessionStorage.getItem("consoleWinMinimized");
	var consoleWinLoc = sessionStorage.getItem("consoleWinLoc");

	// init functions should only be called once in beginning
	initConsoleWindow(consoleWinLoc, consoleWinMinimized);
	initBannerToolsPanel(consoleWinLoc);
	initMinimizedModeButton(consoleWinLoc, consoleWinMinimized);


	///////////////////////////////////////////////////////////
	// internal functions
	///////////////////////////////////////////////////////////


	function initConsoleWindow(priorSessionLocation, minimized) {
		// priorSessionLocation: right, bottom, or null location prior to reload
		// minimized: boolean to determine of tools was minimized prior to reload
		if (minimized=="true") {
			consoleWindow.style.display = "none";
			showMinimizedModeButton(consoleWinLoc);
		} else {
			consoleWindow.style.display = "block";
		}

		consoleWindow.id = "consoleWindow";
		consoleWindow.style.position = "absolute";
		consoleWindow.style.background = "#eeeeee";
		consoleWindow.style.padding = "0px";
		consoleWindow.style.margin = "0px";


		body.insertBefore(consoleWindow, document.getElementById(""));

		if (priorSessionLocation == "right" || priorSessionLocation == null) {
			drawConsoleOnRight();
		} else {
			drawConsoleOnBottom();
		}

	}

	function drawConsoleOnRight() {
		consoleWindow.style.border = "none";
		consoleWindow.style.borderLeft = "1px solid #666666";
		consoleWindow.style.left = "auto";
		consoleWindow.style.right = "0px";
		consoleWindow.style.top = "0px";
		consoleWindow.style.width = "200px";
		consoleWindow.style.height = "100%";
		consoleWindow.style.overflowY = "auto";
		consoleWindow.style.overflowX = "hidden";
		consoleWindow.style.whiteSpace = "initial";

		drawBannerToolsRight();
	}

	function drawConsoleOnBottom() {
		consoleWindow.style.border = "none";
		consoleWindow.style.borderTop = "1px solid #666666";
		consoleWindow.style.bottom = "0px";
		consoleWindow.style.top = "auto";
		consoleWindow.style.left = "0px";
		consoleWindow.style.width = "100%";
		consoleWindow.style.height = "200px";
		consoleWindow.style.overflowY = "hidden";
		consoleWindow.style.overflowX = "auto";
		consoleWindow.style.whiteSpace = "nowrap";

		drawBannerToolsBottom();
	}


	function initBannerToolsPanel(priorSessionLocation) {
		// priorSessionLocation: right or bottom location prior to reload
		bannerToolsPanel.style.position = "relative";
		bannerToolsPanel.style.boxSizing = "border-box";
		bannerToolsPanel.style.verticalAlign = "top";
		bannerToolsPanel.style.margin = "0px";


		if (priorSessionLocation == "right" || priorSessionLocation == null ) {
			drawBannerToolsRight();
		} else {
			drawBannerToolsBottom();
		}

		consoleWindow.insertBefore(bannerToolsPanel, document.getElementById(""));

		var title = document.createElement("div");
		title.style.fontFamily = "sans-serif";
		title.style.position = "relative";
		title.style.fontSize = "14px";
		title.style.paddingBottom = "5px";
		title.innerHTML = "Banner Tools " + BT_versionNum;
		bannerToolsPanel.appendChild(title);

	    var moveConsoleBottomBtn = document.createElement("button");
	    moveConsoleBottomBtn.id = "bottomButton";
	    moveConsoleBottomBtn.innerHTML = "Bottom";
	    bannerToolsPanel.appendChild(moveConsoleBottomBtn);

		var moveConsoleRightBtn = document.createElement("button");
	    moveConsoleRightBtn.id = "rightButton";
	    moveConsoleRightBtn.innerHTML = "Right";
	    bannerToolsPanel.appendChild(moveConsoleRightBtn);

		var minimizeBtn = document.createElement("button");
	    minimizeBtn.id = "minimizeButton";
	    minimizeBtn.innerHTML = "Minimize";
	    bannerToolsPanel.appendChild(minimizeBtn);

		minimizeBtn.addEventListener("click", minimizeBannerTools);
		moveConsoleBottomBtn.addEventListener("click", function(){drawConsoleOnBottom()});
		moveConsoleRightBtn.addEventListener("click", function(){drawConsoleOnRight()});

		var pathInputField = document.createElement("INPUT");
		pathInputField.setAttribute("type", "text");
		pathInputField.setAttribute("size", "25");
		pathInputField.setAttribute("id", "bannerDomIdField");
		pathInputField.style.marginTop = "10px";
		pathInputField.setAttribute("value", "bannerContent");
		pathInputField.addEventListener("keypress", handleKeyPress);
		bannerToolsPanel.appendChild(pathInputField);

		var notification = document.createElement("div");
		notification.style.fontFamily = "sans-serif";
		notification.style.position = "relative";
		notification.style.fontSize = "12px";
		notification.style.paddingTop = "5px";
		notification.style.paddingLeft = "2px";
		if (document.getElementById("bannerContent") !== null) {
			bannerContainer = document.getElementById("bannerContent");
			var bannerWidth = window.getComputedStyle(bannerContainer, null).getPropertyValue("width")
			var bannerHeight = window.getComputedStyle(bannerContainer, null).getPropertyValue("height")
			notification.innerHTML = parseInt(bannerWidth, 10) + " x " + parseInt(bannerHeight, 10);
		} else {
			notification.innerHTML = "No Banner Found";
		}
		bannerToolsPanel.appendChild(notification);

		function handleKeyPress(event) {
			// if enter key is pressed
			if (event.keyCode === 13) {
	            var bannerID = document.getElementById("bannerDomIdField").value;
				if (document.getElementById(bannerID) !== null) {
					bannerContainer = document.getElementById(bannerID);
					var bannerWidth = window.getComputedStyle(bannerContainer, null).getPropertyValue("width")
					var bannerHeight = window.getComputedStyle(bannerContainer, null).getPropertyValue("height")
					notification.innerHTML = parseInt(bannerWidth, 10) + " x " + parseInt(bannerHeight, 10);
				} else {
					notification.innerHTML = "invalid entry";
				}
	        }
		}

	}

	function drawBannerToolsRight() {
		bannerToolsPanel.style.border = "none";
		bannerToolsPanel.style.display = "block";
		bannerToolsPanel.style.paddingTop = "3px";
		bannerToolsPanel.style.paddingLeft = "3px";
		bannerToolsPanel.style.borderBottom = "1px solid #666666";
	    bannerToolsPanel.style.width = "200px";
	    bannerToolsPanel.style.height = "150px";
	    bannerToolsPanel.style.background = "#dddddd";

		for (var i = 0; i < modulesList.length; i++) {
			modulesList[i].verticalLayout();
		}

		sessionStorage.setItem("consoleWinLoc", "right");
	}

	function drawBannerToolsBottom() {
		bannerToolsPanel.style.border = "none";
		bannerToolsPanel.style.display = "inline-block";
		bannerToolsPanel.style.paddingTop = "3px";
		bannerToolsPanel.style.paddingLeft = "3px";
		bannerToolsPanel.style.borderRight = "1px solid #666666";
	    bannerToolsPanel.style.width = "200px";
	    bannerToolsPanel.style.height = "200px";
	    bannerToolsPanel.style.background = "#dddddd";
		bannerToolsPanel.style.whiteSpace = "initial";

		for (var i = 0; i < modulesList.length; i++) {
			modulesList[i].horizontalLayout();
		}

		sessionStorage.setItem("consoleWinLoc", "bottom");
	}


	function initMinimizedModeButton(priorSessionLocation, minimized) {
		// priorSessionLocation: right, bottom, or null location prior to reload
		// minimized: boolean to determine of tools was minimized prior to reload
		if (minimized=="true") {
			tinyWindow.style.display = "block";
		} else {
			tinyWindow.style.display = "none";
		}

		tinyWindow.id = "tinyWindow";
		tinyWindow.style.position = "absolute";
		tinyWindow.style.padding = "0px";
		tinyWindow.style.margin= "0px";
		tinyWindow.style.border="1px solid black";
		tinyWindow.style.right = "2px";
		tinyWindow.style.top = "2px";
		tinyWindow.style.width = "15px";
		tinyWindow.style.height = "15px";
		tinyWindow.style.cursor = "pointer";
		tinyWindow.title = "Open Banner Tools";
		body.insertBefore(tinyWindow, document.getElementById(""));

		tinyWindow.addEventListener("click", maximizeBannerTools);

		function maximizeBannerTools(event) {
			sessionStorage.setItem("consoleWinMinimized", "false");
			consoleWindow.style.display = "block";
			tinyWindow.style.display = "none";
		}

	}

	function minimizeBannerTools(event) {
		consoleWindow.style.display = "none";
		sessionStorage.setItem("consoleWinMinimized", "true");

		showMinimizedModeButton(consoleWinLoc);
	}

	function showMinimizedModeButton(consoleWinLoc) {
		tinyWindow.style.display = "block";
	}


	///////////////////////////////////////////////////////////
	// public functions
	///////////////////////////////////////////////////////////

	function registerBannerTool(toolName) {
		modulesList.push(toolName);
		// after register add to the list and setup
		// all other instances of trying to access moduleList methods be done via buttons
		var x = modulesList.length - 1;

		if (consoleWinLoc == "right" || consoleWinLoc == null) {
			modulesList[x].verticalLayout();
		} else {
			modulesList[x].horizontalLayout();
		}
	}

	return {
		registerTool: registerBannerTool
	};


})();
