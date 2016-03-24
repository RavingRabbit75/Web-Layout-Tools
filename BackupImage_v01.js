var BackupImage = (function(){
	// globals
	var Timer_versionNum = "v0.1";
	var consoleWindow = document.getElementById("consoleWindow"); // get the element containing the parent Banner Tools
	var backupImagePanel = document.createElement("div");
	var title = document.createElement("div");


	///////////////////////////////////////////////////////////
	// internal functions
	///////////////////////////////////////////////////////////

	// init function
	(function () {
	    consoleWindow.appendChild(backupImagePanel);
		title.style.fontFamily = "sans-serif";
		title.style.position = "relative";
		title.style.fontSize = "12px";
		title.style.paddingBottom = "5px";
		title.innerHTML = "BackupImage " + Timer_versionNum;
		backupImagePanel.appendChild(title);
	})();

	var pathInputField = document.createElement("INPUT");
	pathInputField.setAttribute("type", "text");
	pathInputField.setAttribute("size", "25");
	pathInputField.setAttribute("id", "onionPath");
	pathInputField.addEventListener("keypress", handleKeyPress);
	backupImagePanel.appendChild(pathInputField);

	function handleKeyPress(event) {
		// if enter key is pressed
		if (event.keyCode === 13) {
			setBackupImage(pathInputField.value);
		}
	}

	var btnToggleBackupImage = document.createElement("button");
	btnToggleBackupImage.id = "btnToggleBackupImage";
	btnToggleBackupImage.innerHTML = "Hide";
	backupImagePanel.appendChild(btnToggleBackupImage);

	btnToggleBackupImage.addEventListener("click", hideBackupImageClick, false);
	function hideBackupImageClick(event) {
		btnToggleBackupImage.innerHTML = "Show";
		btnToggleBackupImage.removeEventListener("click", hideBackupImageClick, false);

		btnToggleBackupImage.addEventListener("click", showBackupImageClick, false);
	}

	function showBackupImageClick(event) {
		btnToggleBackupImage.innerHTML = "Hide";
		btnToggleBackupImage.removeEventListener("click", showBackupImageClick, false);

		btnToggleBackupImage.addEventListener("click", hideBackupImageClick, false);
	}

	console.log(BannerTools.getWidth());

	var backupImageWrapper = document.createElement("div");
	backupImageWrapper.id = "backupImageWrapper";
	// backupImageWrapper.style.border = "1px dashed green";
	backupImageWrapper.style.boxSizing = "border-box";
	backupImageWrapper.style.position = "relative";
	var mainBody = document.getElementById("main");
	mainBody.appendChild(backupImageWrapper);

	var backupImage = document.createElement("div");
	backupImage.id = "backupImage";
	backupImage.style.border = "1px solid green";
	backupImage.style.width = BannerTools.getWidth();
	backupImage.style.height = BannerTools.getHeight();
	backupImage.style.position = "relative";
	backupImage.style.float = "left";
	backupImage.style.boxSizing = "border-box";
	backupImage.style.backgroundOrigin = "border-box";
	backupImage.style.textAlign = "center";
	backupImage.style.marginLeft = "10px";
	var backupImageWrapper = document.getElementById("backupImageWrapper");
	var consoleWindow = document.getElementById("consoleWindow")
	backupImageWrapper.appendChild(backupImage);

	var setBackupImage = function (path) {
		var img = new Image();
		img.onload = function () {
			console.log("load good");
			document.getElementById("backupImage").style.backgroundImage = "url("+path+")";
			backupImage.innerHTML = null;
		}
		img.onerror = function () {
			console.log("load bad");
			document.getElementById("backupImage").style.backgroundImage = "url()";
			backupImage.innerHTML = "<div id='ghostDiv'></div><div id='errorTextBox'><p id='errorText'>No Backup Image Available</p></div>";
			var errorText = document.getElementById("errorText");
			var errorTextBox = document.getElementById("errorTextBox");
			var ghostDiv = document.getElementById("ghostDiv");
			ghostDiv.style.display = "inline-block";
			ghostDiv.innerHTML = "";
			// ghostDiv.style.border = "1px solid orange";
			ghostDiv.style.height = "99%";
			ghostDiv.style.verticalAlign = "middle";

			errorTextBox.style.display = "inline-block";
			errorTextBox.style.verticalAlign = "middle";

			// errorText.style.border = "1px dashed purple";
			errorText.style.margin = "0px";
		}
		img.src = path;

		// sessionStorage.setItem("lastOnionSkinPath", path);



	};

	setBackupImage("backupImage.jpg");
	// var lastSkinPath = sessionStorage.getItem("lastOnionSkinPath");
	// if (lastSkinPath !== "" && lastSkinPath !== null) {
	// 	pathInputField.value = lastSkinPath;
	// 	setOnionSkin(lastSkinPath);
	// }


	///////////////////////////////////////////////////////////
	// public functions
	///////////////////////////////////////////////////////////

	function changeToVerticalLayout() {
		backupImagePanel.style.display = "inline-block";

		backupImagePanel.style.position = "relative";
		backupImagePanel.style.paddingTop = "3px";
		backupImagePanel.style.paddingLeft = "3px";
		backupImagePanel.style.margin = "0px";
	    backupImagePanel.style.boxSizing = "border-box";
		backupImagePanel.style.border = "none";
		backupImagePanel.style.borderBottom = "1px solid #666666";
	    backupImagePanel.style.right = "0px";
		backupImagePanel.style.top = "auto";
	    backupImagePanel.style.width = "200px";
	    backupImagePanel.style.height = "100px";
	    backupImagePanel.style.background = "#dddddd";
		backupImagePanel.style.verticalAlign = "initial";
	}

	function changeToHorizontalLayout() {
		backupImagePanel.style.display = "inline-block";

		backupImagePanel.style.position = "relative";
		backupImagePanel.style.paddingTop = "3px";
		backupImagePanel.style.paddingLeft = "3px";
		backupImagePanel.style.margin = "0px";
	    backupImagePanel.style.boxSizing = "border-box";
		backupImagePanel.style.border = "none";
		backupImagePanel.style.borderRight = "1px solid #666666";
	    backupImagePanel.style.right = "auto";
		backupImagePanel.style.top = "auto";
	    backupImagePanel.style.width = "200px";
	    backupImagePanel.style.height = "200px";
	    backupImagePanel.style.background = "#dddddd";
		backupImagePanel.style.verticalAlign = "top";

	}
	return {
		verticalLayout: changeToVerticalLayout,
		horizontalLayout: changeToHorizontalLayout
	};
})();

BannerTools.registerTool(BackupImage);
