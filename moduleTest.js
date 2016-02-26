
var SubObject = (function() {

	function stupidSubTask01() {
		console.log("stupidSubTask01");
	}

	function stupidSubTask02() {
		console.log("stupidSubTask02");
	}

	return {
		task01: stupidSubTask01,
		task02: stupidSubTask02
	};
})();

MainObject.register(SubObject);
