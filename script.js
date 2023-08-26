

$(document).ready(function() {  // fonction éxécutée après le chargement du document HTML

  let isStart = false;
  let currentQuestionIndex = 0;
  const questions = quiz;
  const nbQuestions = questions.length;
  let nbGoodAnswers = 0;

  $('.next-btn').text('Start Quiz');

  const displayQuestion = (index) => {

    $('.next-btn').hide();

    const question = questions[index];
    $('.question').text(question.question);
    
    const optionsHtml = question.options.map(option => {
      return `<label><input type="radio" name="answer" value="${option}"> ${option}</label><br>`;
    }).join('');
    $('.options').html(optionsHtml);

    //** ANSWERS GESTION **//
    $('input[name="answer"]').change(function() {
      $('.options').html('');
      const selectedOption = $(this).val();
      if (selectedOption === question.answer) {
        $('.result').text("BRAVO !");
        nbGoodAnswers++;
      } else {
        $('.result').text("RATÉ !");
      }
      $('.more').text(question.more);
      $('.next-btn').show();
    });    
  }

  //** BUTTON GESTION **//
  $('.next-btn').click(function() {

    if((isStart == false) || (currentQuestionIndex == questions.length)) { 
      let currentQuestionIndex = 0;
      isStart = true;
      $('.next-btn').text('Suivant');
      cleanAllDisplay();
      displayQuestion(currentQuestionIndex);

    } else {

      currentQuestionIndex++;

      cleanAllDisplay();

      if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        const note = ((nbGoodAnswers / nbQuestions)*100).toFixed();
        const finish = `
          <p>Q U I Z &nbsp; T E R M I N É &nbsp; !</p>
          <p>Résultat: &nbsp;<strong>${note} %</strong></p>
          <p>${nbGoodAnswers} / ${nbQuestions}</p>
        `;
        $('.question').text('');
        $('.result').html(finish);
        $('.next-btn').text('Recommencer');
      }
    }
  });

  const cleanAllDisplay = () => {
    $('.question').text('');
    $('.options').html('');
    $('.result').text('');
    $('.more').text('');
  }
  
});


//** QUIZ DATAS **/

const quiz = [
  {
    "question": "Quelle est l'origine de toutes nos souffrances ?",
    "options": ["L'Orgueil", "La Paresse", "Le Déni", "Le Jugement"],
    "answer": "L'Orgueil",
    "more": "L'Orgueil c'est 'JE voudrais que'. Dès lors que la situation n'est pas comme 'JE voudrais', je n'accepte pas la situation et je suis responsable de cette souffrance."
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