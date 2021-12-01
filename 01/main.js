const utils = require('../utils.js');

let measurements = utils.readLinesAsNumbers('input.txt');
let windowSize = 3;

let lookAheadSize = windowSize - 1;
let filteredMeasurements = [];
let numMeasurements = measurements.length;

for(let i = 0; i < numMeasurements; i++) {
	if(i + lookAheadSize >= numMeasurements) {
		break;
	}

	let accum = 0;
	for(let j = 0; j < windowSize; j++) {
		accum += measurements[i + j];
	}
	filteredMeasurements.push(accum);
}

function calculateNumberIncrements(measurements) {

	let numberLargerThanPrevious = 0;

	for(let i = 0; i < measurements.length; i++) {
		if(i === 0) {
			continue;
		}
		let previousValue = measurements[i - 1];
		let currentValue = measurements[i];
		if(previousValue < currentValue) {
			numberLargerThanPrevious++;
		}
	}

	return numberLargerThanPrevious;
}

console.log('Part 1', calculateNumberIncrements(measurements));
console.log('Part 2', calculateNumberIncrements(filteredMeasurements));
