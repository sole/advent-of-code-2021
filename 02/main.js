const utils = require('../utils.js');

let lines = utils.readLines('input.txt');

let parsedMovements = parseMovements(lines);

console.log(solvePart1(parsedMovements));
console.log(solvePart2(parsedMovements));

function solvePart1(movements) {

	let horizontal = 0; // 'x'
	let depth = 0;      // 'y'

	movements.forEach(move => {
		horizontal += move.x;
		depth += move.y;
	});

	return (formatResult(horizontal, depth));

}

function solvePart2(movements) {
	
	let horizontal = 0;
	let depth = 0;
	let aim = 0;

	movements.forEach(move => {
		aim += move.y; // down increases the aim, up increases the aim
		horizontal += move.x;
		depth += aim * move.x;
	});

	return (formatResult(horizontal, depth));

}

function formatResult(horizontal, depth) {
	let multiplied = horizontal * depth;
	return `horizontal: ${horizontal}, depth: ${depth}, multiplied: ${multiplied}`;
}

// Take an array of movements and convert them into relative coordinates
function parseMovements(lines) {
	return lines.map(parseMovement);
}

function parseMovement(movement) {
	// Not a very sophisticated parser but we don't really need more here I guess! No need for RegEx.
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
