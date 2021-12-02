const utils = require('../utils.js');

let lines = utils.readLines('example.txt');

let parsedMovements = parseMovements(lines);

let horizontal = 0; // 'x'
let depth = 0;      // 'y'

parsedMovements.forEach(move => {
	horizontal += move.x;
	depth += move.y;
});

let multiplied = horizontal * depth;

console.log(`horizontal: ${horizontal}, depth: ${depth}, multiplied: ${multiplied}`);

// Take an array of movements and convert them into relative coordinates
function parseMovements(lines) {
	return lines.map(parseMovement);
}

function parseMovement(movement) {
	
	let [direction, units] = movement.split(' ');
	let x = 0, y = 0;

	// We want numbers all throughout, no funny accidental string concats
	units = Number(units);

	// There doesn't seem to be a 'backwards'
	if(direction === 'forward') {
		x = units;
	} else {
		if(direction === 'up') {
			y = -units;
		} else {
			y = units;
		}
	}
	
	return { x, y };
}
