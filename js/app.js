// Game Start
let begin = false;

// Deck and Cards
const deck = document.querySelector('.deck');
const cards = Array.from(deck.children);
let firstCard;
let secondCard;
let cardCount = 0;

// Timer
let timer;
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
// Simple timer function
function gameTimer() {
	timer = setInterval(function () {
		seconds.textContent++;
		if (seconds.textContent < 10) {
			seconds.textContent = '0' + seconds.textContent;
		}
		if (seconds.textContent == 60) {
			seconds.textContent = 0;
			minutes.textContent++;
			if (minutes.textContent < 10) {
				minutes.textContent = '0' + minutes.textContent;
			}
		}
	}, 1000);
}

// Star rating
const starRating = document.querySelector('.stars');
const stars = Array.from(starRating.children);
// Function to remove stars based on moves
function assignStars() {
	if (moves.textContent == 16) {
		stars[2].classList.add('hide');
	}
	if (moves.textContent == 22) {
		stars[1].classList.add('hide');
	}
}

// Moves counter
let moves = document.querySelector('.moves');

// Restart button
const restart = document.querySelector('.restart');
// Click event to restart button
restart.addEventListener('click', function () {
	// Stop and reset timer
	clearInterval(timer);
	seconds.textContent = '00';
	minutes.textContent = '00';
	begin = false;
	// Reset moves counter
	moves.textContent = 0;
	// Loop through stars array and reset class list to default
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
});

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
