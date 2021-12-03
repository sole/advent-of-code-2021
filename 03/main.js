const utils = require('../utils.js');

//let lines = utils.readLines('example.txt');
let lines = utils.readLines('input.txt');

let maxNumberBits = findMaxLength(lines);
let mostCommonBits = [];

for(let i = 0; i < maxNumberBits; i++) {
	mostCommonBits[i] = findMostCommonBitAtPosition(lines, i);
}

let leastCommonBits = mostCommonBits.map(e => e == 1 ? 0 : 1);

let gamma = binaryArrayToNumber(mostCommonBits);
let epsilon = binaryArrayToNumber(leastCommonBits);
let powerConsumption = gamma * epsilon;

console.log(`Part 1 - gamma: ${gamma}, epsilon: ${epsilon}, power consumption: ${powerConsumption}`);

let oxigenArray = lines.concat();
let carbonArray = lines.concat();

for(let i = 0; i < maxNumberBits; i++) {
	let commonBit = findMostCommonBitAtPosition(oxigenArray, i);
	if(oxigenArray.length > 1) {
		oxigenArray = oxigenArray.filter(e => {
			let bit = Number(e[i]);
			return bit == commonBit;
		});
	}

	let uncommonBit = findMostCommonBitAtPosition(carbonArray, i) == 1 ? 0 : 1;
	if(carbonArray.length > 1) {
		carbonArray = carbonArray.filter(e => {
			let bit = Number(e[i]);
			return bit == uncommonBit;
		});
	}
}

let oxigenGeneratorRating = Number.parseInt(oxigenArray.pop(), 2);
let carbonGeneratorRating = Number.parseInt(carbonArray.pop(), 2);
let lifeSupportRating = oxigenGeneratorRating * carbonGeneratorRating;

console.log(`Part 2 - generator ratings - oxigen: ${oxigenGeneratorRating}, carbon: ${carbonGeneratorRating}, life support: ${lifeSupportRating}`);

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

function findMostCommonBitAtPosition(array, position) {
	let countOnes = 0;
	array.forEach(v => {
		let bit = Number(v[position]);
		countOnes += bit;
	});
	
	// If it's most common, it's happening half or more of the times
	let mostCommon = countOnes >= array.length / 2 ? 1 : 0;
	return mostCommon;
}
