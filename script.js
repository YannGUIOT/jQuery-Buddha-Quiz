$(document).ready(function() {
  // GAME STATE
  let isStart = false;
  let nbGoodAnswers = 0;
  let currentQuestionIndex = 0;

  // SELECTORS
  const $question = $('.question');
  const $option1 = $('.option1'); 
  const $option2 = $('.option2');
  const $option3 = $('.option3');
  const $option4 = $('.option4');
  const $nextBtn = $('.next-btn');
  const $more = $('.more');
  const $goodAnswer = $('.goodAnswer');
  const $badAnswer = $('.badAnswer');

  const optionElements = [$option1, $option2, $option3, $option4];

  // DISPLAY QUESTION
  const displayQuestion = (index) => {

    cleanDisplays();
    cleanOptions();

    $nextBtn.text('Suivant');
    $nextBtn.hide();

    $question.show();
    $question.text(quiz[index].question);

    for (let i = 0; i < optionElements.length; i++) {
      optionElements[i].html(`<label><input type="radio" name="answer" value="${quiz[index].options[i]}"> ${quiz[index].options[i]}</label>`);
    }

    // ANSWER GESTION
    const $input = $('input[name="answer"]');
    $input.change(function() {
      const selectedOption = $(this).val();
      cleanOptions();
      if (selectedOption === quiz[index].answer) {
        $goodAnswer.text("BRAVO !");
        nbGoodAnswers++;
      } else {
        $badAnswer.text("RATÉ");
      }
      $('.more').text(quiz[index].more);
      $nextBtn.show();
    });    
  }


  // BUTTON GESTION
  $nextBtn.on('click', () => {

    if( !isStart ) {
      initQuiz();
    } else if (currentQuestionIndex == quiz.length) { 
      resetQuiz();
    } else {
      currentQuestionIndex++;
      cleanDisplays();
      if (currentQuestionIndex < quiz.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        showFinalScore();
      }
    }
  });


  // RESET QUIZ 
  const resetQuiz = () => {
    currentQuestionIndex = 0;
    nbGoodAnswers = 0;
    $question.hide();
    displayQuestion(currentQuestionIndex);
  }

  // INIT QUIZ 
  const initQuiz = () => {
    currentQuestionIndex = -1;
    nbGoodAnswers = 0;
    isStart = true;
    $nextBtn.text('Start Quiz');
    $question.hide();
    $more.text('Bienvenue dans le Buddha Quiz, clique sur le boutton START QUIZ pour te mesurer aux connaissances du Buddha !');
  }

  // SHOW FINAL SCORE
  const showFinalScore = () => {
    const note = ((nbGoodAnswers / quiz.length)*100).toFixed();
    const score = `
      <p>Réussite: &nbsp;<strong>${note} %</strong></p>
      <p>Bonnes réponses: &nbsp;${nbGoodAnswers} / ${quiz.length}</p>
    `;
    $question.text('Q U I Z - T E R M I N É !');
    $more.html(score)
    $nextBtn.text('Recommencer');
  }

  // CLEAN DISPLAYS
  const cleanDisplays = () => {
    $question.text('');
    $more.text('');
    $badAnswer.text('');
    $goodAnswer.text('');
  }

  //CLEAN OPTIONS
  const cleanOptions = () => {
    $option1.text('');
    $option2.text('');
    $option3.text('');
    $option4.text('');
  }

  // START QUIZ
  initQuiz();
});


// QUIZ DATAS

const quiz = [
  {
    "question": "Quelle est l'origine de nos souffrances ?",
    "options": ["L'Orgueil", "La Paresse", "Le Déni", "Le Jugement"],
    "answer": "L'Orgueil",
    "more": "L'ORGUEIL c'est => 'JE VOUDRAIS QUE'. Dès lors que la situation n'est pas comme 'JE VOUDRAIS', je n'accepte pas la situation et souffre de mon propre orgueil."
  },
  {
    "question": "Quelle est la couleur du chakra Racine ?",
    "options": ["Marron", "Orange", "Rouge", "Jaune"],
    "answer": "Rouge",
    "more": "La couleur du chakra Racine, Muladhara en sanscrit, est rouge vif."
  },
  {
    "question": "Quelle est la couleur du chakra Sacré ?",
    "options": ["Violet", "Orange", "Bleu", "Vert"],
    "answer": "Orange",
    "more": "La couleur du chakra Sacrée, Svadhisthana en sanscrit, est Orange vif."
  },
  {
    "question": "Quelle est la couleur du chakra du Plexus Solaire ?",
    "options": ["Jaune", "Orange", "Vert", "Indigo"],
    "answer": "Jaune",
    "more": "La couleur du chakra du Plexus Solaire, Manipura en sanscrit, est Jaune vif."
  }
];

