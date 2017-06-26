var cutName = function(someString) {
  var someArray=[];
  var startPos=0;
  var endPos=1;
  for (var i=0; i < someString.length; i ++) {
    if (someString.charAt(i) == " ") {
      endPos = i;
      someArray.push(someString.substring(startPos, endPos));
      startPos=i+1;
    }
    if (i == someString.length-1) {
        endPos = i+1;
        someArray.push(someString.substring(startPos, endPos));
    }
  }

  return someArray;
}

var phrase = cutName("bum ass stupid");
console.log(phrase);
