// Require the nmp inquirer package
var inquirer = require('inquirer');

// Importing the flash cards constructor implementations
var flashCards = require('./ClozeCard.js');
// Importing the full list of quiz questions
var questions = require('./QuizQuestions.js').questions;

// Variable that holds the cloze-deleted questions list
var closeQuestions = [];

// Populating the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
	var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
	closeQuestions.push(q);
}

// What question the user is currently answering
var currentQuestion = 0;
// Showing correct answers
var answerRight = 0;
// Showing wrong answers
var answerWrong = 0;

// askQuestion is prompting the user to answer a given cloze-deleted question
function askQuestion() {
	inquirer.prompt([
		{
			type: 'input',
			message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
			name: 'userGuess'
		}
	]).then(function (answers) {
		console.log('\n');

		// Checking if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
			console.log('Correct!');
			answerRight++;
		} else {
			console.log('Incorrect!');
			answerWrong++;
		}

		// Showing the correct answer
		console.log(closeQuestions[currentQuestion].full);
		console.log('---------------------------------------------------------\n');

		// Going to the next question
		if (currentQuestion < closeQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('The quiz is over now');
			console.log('You answered ' + answerRight + ' questions correctly');
			console.log('You answered ' + answerWrong + ' questions incorrectly');

			console.log('---------------------------------------------------------\n');

			// Prompting the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Do you want to play again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
					// Resetting the quiz
					currentQuestion = 0;
					answerRight = 0;
					answerWrong = 0;

					// Starts the quiz
					askQuestion();
				} else {
					// Quitting the quiz
					console.log('Thank you for taking the quiz - have a great day!');
				}
			})
		}
	})
}

// Starts the quiz
askQuestion();