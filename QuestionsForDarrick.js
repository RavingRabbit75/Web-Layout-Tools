
// Difference between the two placements of parentheses at end of module:

var MODULE = (function () {
    var my;
    return my;
}());


var MODULE = (function () {
    var my;
    return my;
})();


// Typical ways to organize code?

// How to organizing code for website vs sever-side/application?




// What's the purpose of this pattern? Is this an object pattern of some sort?:
var subObject = {

	settings: {
		location: "right",
		path: "someRandomPath/morePath/",
		someRandNumber: 8
	},

	init: function() {
		console.log("shit happens");
        var x = 15;
	},

    // this doesn't work:
	//var xx = 5;

};

console.log(subObject.settings.path);
subObject.init();
console.log(x); // this doesn't output 15...gets an error
