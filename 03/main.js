const utils = require('../utils.js');

//let lines = utils.readLines('example.txt');
let lines = utils.readLines('input.txt');

let maxNumberBits = findMaxLength(lines);
let mostCommonBits = [];
let trueCounts = [];

for(let k = 0; k < maxNumberBits; k++) {
	trueCounts[k] = 0;
}

lines.forEach(line => {
	for(let i = 0; i < maxNumberBits; i++) {
		
		// Not sure if the input has varied length, but check just in case
		if(i >= line.length) {
			break;
		}
		
		// Otherwise the '0' string can be truthy below
		let bit = Number(line[i]);
		
		if(bit) {
			trueCounts[i]++;
		}
	}

});

mostCommonBits = trueCounts.map(e => {
	if(e > lines.length / 2) {
		return 1;
	} else {
		return 0;
	}
});

let leastCommonBits = mostCommonBits.map(e => e == 1 ? 0 : 1);

let gamma = binaryArrayToNumber(mostCommonBits);
let epsilon = binaryArrayToNumber(leastCommonBits);
let powerConsumption = gamma * epsilon;

console.log(`gamma: ${gamma}, epsilon: ${epsilon}, power consumption: ${powerConsumption}`);

function findMaxLength(arr) {
	let lengths = arr.map(el => el.length);
	let maxLength = Math.max(... lengths);
	return maxLength;
}

function binaryArrayToNumber(arr) {
	let binaryString = arr.join('');
	let parsedNumber = Number.parseInt(binaryString, 2);
	return parsedNumber;
}
