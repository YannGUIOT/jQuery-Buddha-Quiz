

$(document).ready(function() {  // fonction éxécutée après le chargement du document HTML

  let isStart = false;
  let currentQuestionIndex = 0;
  const questions = quiz;
  const nbQuestions = questions.length;
  let nbGoodAnswers = 0;

  $('.next-btn').text('Start Quiz');
  $('.question').hide();

  const displayQuestion = (index) => {

    cleanAllDisplay();
    cleanOptions();

    $('.next-btn').text('Suivant');
    $('.next-btn').hide();
    $('.question').show();

    const question = questions[index];
    $('.question').text(question.question);

    $('.option1').html(`<label><input type="radio" name="answer" value="${question.options[0]}"> ${question.options[0]}</label>`);
    $('.option2').html(`<label><input type="radio" name="answer" value="${question.options[1]}"> ${question.options[1]}</label>`);
    $('.option3').html(`<label><input type="radio" name="answer" value="${question.options[2]}"> ${question.options[2]}</label>`);
    $('.option4').html(`<label><input type="radio" name="answer" value="${question.options[3]}"> ${question.options[3]}</label>`);


    //** ANSWERS GESTION **//
    $('input[name="answer"]').change(function() {
      const selectedOption = $(this).val();
      cleanOptions();
      if (selectedOption === question.answer) {
        $('.goodAnswer').text(question.answer);
        $('.result').text("BRAVO !");
        nbGoodAnswers++;
      } else {
        $('.badAnswer').text(selectedOption);
        $('.result').text("RATÉ !");
      }
      $('.more').text(question.more);
      $('.next-btn').show();
    });    
  }

  //** BUTTON GESTION **//
  $('.next-btn').click(function() {

    if((isStart == false) || (currentQuestionIndex == questions.length)) { 
      currentQuestionIndex = 0;
      isStart = true;
      displayQuestion(currentQuestionIndex);

    } else {

      currentQuestionIndex++;

      cleanAllDisplay();

      if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        $('.question').hide();
        const note = ((nbGoodAnswers / nbQuestions)*100).toFixed();
        const score = `
          <p>Réussite: &nbsp;<strong>${note} %</strong></p>
          <p>Bonnes réponses: &nbsp;${nbGoodAnswers} / ${nbQuestions}</p>
        `;
        $('.result').text('Q U I Z - T E R M I N É !');
        $('.more').html(score)
        $('.next-btn').text('Recommencer');
      }
    }
  });

  const cleanAllDisplay = () => {
    $('.question').text('');
    $('.result').text('');
    $('.more').text('');
    $('.badAnswer').text('');
    $('.goodAnswer').text('');
  }

  const cleanOptions = () => {
    $('.option1').html('');
    $('.option2').html('');
    $('.option3').html('');
    $('.option4').html('');
  }
  
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