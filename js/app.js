var fields;
var field1, field2, field3, field4, field5, field6, field7, field8, field9;

//============= Buttons and Pop ups =======================

var playSpace = document.querySelector('.playspace');
var resetBtn = document.querySelector('.resetBtn');
var xBtn = document.querySelector('#X');
var oBtn = document.querySelector('#O');
var modal2 = document.querySelector('.modal2');
var modal = document.querySelector('.modal');

//============= Player 1 =======================
var p1Wins = 0;
var p1WinsText = document.querySelector('#p1wins');

//============= Player 2 =======================
var p2Wins = 0;
var p2WinsText = document.querySelector('#p2wins');

//============= Game Manager =======================
var count = 0;
var winner = false;
var turn;

updateHTML();

// ========================= CHOOSE FIRST PLAYER ================================
xBtn.addEventListener('click', () => {
	chooseFirstPlayer(0);
	play();
});

oBtn.addEventListener('click', () => {
	chooseFirstPlayer(1);
	play();
});

// ========================= ADDING EVENT LISTENERS ON ALL FIELDS ================================

function play() {
	fields.forEach(function(field) {
		field.addEventListener('click', function clickFx() {
			count++;
			if (turn === 0) {
				this.innerHTML = 'X';
				turn = 1;
			} else if (turn === 1) {
				this.innerHTML = 'O';
				turn = 0;
			}
			updateHTML();
			makeRules(this);
			this.removeEventListener('click', clickFx, false);
			checkIfDraw();
		});
	});
}

// ========================= PLAY AGAIN ================================

resetBtn.addEventListener('click', () => {
	playAgain();
});

function playAgain() {
	winner = false;
	count = 0;
	fields.forEach(function(field) {
		field.innerHTML = '';
		var el = field,
			elClone = el.cloneNode(true);
		el.parentNode.replaceChild(elClone, el);
	});
	if (turn === 0) {
		turn = 1;
	} else {
		turn = 0;
	}
	updateHTML();
	hideModal();
	play();
}

// ========================= MAKING LOGIC AND RULES ================================

function makeRules(field) {
	switch (field.id) {
		case 'field1':
			arguments = [ field2, field3, field4, field7, field5, field9 ];
			checkWhoWins(field1, arguments);
			break;

		case 'field2':
			arguments = [ field1, field3, field5, field8 ];
			checkWhoWins(field2, arguments);
			break;

		case 'field3':
			arguments = [ field2, field1, field6, field9, field5, field7 ];
			checkWhoWins(field3, arguments);
			break;

		case 'field4':
			arguments = [ field5, field6, field1, field7 ];
			checkWhoWins(field4, arguments);
			break;

		case 'field5':
			arguments = [ field4, field6, field2, field8, field1, field9, field3, field7 ];
			checkWhoWins(field5, arguments);
			break;

		case 'field6':
			arguments = [ field5, field4, field3, field9 ];
			checkWhoWins(field6, arguments);
			break;
		case 'field7':
			arguments = [ field8, field9, field4, field1, field5, field3 ];
			checkWhoWins(field7, arguments);
			break;
		case 'field8':
			arguments = [ field7, field9, field5, field2 ];
			checkWhoWins(field8, arguments);
			break;
		case 'field9':
			arguments = [ field8, field7, field6, field3, field5, field1 ];
			checkWhoWins(field9, arguments);
			break;
	}

	function checkWhoWins(str, arr) {
		var letter = checkField(str, arr);
		winGame(letter);
	}
}

// ========================= SOME FUNCTIONS ================================

function displayModal() {
	modal.style.opacity = '1';
	modal.style.zIndex = '9999';
}

function hideModal() {
	modal.style.opacity = '0';
	modal.style.zIndex = '-1';
}

function chooseFirstPlayer(num) {
	turn = num;
	playSpace.style.opacity = '1';
	modal2.style.opacity = '0';
	modal2.style.zIndex = '-1';
}

function checkIfDraw() {
	if (count === 9 && winner === false) {
		document.querySelector('h1').innerHTML = 'Draw';
		p1WinsText.innerHTML = p1Wins;
		p2WinsText.innerHTML = p2Wins;
		displayModal();
	}
}

// ========================= WINNING GAME ================================

function winGame(letter) {
	if (letter !== undefined) {
		winner = true;
		if (letter === 'X') {
			p1Wins++;
			document.querySelector('h1').innerHTML = 'Player 1 wins!';
			p1WinsText.innerHTML = p1Wins;
			displayModal();
		} else if (letter === 'O') {
			p2Wins++;
			document.querySelector('h1').innerHTML = 'Player 2 wins!';
			p2WinsText.innerHTML = p2Wins;
			displayModal();
		}
	}
}

// ========================= CHECKING OTHER FIELDS ================================

function checkField(letter, fields) {
	if (fields.length === 8) {
		if (
			(fields[0] === letter && fields[1] === letter) ||
			(fields[2] === letter && fields[3] === letter) ||
			(fields[4] === letter && fields[5] === letter) ||
			(fields[6] === letter && fields[7] === letter)
		) {
			return letter;
		}
	}
	if (fields.length === 6) {
		if (
			(fields[0] === letter && fields[1] === letter) ||
			(fields[2] === letter && fields[3] === letter) ||
			(fields[4] === letter && fields[5] === letter)
		) {
			return letter;
		}
	}
	if (fields.length === 4) {
		if ((fields[0] === letter && fields[1] === letter) || (fields[2] === letter && fields[3] === letter)) {
			return letter;
		}
	}
}

function updateHTML() {
	fields = document.querySelectorAll('.playspace div');
	field1 = document.querySelector('#field1').innerHTML;
	field2 = document.querySelector('#field2').innerHTML;
	field3 = document.querySelector('#field3').innerHTML;
	field4 = document.querySelector('#field4').innerHTML;
	field5 = document.querySelector('#field5').innerHTML;
	field6 = document.querySelector('#field6').innerHTML;
	field7 = document.querySelector('#field7').innerHTML;
	field8 = document.querySelector('#field8').innerHTML;
	field9 = document.querySelector('#field9').innerHTML;
}
