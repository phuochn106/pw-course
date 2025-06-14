var heightCm = "153";
var subHeight = "";
var niceBody = 0;
var maxWeight = 0;
var minWeight = 0;

subHeight = heightCm.substring(1, 3)

niceBody = subHeight * 9 / 10;
maxWeight = subHeight;
minWeight = subHeight * 8 / 10;
console.log("Can nang ly tuong cua ban la: " + subHeight + "*9/10 = " + niceBody + " (kg)");
console.log("Can nang toi da la: " + maxWeight + " (kg) ");
console.log("Can nang toi thieu la: " + subHeight + "*8/10 = " + minWeight + " (kg)");


