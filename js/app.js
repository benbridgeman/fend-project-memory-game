// Deck and Cards
const deck = document.querySelector('.deck');
const cards = Array.from(deck.children);
let firstCard;
let secondCard;
let cardCount = 0;

// Restart button
const restart = document.querySelector('.restart');
// Click event to restart button
restart.addEventListener('click', function () {
	shuffle(cards);
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
	if (target.className === 'card') {
		target.classList.add('open', 'show');
		// Increase cardCount
		cardCount += 1;
		if (cardCount === 1) {
			firstCard = target;
		}
		if (cardCount === 2) {
			secondCard = target;
			cardCount = 0;
		}
	}
});

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
