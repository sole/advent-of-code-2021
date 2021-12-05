const utils = require('../utils.js');
const Field = require('./Field.js');


let input = utils.readLines(
	//'example.txt'
	'input.txt'
);

lineCoords = parseInput(input);

console.log(lineCoords);

part1(lineCoords);

function part1(lineCoords) {
	let field = new Field(lineCoords);
	field.printDiagram();
	field.considerHorizontal();
	field.considerVertical();
	field.printDiagram();
	console.log('Overlapping = ', field.getNumPointsWithOverlap());
}

function parseInput(lines) {
	let vents = [];
	lines.forEach(line => {
		let [s1, s2] = line.split(' -> ');
		let v1 = parseCoords(s1);
		let v2 = parseCoords(s2);
		vents.push({from: v1, to: v2 });
	});
	return vents;
}

function parseCoords(str) {
	let [x, y] = str.split(',');
	return { x: Number(x), y: Number(y) };
}
