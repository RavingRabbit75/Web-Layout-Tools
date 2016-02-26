
var MainObject = (function() {

	var moduleList = new Array();

	function registerSubModule(subModule) {
		moduleList.push(subModule);
		moduleList[0].task01();
	}

	function stupidTask01() {
		console.log("stupidTask01");
	}

	function stupidTask02() {
		console.log("stupidTask02");
	}

	return {
		task01: stupidTask01,
		task02: stupidTask02,
		register: registerSubModule
	};

})();
