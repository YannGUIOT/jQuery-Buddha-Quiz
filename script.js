$(document).ready(function() {
  // GAME STATE
  let isStart = false;
  let nbGoodAnswers;
  let currentQuestionIndex;
  let shuffleTab = [];

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

  // OPTIONS
  const options = (func, tps) => {
    optionElements.forEach((option) => {
      option[func](tps);
    });
  }

  // INIT PAGE
  $nextBtn.text('Start Quiz');
  $question.hide();
  $more.text('Bienvenue dans le Buddha Quiz, clique sur le boutton START QUIZ pour te mesurer aux connaissances du Buddha !');
  options('hide');

  // DISPLAY QUESTION
  const displayQuestion = (index) => {

    const question = quiz[shuffleTab[index]-1];

    cleanDisplays();
    $nextBtn.text('Suivant');
    $nextBtn.hide();
    $question.show();
    $question.text(question.question);

    for (let i = 0; i < optionElements.length; i++) {
      optionElements[i].html(`<label><input type="radio" name="answer" value="${question.options[i]}"> ${question.options[i]}</label>`);
    }
    options('fadeToggle', 700);

    // ANSWER MANAGEMENT
    const $input = $('input[name="answer"]');
    $input.change(function() {
      const selectedOption = $(this).val();
      options('fadeToggle', 700);
      if (selectedOption === question.answer) {
        $goodAnswer.text("BRAVO !");
        nbGoodAnswers++;
      } else {
        $badAnswer.text("RATÉ");
      }
      $('.more').text(question.more);
      $nextBtn.show();
    });    
  }

  // BUTTON MANAGEMENT
  $nextBtn.on('click', () => {
    if(( !isStart )||(currentQuestionIndex == quiz.length)) {
      initQuiz();
    } else {
      cleanDisplays();
      currentQuestionIndex++;
      if (currentQuestionIndex < quiz.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        showFinalScore();
      }
    }
  });

  // INIT QUIZ 
  const initQuiz = () => {
    currentQuestionIndex = 0;
    nbGoodAnswers = 0;
    isStart = true;
    shuffleQuiz();
    displayQuestion(currentQuestionIndex);
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

  // SHUFFLE QUIZ 
  const shuffleQuiz = () => {
    for (let i = 0; i < quiz.length; i++) {
      shuffleTab.push(i + 1);
    }
    for (let i = shuffleTab.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffleTab[i], shuffleTab[j]] = [shuffleTab[j], shuffleTab[i]];
    }
  }

});


// QUIZ DATAS

const quiz = [
  {
    "question": "Quelle est l'origine de nos souffrances ?",
    "options": ["L'Orgueil", "La Paresse", "Le Déni", "Le Jugement"],
    "answer": "L'Orgueil",
    "more": "L'Orgueil c'est 'Je voudrais que'. Dès lors que la situation n'est pas comme 'Je voudrais', je n'accepte pas la situation et souffre de mon propre orgueil."
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
  },
  {
    "question": "Quelle est la couleur du chakra du Coeur ?",
    "options": ["Rouge", "Vert", "Rose", "Violet"],
    "answer": "Vert",
    "more": "La couleur du chakra du Coeur, Anahata en sanscrit, est Vert."
  },
  {
    "question": "Quelle est la couleur du chakra de la Gorge ?",
    "options": ["Marron", "Indigo", "Bleu Ciel", "Jaune"],
    "answer": "Bleu Ciel",
    "more": "La couleur du chakra de la Gorge, Vishuddha en sanscrit, est Bleu Ciel."
  },
  {
    "question": "Quelle est la couleur du chakra du 3ème Oeil ?",
    "options": ["Indigo", "Pastel", "Mauve", "Noir"],
    "answer": "Indigo",
    "more": "La couleur du chakra du 3ème Oeil, Ajna en sanscrit, est Indigo."
  },
  {
    "question": "Quelle est la couleur du chakra Coronal ?",
    "options": ["Or", "Blanc Crème", "Argent", "Blanc/Mauve"],
    "answer": "Blanc/Mauve",
    "more": "La couleur du chakra Coronal, Sahasrara en sanscrit, est Blanc/Mauve."
  },
  {
    "question": "Qu'est-ce qui permet l'éveil ?",
    "options": ["L'alarme du réveil", "Le Café", "La Connaissance", "Les Psychotropes"],
    "answer": "La Connaissance",
    "more": "Seul la connaissance permet l'éveil."
  },
  {
    "question": "Lorsque la Colère et la Souffrance cessent, ils laissent la place à ?",
    "options": ["La Rancoeur", "L'Opulence", "La Paix et la Sérénité", "la Prospérité"],
    "answer": "La Paix et la Sérénité",
    "more": "Lorsque la Colère et la Souffrance cessent, ils laissent la place à la Paix et la Sérénité."
  }
];

