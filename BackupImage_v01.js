var BackupImage = (function(){
	// globals
	var Timer_versionNum = "v0.1";
	var consoleWindow = document.getElementById("consoleWindow"); // get the element containing the parent Banner Tools
	var backupImagePanel = document.createElement("div");
	var title = document.createElement("div");

	var backupImage = document.getElementById("backupImage");


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
		backupImagePanel.style.verticalAlign = "none";
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
