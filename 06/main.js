const utils = require('../utils.js');

let input = utils.readTextFile(
	'example.txt'
	//'input.txt'
);


let ages = parseInput(input);
console.log(ages);

let numIterationsPart1 = 80;
let agesPart1 = ages.concat();
agesPart1 = iterate(agesPart1, numIterationsPart1);

console.log(`Number of fish after ${numIterationsPart1}: ${agesPart1.length}`);

let numIterationsPart2 = 80 // // 256;
let agesPart2 = ages.concat();

/* This uses All The Memory for obvious reasons
for(let i = 0; i < numIterationsPart2; i++) {
	agesPart2 = iterate(agesPart2);
}
*/


/* Still uses All The Memory
// what about calculating each fish separately?
let numFishes = [];
for(let i = 0; i < agesPart2.length; i++) {
	let el = agesPart2[i];
	let elAges = [ el ];
	let spawned = iterate(elAges, numIterationsPart2);
	console.log(`Element ${i} has ${spawned.length} at the end`);
	numFishes.push(spawned.length);
}
let totalFishes = numFishes.reduce((prev, curr) => prev + curr);
console.log(`total fishes ${totalFishes}`);
// console.log(`Number of fish after ${numIterationsPart2}: ${agesPart2.length}`);
*/

// another twist...
/*let spawnFrequency = 8;

console.log(`With ${numIterationsPart2} iterations`);

// First age the initial fishes

let numSpawned = 0;
agesPart2.forEach((age) => {
	let [finalAge, spawnedCount] = ageFish(age, numIterationsPart2);
	numSpawned += spawnedCount;
	console.log(`Age: initial = ${age} final = ${finalAge}, spawned: ${spawnedCount}`);
});

console.log(`numSpawned ${numSpawned}`);
// let [_, spawnedSpawn] = ageFish(8, numIterationsPart2)

function ageFish(age, numIterations) {
		let spawnedCount = 0;
		for(let j = 0; j < numIterations; j++) {
			if(age === 0) {
				age = 6;
				spawnedCount++;
			} else {
				age--;
			}
		}

	return [age, spawnedCount];
}
*/

let fishesToAge = [];
ages.forEach(age => {
	fishesToAge.push({ age: age, created: 0 });
});

let fishes = fishesToAge.concat(); // slice(0, 1);
let finalFishesCount = 0;

while(fishes.length > 0) {
	console.log(`Number fishes: ${fishes.length}`);
	let fish = fishes.shift();
	let age = fish.age;
	
	for(let i = 0; i < numIterationsPart2; i++) {
		if(fish.created <= i) {

			if(age === 0) {
				age = 6;
				console.log('Fish spawned');
				fishes.push({ age: 8, created: i });
			} else {
				age--;
			}
		} 
	}

	finalFishesCount++;
}

console.log('Finally', finalFishesCount);


function parseInput(input) {
	let values = input.split(',')
		.filter(v => v.length > 0)
		.map(v => Number(v));

	return values;
}

function iterate(ages, numIterations) {
	let newAges = ages.concat();
	for(let i = 0; i < numIterations; i++) {
		let numEls = newAges.length;
		for(let j = 0; j < numEls; j++) {
			let e = newAges[j];
			
			if(e === 0) {
				newAges[j] = 6;
				newAges.push(8); // The spawn
			} else {
				newAges[j] = e - 1;
			}
		};
	}
	return newAges;
}
