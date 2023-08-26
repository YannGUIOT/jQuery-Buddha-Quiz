$(document).ready(function() {

   // Cette fonction s'exécute lorsque le document HTML est entièrement chargé

  const quiz = [
    {
      "question": "Quelle est l'origine de toutes nos souffrances ?",
      "options": ["L'Orgueil", "La Paresse", "Le Déni", "Le Jugement"],
      "answer": "L'Orgueil",
      "more": "L'Orgueil c'est 'Je voudrais que', dès lors que la situation n'est pas comme 'Je voudrais', je n'accepte pas la situation et je suis responsable de cette souffrance."
    },
    {
      "question": "Quelle est la couleur du chakra Racine ?",
      "options": ["Marron", "Orange", "Rouge", "Jaune"],
      "answer": "Rouge",
      "more": "La couleur du chakra Racine, dit '!!!!' en sanscrit, est rouge vif."
    },
    {
      "question": "Quelle est la couleur du chakra Sacré ?",
      "options": ["Violet", "Orange", "Bleu", "Vert"],
      "answer": "Orange",
      "more": "La couleur du chakra Sacrée, dit '!!!!' en sanscrit, est Orange vif."
    }
    // Ajoutez d'autres questions ici
  ];

  let currentQuestionIndex = 0;
  const questions = quiz; // Assignez votre tableau de questions ici

  function displayQuestion(index) {
    const question = questions[index];
    $('.question').text(question.question);
    
    const optionsHtml = question.options.map(option => {
      return `<label><input type="radio" name="answer" value="${option}"> ${option}</label><br>`;
    }).join('');
    $('.options').html(optionsHtml);

    // Ajoutez un gestionnaire d'événements pour les options de réponse
    $('input[name="answer"]').change(function() {
      const selectedOption = $(this).val();
      if (selectedOption === question.answer) {
        $('.result-info').text("BRAVO !");
      } else {
        $('.result-info').text("MAUVAISE RÉPONSE ! c'était " + question.answer + " !");
      }
      $('.more-info').text(question.more);
    });
  }

  $('.next-btn').click(function() {
    // Cette fonction est déclenchée lorsque le bouton "Suivant" est cliqué

    currentQuestionIndex++;

    $('.result-info').text('');
    $('.more-info').text('');

    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      $('.quiz-container').html('<p>Quiz terminé !</p>');
    }
  });

  // Affichez la première question au chargement de la page
  displayQuestion(currentQuestionIndex);
});
