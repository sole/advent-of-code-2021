const utils = require('../utils.js');

class Board {
	constructor() {
		this.lines = [];
		this.marked = [];
	}

	addLine(numbers) {
		this.lines.push(numbers);
		let markedLine = [];
		numbers.forEach(n => {
			markedLine.push(false);
		});
		this.marked.push(markedLine);
	}

	markNumber(number) {
		let coords = this.findNumber(number);
		console.log(coords);
		if(coords) {
			let [x, y] = coords;
			this.marked[x][y] = true;
			return true;
		}
		return false;
	}

	findNumber(number) {
		for(let i = 0; i < this.lines.length; i++) {
			let line = this.lines[i];
			for(let j = 0; j < line.length; j++) {
				if(line[j] == number) {
					return [i, j];
				}
			}
		}
		return null;
	}

	isWinner() {
		// Horizontally
		for(let i = 0; i < this.marked.length; i++) {
			let markedCount = 0;
			let marked = this.marked[i];
			for(let j = 0; j < marked.length; j++) {
				if(marked[j]) {
					markedCount++;
				}
			}
			// Do we have a full row of marked numbers?
			if(markedCount === marked.length) {
				console.log('horizontal winner');
				return true;
			}
		}

		// Vertically
		let lineLength = this.marked[0].length;
		for(let j = 0; j < lineLength; j++) {
			let markedCount = 0;
			for(let i = 0; i < this.marked.length; i++) {
				if(this.marked[i][j]) {
					markedCount++;
				}
			}

			// Do we have a full column of marked numbers?
			if(markedCount === this.marked.length) {
				console.log('vertical winner');
				return true;
			}
		}
	
		return false;

	}

	getSumOfUnmarked() {
		let sum = 0;
		this.lines.forEach((line, i) => {
			line.forEach((n, j) => {
				if(!this.marked[i][j]) {
					sum += n;
				}
			});
		});
		return sum;
	}
	
}


//let input = utils.readTextFile('example.txt');
let input = utils.readTextFile('input.txt');

let [drawnNumbers, boards] = parseInput(input);

//console.log(drawnNumbers, boards);
//process.exit(0);

for(let i = 0; i < drawnNumbers.length; i++) {
	let number = drawnNumbers[i];
	//console.log('drawing', number);
	boards.forEach((board, index) => {
		//console.log('Marking in board', index);
		let res = board.markNumber(number);
		//console.log('was in board', res);
		if(board.isWinner()) {
			console.log(`Board number ${index} is winner!`)
			console.log(board);
			let sumUnmarked = board.getSumOfUnmarked();
			console.log(sumUnmarked);
			let finalScore = sumUnmarked * number;
			console.log('final', finalScore);
			process.exit(0);
		}
	});
}


function parseInput(input) {
	let chunks = input.split('\n\n');
	
	let numbersChunk = chunks.shift();
	let boardsChunk = chunks;

	let drawnNumbers = numbersChunk.split(',').map(s => Number(s));
	let boards = [];

	boardsChunk.forEach(boardChunk => {
		let board = new Board();
		console.log('board --------------');
		console.log('CHUNK');
		console.log(boardChunk);
		
		let boardLines = boardChunk.split('\n');
		console.log(boardLines.length, 'lines');

		// this is megAUgly
		boardLines.forEach(line => {
			let numbers = line.split(/(\d+)\s*/).filter(s => s.trim().length > 0);
			console.log(numbers);
			if(numbers.length > 0) {
				numbers = numbers.map(s => Number(s));
				board.addLine(numbers);
			}
		});
		boards.push(board);
	});

	return [drawnNumbers, boards];
}


