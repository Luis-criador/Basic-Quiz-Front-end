const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    // Perguntas HTML
    {
      question: "Qual das opções a seguir é a forma correta de adicionar uma imagem em uma página HTML?",
      choice1: '<img src="imagem.jpg" alt="Imagem exemplo">',
      choice2: '<image src="imagem.jpg" alt="Imagem exemplo">',
      choice3: '<img href="imagem.jpg" alt="Imagem exemplo">',
      choice4: '<img src="imagem.jpg" title="Imagem exemplo">',
      answer: 1
    },
    {
      question: "Qual das opções a seguir cria uma lista ordenada corretamente em HTML?",
      choice1: `<ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>`,
      choice2: `<list>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </list>`,
      choice3: `<ol>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ol>`,
      choice4: `<ordered>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ordered>`,
      answer: 3
    },
    {
      question: "Qual das opções abaixo insere corretamente um título de nível 1 em HTML?",
      choice1: "<title>Este é um título</title>",
      choice2: "<h1>Este é um título</h1>",
      choice3: "<header1>Este é um título</header1>",
      choice4: "<head>Este é um título</head>",
      answer: 2
    },
    {
      question: "Quais Tag informa ao navegador onde a página começa e para?",
      choice1: "<head>",
      choice2: "<title>",
      choice3: "<body>",
      choice4: "<html>",
      answer: 4
    },
    {
      question: "Qual dos seguintes atributos HTML é usado para definir estilo em linha?",
      choice1: "class",
      choice2: "style",
      choice3: "type",
      choice4: "Nenhum dos itens acima",
      answer: 2
    },
    {
      question: "O que são as tags HTML?",
      choice1: "Elementos usados para aplicar estilos ao texto.",
      choice2: "Comentários que não são visíveis na página da web.",
      choice3: "São usadas para estruturar o conteúdo de um documento, para formatar o texto, para adicionar imagens e outros elementos, etc.",
      choice4: "São marcadores que definem a aparência visual do conteúdo e determinam o layout da página, como se fosse uma folha de estilo.",
      answer: 3
    },
    {
      question: "Qual é o papel de um formulário em HTML?",
      choice1: "Criar campos interativos para os usuários preencherem e enviarem dados para o servidor, como nome, email e senha.",
      choice2: "Definir a aparência da página, incluindo fontes, cores e espaçamentos de texto.",
      choice3: "Estruturar o conteúdo da página, organizando os parágrafos, listas e cabeçalhos de forma hierárquica.",
      choice4: "Criar links para navegar entre diferentes páginas da web sem carregar o conteúdo da página atual.",
      answer: 1
    },
  
    // Perguntas CSS
    {
      question: "A propriedade no CSS usada para alterar a cor de fundo de um elemento é?",
      choice1: "bgcolor",
      choice2: "color",
      choice3: "background-color",
      choice4: "Todos itens acima",
      answer: 3
    },
    {
      question: "O que é um 'framework' CSS?",
      choice1: "Um framework CSS é uma biblioteca de scripts em JavaScript que oferece funcionalidades para manipular elementos HTML dinamicamente.",
      choice2: "Um framework CSS é um conjunto de ferramentas e bibliotecas pré-definidas que ajudam a criar layouts responsivos e consistentes.",
      choice3: "Um framework CSS é um sistema de arquivos de imagem e ícones prontos para serem usados diretamente em uma página web.",
      choice4: "Um framework CSS é um conjunto de técnicas de otimização de desempenho de páginas web.",
      answer: 2
    },
    {
      question: "Qual alternativa abaixo descreve corretamente uma das principais vantagens de usar o Bootstrap no desenvolvimento de páginas web?",
      choice1: "O Bootstrap permite a criação de sites responsivos sem a necessidade de escrever código HTML.",
      choice2: "O Bootstrap é um framework apenas para estilizar os elementos de texto de uma página.",
      choice3: "O Bootstrap é um framework que otimiza o carregamento de imagens em uma página web.",
      choice4: "O Bootstrap oferece uma estrutura de componentes prontos e um sistema de grid flexível.",
      answer: 4
    },
    {
      question: "Qual das seguintes propriedades é usada como propriedade de preenchimento?",
      choice1: "padding",
      choice2: "margin",
      choice3: "weight",
      choice4: "Nenhum dos itens acima",
      answer: 1
    },
    {
      question: `Qual dos seguintes códigos CSS corretamente centraliza um bloco de conteúdo horizontal e verticalmente dentro de seu contêiner pai?`,
      choice1: `display: block;
                margin: 0 auto;
                text-align: center;`,
      choice2: `display: flex;
                justify-content: center;
                align-items: center;`,
      choice3: `position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);`,
      choice4: `display: inline-block;
                vertical-align: middle;
                text-align: center;`,
      answer: 2
    },
    {
      question: `Dado o código:
                .box { 
                    width: 200px;
                    aspect-ratio: 16 / 9;
                    background: coral;
                }

         Qual será o comportamento do elemento?`
      ,
      choice1: "Ele terá largura de 200px e altura ajustada para manter a proporção de 16:9.",
      choice2: "Ele terá largura de 16px e altura de 9px.",
      choice3: "Ele ignorará o aspect-ratio e terá altura e largura padrão.",
      choice4: "Ele será quadrado, porque o navegador ajusta proporcionalmente ambos os lados.",
      answer: 1
    },
    {
      question: `Dado o código:
                .div {
                 margin: initial;
                 }

       O que acontece com a margem da .div?`,
      choice1: "É completamente removida.",
      choice2: "Volta ao valor padrão do navegador.",
      choice3: "Adota o valor inherit do pai.",
      choice4: "Lança um erro no navegador.",
      answer: 2
    },
  
    // Perguntas JavaScript
    {
      question: "O operador '===' compara tudo. Qual desses daria true?",
      choice1: "if (true === true)",
      choice2: "if (true === '1')",
      choice3: "if (true === 'true')",
      choice4: "if (true === troe)",
      answer: 1
    },
    {
      question: "O innerHTML é uma propriedade do Element que permite...",
      choice1: "Localizar e alterar o conteúdo",
      choice2: "Definir e modificar o conteúdo",
      choice3: "Definir ou obter o conteúdo",
      choice4: "Obter ou modificar o conteúdo",
      answer: 3
    },
    {
      question: "Qual é a principal diferença entre undefined e null?",
      choice1: "Ambos são equivalentes.",
      choice2: "undefined representa ausência de valor; null representa valor intencionalmente vazio.",
      choice3: "undefined é um objeto, e null é um número.",
      choice4: "null é usado apenas em strings.",
      answer: 2
    },
    {
      question: "Qual é a saída de [1, 2, 3].map(x => x * 2)?",
      choice1: "[2, 4, 6]",
      choice2: "[1, 2, 3]",
      choice3: "[1, 4, 9]",
      choice4: "Um erro será lançado",
      answer: 1
    },
    {
      question: "Qual é o comando para exibir algo no console do navegador?",
      choice1: "print()",
      choice2: "log()",
      choice3: "console.log()",
      choice4: "write()",
      answer: 3
    },
    {
      question: `Qual é a saída do código abaixo? 

        let x = 10;
        let y = (x++, x + 1, x * 2);
        console.log(y);`,
      choice1: "11",
      choice2: "12",
      choice3: "20",
      choice4: "22",
      answer: 4
    }
  ];
  
  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
    if (questionCounter >= MAX_QUESTIONS || questionCounter >= questions.length) {
      // Vai para a página de finalização
      return window.location.assign("/end.html");
    }
    
    currentQuestion = questions[questionCounter];
    questionCounter++;
  
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Atualiza a barra de progresso
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
    // Define a pergunta e as alternativas
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });
  
    acceptingAnswers = true;
  };
  

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();