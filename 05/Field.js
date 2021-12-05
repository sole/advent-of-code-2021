// const Matrix = require('../Matrix.js');

module.exports = class Field {
	constructor(coordinates) {

		this.coordinates = coordinates.concat();

		let xCoords = coordinates.map(pair => {
			return [ pair.from.x, pair.to.x ];
		}).flat();

		let yCoords = coordinates.map(pair => {
			return [ pair.from.y, pair.to.y ];
		}).flat();

		let maxX = Math.max(... xCoords);
		let maxY = Math.max(... yCoords);

		this.numX = maxX + 1;
		this.numY = maxY + 1;

		// 'Sparse' array style
		this.covered = [];
		
	}

	getCoveredAmount(m, n) {
		let row = this.covered[m];
		if(row !== undefined) {
			let cell = row[n];
			if(cell !== undefined) {
				return cell;
			}
		}
		return 0;
	}

	setCoveredAmount(m, n, amount) {
		let row = this.covered[m];
		if(row === undefined) {
			row = [];
			this.covered[m] = row;
		}
		row[n] = amount;
	}

	printDiagram() {

		console.log('printDiagram');
		
		for(let i = 0; i < this.numX; i++) {
			let str = '';

			for(let j = 0; j < this.numY; j++) {
				// let value = this.values.get(i, j);
				let value = this.getCoveredAmount(i, j);
				let c;

				if(value > 0) {
					c = value;
				} else {
					c = '.';
				}

				str += c;
			}

			str += ` : ${i}`;
			console.log(str);
		}
	}

	considerHorizontal() {
		let self = this;
	
		let lines = this.coordinates;

		lines.forEach(line => {
			let from = line.from;
			let to = line.to;

			if(from.x === to.x) {
				console.log('horizontal', line);
	
				let y0 = Math.min(from.y, to.y);
				let y = y0;
				let x = from.x;
				let delta = to.y - from.y;
				let steps = Math.abs(delta);

				for(let i = 0; i <= steps; i++) {
					let amount = self.getCoveredAmount(x, y);
					self.setCoveredAmount(x, y, amount + 1);
					y += 1 ;
				}
			}
		});
	}

	considerVertical() {
		let self = this;
		
		let lines = this.coordinates;

		lines.forEach(line => {
			let from = line.from;
			let to = line.to;

			if(from.y === to.y) {
				console.log('vertical', line);
	
				let x0 = Math.min(from.x, to.x);
				let x = x0;
				let y = from.y;
				let delta = to.x - from.x;
				let steps = Math.abs(delta);

				for(let i = 0; i <= steps; i++) {
					let amount = self.getCoveredAmount(x, y);
					self.setCoveredAmount(x, y, amount + 1);
					x += 1 ;
				}
			}
		});
	}

	getNumPointsWithOverlap() {
		let overlapping = 0;
		for(let i = 0; i < this.numX; i++) {

			for(let j = 0; j < this.numY; j++) {
				let value = this.getCoveredAmount(i, j);
				if(value >= 2) {
					overlapping++;
				}
			}
		}
		return overlapping;
	}


};
