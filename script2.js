// SELECTORS
const $question = $('.question');
const $option1 = $('.option1'); 
const $option2 = $('.option2');
// etc...
const $nextBtn = $('.next-btn');
const $feedback = $('.feedback');

// QUIZ DATA
const quiz = [
  {
    question: "Question 1",
    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: "Answer 2" 
  },
  {
   //... other questions 
  }
];

// GAME STATE
let currentQuestionIndex = 0;
let score = 0;

// DISPLAY QUESTION
function displayQuestion(index) {
  // Clear previous question
  clearQuestion();

  // Display question text
  $question.text(quiz[index].question);

  // Generate options
  generateOptions(quiz[index]);

  // Show elements
  $question.show();
  $nextBtn.show();
}

// CLEAR QUESTION
function clearQuestion() {
  $question.hide();
  $option1.text('');
  // Clear other options
  $feedback.text('');
}

// GENERATE OPTIONS
function generateOptions(question) {
  $option1.text(question.options[0]); 
  $option2.text(question.options[1]);
  // ...
}

// NEXT BUTTON CLICK
$nextBtn.on('click', () => {
  
  // Check if last question
  if(currentQuestionIndex === quiz.length - 1) {
    showFinalScore();
    return;
  }

  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
});

// SHOW FINAL SCORE
function showFinalScore() {
  $question.text(`Quiz terminé ! Votre score est de ${score} points.`);
  $nextBtn.text('Rejouer');
}

// RESET QUIZ 
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  clearQuestion();
  $nextBtn.text('Commencer le quiz');
}

// START QUIZ
resetQuiz();

$nextBtn.on('click', () => {
  displayQuestion(0);
});
