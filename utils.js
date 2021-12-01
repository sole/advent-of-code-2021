const fs = require('fs');

function readTextFile(fileName) {
	return fs.readFileSync(fileName, 'utf-8');
}

function readLines(fileName) {
	let contents = readTextFile(fileName);
	return contents.split('\n');
}

function readLinesAsNumbers(fileName) {
	let lines = readLines(fileName);
	return lines.map(v => Number(v));
}

module.exports = {
	readTextFile,
	readLines,
	readLinesAsNumbers
}
