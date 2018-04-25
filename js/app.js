// Game start and end
let begin = false;
let complete = false;
const victoryScreen = document.querySelector('.victoryScreen');

// Deck and Cards
const deck = document.querySelector('.deck');
const cards = Array.from(deck.children);
let firstCard;
let secondCard;
let cardCount = 0;

// Timer
let timer;
let stopwatch = document.querySelector('.stopwatch');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
// Simple timer function
function gameTimer() {
	timer = setInterval(function () {
		seconds.textContent++;
		if (seconds.textContent == 60) {
			seconds.textContent = 0;
			minutes.textContent++;
		}
	}, 1000);
}

// Star rating
const starRating = document.querySelector('.stars');
let stars = Array.from(starRating.children);
// Function to remove stars based on moves
function assignStars() {
	if (moves.textContent == 16 && stars.length == 3) {
		stars[2].className = 'hide';
		stars.pop();
	}
	if (moves.textContent == 22 && stars.length == 2) {
		stars[1].className = 'hide';
		stars.pop();
	}
}

// Moves counter
let moves = document.querySelector('.moves');

// Restart button
const restart = document.querySelector('.restart');
// Click event to restart button
restart.addEventListener('click', function () {
	reset();
});
// Reset function
function reset() {
	// Stop and reset timer
	clearInterval(timer);
	seconds.textContent = '0';
	minutes.textContent = '0';
	begin = false;
	// Reset scoreBox content
	victoryScreen.classList.replace('bounceInDown', 'bounceOutUp');
	setTimeout(function () {
		victoryScreen.className = 'victoryScreen';
		victoryScreen.firstElementChild.innerHTML = "";
	}, 900);
	// Reset moves counter
	moves.textContent = 0;
	// Loop through stars array and reset class list to default
	stars = Array.from(starRating.children);
	stars.forEach(function (star) {
		star.classList.remove('hide');
	});
	// Loop through cards array and reset class list to default
	cards.forEach(function (card) {
		card.className = 'card';
	});
	// Time out shuffle to allow animations to end
	setTimeout(function () {
		shuffle(cards);
	}, 300);
}

// Call cards into shuffle
shuffle(cards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	for (i = 0; i < cards.length; i++) {
		deck.appendChild(cards[i]);
	}

	return array;
}

// Click event to flip card
document.addEventListener('click', function ({ target }) {
	if (target.className === 'card' && cardCount <= 1) {
		target.classList.add('open', 'show');
		// Start game timer
		if (!begin) {
			gameTimer();
			begin = true;
		}
		// Increase cardCount
		cardCount += 1;
		// When the first card is selected
		if (cardCount === 1) {
			firstCard = target;
		}
		// When the second card is selected
		if (cardCount === 2) {
			secondCard = target;
			moves.textContent++;
			match();
			// Time out to avoid selecting more than 2 cards at once
			setTimeout(function () {
				cardCount = 0;
			}, 1500);
		}
		// Call assingStars based on number of moves
		if (moves.textContent == 16) {
			assignStars();
		}
		if (moves.textContent == 22) {
			assignStars();
		}
	}
});

// Match function
function match() {
	// setTimout to delay animations
	setTimeout(function () {
		if (
			firstCard.firstElementChild.className ==
			secondCard.firstElementChild.className) {
			firstCard.className = 'card match rubberBand';
			secondCard.className = 'card match rubberBand';
			// Call gameComplete to check if all cards match
			gameComplete();
		} else {
			firstCard.classList.add('shake');
			secondCard.classList.add('shake');
			// setTimeout for animations to complete before removing classes
			setTimeout(function () {
				firstCard.className = 'card';
				secondCard.className = 'card';
			}, 800);
		}
	}, 500);
}

// Check to see if all cards are matched
function gameComplete() {
	let matching = 0;
	cards.forEach(function (card) {
		if (card.className == 'card match rubberBand') {
			matching++;
		}
	});
	if (matching == 16) {
		complete = true;
		clearInterval(timer);
		if (complete) {
			setTimeout(function () {
				victoryScreen.classList.add('bounceInDown');
				scores();
			}, 800);
		}
	} else {
		return matching;
	}
}

// Add scores to victory screen
const scoreBox = document.querySelector('.scoreBox');
let restartGame;
function scores() {
	// Well done header
	const wellDone = document.createElement('h1');
	wellDone.textContent = 'Well Done!';
	scoreBox.appendChild(wellDone);
	// Add time
	setTimeout(function () {
		const timeStamp = document.createElement('p');
		timeStamp.className = 'timeScore rubberBand'
		if (minutes.textContent == '0') {
			timeStamp.textContent = 'Round completed in ' + seconds.parentElement.innerText;
		} else {
			timeStamp.textContent = 'Round completed in ' + stopwatch.innerText;
		}
		scoreBox.appendChild(timeStamp);
	}, 1000);

	// Add moves
	setTimeout(function () {
		const moveScore = document.createElement('p');
		moveScore.className = 'moveScore rubberBand'
		moveScore.textContent = 'You completed in ' + moves.textContent + ' moves, earning you ' + stars.length + ' stars';
		scoreBox.appendChild(moveScore);
	}, 1500);

	// Add stars
	setTimeout(function () {
		const starUl = document.createElement('ul');
		starUl.className = 'starScore rubberBand';
		for (i = 0; i < stars.length; i++) {
			const starLi = document.createElement('li');
			starLi.className = 'fa fa-star';
			starUl.appendChild(starLi);
		}
		scoreBox.appendChild(starUl);
	}, 2000);

	// Play again
	setTimeout(function () {
		let playAgain = document.createElement('div');
		playAgain.className = 'restartGame rubberBand';
		let restart = document.createElement('i');
		restart.className = 'fa fa-repeat largerFont';
		playAgain.appendChild(restart);
		scoreBox.appendChild(playAgain);
		restartGame = document.querySelector('.restartGame');
		restartGame.addEventListener('click', function () {
			reset();
		});
	}, 2500);
}
