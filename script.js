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

  // FUNCTION DISPLAY QUESTION
  const displayQuestion = (index) => {

    cleanAllDisplay();
    cleanOptions();

    $nextBtn.text('Suivant');
    $nextBtn.hide();

    $question.show();
    $question.text(quiz[index].question);

    $option1.html(`<label><input type="radio" name="answer" value="${quiz[index].options[0]}"> ${quiz[index].options[0]}</label>`);
    $option2.html(`<label><input type="radio" name="answer" value="${quiz[index].options[1]}"> ${quiz[index].options[1]}</label>`);
    $option3.html(`<label><input type="radio" name="answer" value="${quiz[index].options[2]}"> ${quiz[index].options[2]}</label>`);
    $option4.html(`<label><input type="radio" name="answer" value="${quiz[index].options[3]}"> ${quiz[index].options[3]}</label>`);


    //** ANSWERS GESTION **//
    $('input[name="answer"]').change(function() {
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

  //** BUTTON GESTION **//
  $nextBtn.on('click', () => {

    if( !isStart || (currentQuestionIndex == quiz.length)) { 
      currentQuestionIndex = 0;
      nbGoodAnswers = 0;
      isStart = true;
      displayQuestion(currentQuestionIndex);

    } else {

      currentQuestionIndex++;

      cleanAllDisplay();

      if (currentQuestionIndex < quiz.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        showFinalScore();
      }
    }
  });

  const cleanAllDisplay = () => {
    $question.text('');
    $more.text('');
    $badAnswer.text('');
    $goodAnswer.text('');
  }

  const cleanOptions = () => {
    $option1.text('');
    $option2.text('');
    $option3.text('');
    $option4.text('');
  }

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

  // RESET QUIZ 
  const resetQuiz = () => {
    currentQuestionIndex = 0;
    nbGoodAnswers = 0;
    cleanAllDisplay();
    cleanOptions();
    $question.hide();
  }

  const initQuiz = () => {
    currentQuestionIndex = 0;
    nbGoodAnswers = 0;
    $nextBtn.text('Start Quiz');
    $question.hide();
    $more.text('Bienvenue dans le Buddha Quiz, clique sur le boutton START QUIZ pour te mesurer aux connaissances du Buddha !');
  }

  // START QUIZ
  initQuiz();
});


//** QUIZ DATAS **/

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

