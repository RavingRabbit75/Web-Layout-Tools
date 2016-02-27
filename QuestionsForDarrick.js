
// Difference between the two placements of parentheses at end of module:

function unnamed() {
  var my;
  return my;
}
var MODULE = unnamed();

var MODULE = function () {
    var my;
    return my;
};



var n = (3+4)*5;

var MODULE = (function () {
    var my;
    return my;
})();


var obj = {
  add: function() {

  },
  subtract: function() {

  }
};

(function() {

})

// Typical ways to organize code?

// How to organizing code for website vs sever-side/application?

var obj = {
  foo: 5,
  bar:
}


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
    return x;
	},

  // this does work:
	xx: 5

};

console.log(subObject.settings.path);

console.log(subObject.init()); // this doesn't output 15...gets an error
console.log(subObject.xx);
