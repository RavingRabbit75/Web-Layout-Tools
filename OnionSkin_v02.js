var OnionSkin = (function() {
	// globals
	var Onion_versionNum = "v0.2";
	var onionContainer; // where the actual onion resides in the HTML tree
	var onionSkinsArray = []; // Array to keep track of multiple onion layers
	var lastVisibleOpacityLevel; // recent opacity level setting used to "toggle" visibilty with the show and hide buttons

	var consoleWindow = document.getElementById("consoleWindow"); // get the element containing the parent Banner Tools
	var onionSkinPanel = document.createElement("div");

	var title = document.createElement("div");


	///////////////////////////////////////////////////////////
	// internal functions
	///////////////////////////////////////////////////////////

	// init function
	(function () {
	    consoleWindow.appendChild(onionSkinPanel);
		title.style.fontFamily = "sans-serif";
		title.style.position = "relative";
		title.style.fontSize = "12px";
		title.style.paddingBottom = "5px";
		title.innerHTML = "Onion Skin " + Onion_versionNum;
		onionSkinPanel.appendChild(title);
	})();

	// set up html empty onion layer
	(function () {
		onionContainer = document.getElementById("bannerContent");
		var node = document.createElement("div");
		node.style.position = "absolute";
	    node.style.left = "0px";
	    node.style.top = "0px";
	    node.style.width = "300px";
	    node.style.height = "250px";
	    node.setAttribute("id", "onionLayer");
	    onionContainer.appendChild(node);
	    onionContainer.style.zIndex = 999999;
	})();

	var pathInputField = document.createElement("INPUT");
	pathInputField.setAttribute("type", "text");
	pathInputField.setAttribute("size", "25");
	pathInputField.setAttribute("id", "onionPath");
	onionSkinPanel.appendChild(pathInputField);

	var opacitySlider = document.createElement("INPUT");
	opacitySlider.setAttribute("type", "range");
	opacitySlider.setAttribute("min", "0");
	opacitySlider.setAttribute("max", "100");
	opacitySlider.setAttribute("id", "opacitySlider");
	opacitySlider.style.width = "170px";
	onionSkinPanel.appendChild(opacitySlider);

	opacitySlider.addEventListener("input", sliderChanged);
	opacitySlider.addEventListener("change", sliderReleased);
	function sliderChanged(event) {
		var opacityLevel = opacitySlider.value/100;
		setOnionOpacity(opacityLevel);
    }
	function sliderReleased(event) {
		var opacityLevel = opacitySlider.value;
		sessionStorage.setItem("opacityLevel", opacityLevel);
		lastVisibleOpacityLevel = opacitySlider.value;
		sessionStorage.setItem("lastVisibleOpacityLevel", lastVisibleOpacityLevel);
    }

	var buttonShow = document.createElement("button");
    var buttonHide = document.createElement("button");

    buttonShow.id = "button01";
    buttonShow.innerHTML = "Show";
    buttonHide.id = "button01";
    buttonHide.innerHTML = "Hide";
    onionSkinPanel.appendChild(buttonShow);
    onionSkinPanel.appendChild(buttonHide);

    buttonShow.addEventListener("click", buttonShowClick);
	buttonHide.addEventListener("click", buttonHideClick);

    function buttonShowClick(event) {
		var onionPath = document.getElementById("onionPath").value;
        setOnionSkin(onionPath);
		if (lastVisibleOpacityLevel == null) {
			opacitySlider.value = 100;
			setOnionOpacity(1.0);
		} else {
			opacitySlider.value = lastVisibleOpacityLevel;
			setOnionOpacity(lastVisibleOpacityLevel/100);
		}

		sessionStorage.setItem("opacityLevel", opacitySlider.value);

    }
    function buttonHideClick(event) {
		if (opacitySlider.value > 0) {
			lastVisibleOpacityLevel = opacitySlider.value;
			sessionStorage.setItem("lastVisibleOpacityLevel", lastVisibleOpacityLevel);
		}
		opacitySlider.value = 0;
		setOnionOpacity(0);
		sessionStorage.setItem("opacityLevel", 0);
    }


	var setOnionSkin = function (path) {
		document.getElementById("onionLayer").style.backgroundImage = "url("+path+")";
		sessionStorage.setItem("lastOnionSkinPath", path);
	};

	var setOnionOpacity = function (opacityLevel) {
		document.getElementById("onionLayer").style.opacity = opacityLevel;

	};

	// load session storage variables and set inital settings
	(function () {
		var lastSkinPath = sessionStorage.getItem("lastOnionSkinPath");
		if (lastSkinPath !== "" && lastSkinPath !== null) {
			pathInputField.value = lastSkinPath;
			setOnionSkin(lastSkinPath);
		}

		var opacityLevel = sessionStorage.getItem("opacityLevel");
		opacitySlider.value = opacityLevel;
		document.getElementById("onionLayer").style.opacity = opacityLevel/100;

		lastVisibleOpacityLevel = sessionStorage.getItem("lastVisibleOpacityLevel");
	})();



	///////////////////////////////////////////////////////////
	// public functions
	///////////////////////////////////////////////////////////

	function changeToVerticalLayout() {
		onionSkinPanel.style.display = "inline-block";

		onionSkinPanel.style.position = "relative";
		onionSkinPanel.style.paddingTop = "3px";
		onionSkinPanel.style.paddingLeft = "3px";
		onionSkinPanel.style.margin = "0px";
	    onionSkinPanel.style.boxSizing = "border-box";
		onionSkinPanel.style.border = "none";
		onionSkinPanel.style.borderBottom = "1px solid #666666";
	    onionSkinPanel.style.right = "0px";
		onionSkinPanel.style.top = "auto";
	    onionSkinPanel.style.width = "200px";
	    onionSkinPanel.style.height = "100px";
	    onionSkinPanel.style.background = "#dddddd";
		onionSkinPanel.style.verticalAlign = "none";
	}

	function changeToHorizontalLayout() {
		onionSkinPanel.style.display = "inline-block";

		onionSkinPanel.style.position = "relative";
		onionSkinPanel.style.paddingTop = "3px";
		onionSkinPanel.style.paddingLeft = "3px";
		onionSkinPanel.style.margin = "0px";
	    onionSkinPanel.style.boxSizing = "border-box";
		onionSkinPanel.style.border = "none";
		onionSkinPanel.style.borderRight = "1px solid #666666";
	    onionSkinPanel.style.right = "auto";
		onionSkinPanel.style.top = "auto";
	    onionSkinPanel.style.width = "200px";
	    onionSkinPanel.style.height = "200px";
	    onionSkinPanel.style.background = "#dddddd";
		onionSkinPanel.style.verticalAlign = "top";

	}

	return {
		verticalLayout: changeToVerticalLayout,
		horizontalLayout: changeToHorizontalLayout,
	};

})();

BannerTools.registerTool(OnionSkin);
