// 퀴즈 문제 데이터
const quizData = [
  {
    question: 'HTML에서 목록을 만들 때 사용하는 태그가 아닌 것은?',
    options: ['ul', 'ol', 'dl', 'ml'],
    answer: 3, // <ml>
    explanation:
      '<ul>은 순서가 없는 목록, <ol>은 순서가 있는 목록, <dl>은 정의 목록을 만드는 태그입니다. <ml>은 존재하지 않는 태그입니다.',
  },
  {
    question: 'CSS에서 요소의 외부 여백을 설정하는 속성은?',
    options: ['padding', 'margin', 'border', 'spacing'],
    answer: 1, // margin
    explanation:
      'margin은 요소의 외부 여백, padding은 요소의 내부 여백, border는 테두리를 설정합니다.',
  },
  {
    question: 'JavaScript에서 변수를 선언하는 키워드가 아닌 것은?',
    options: ['var', 'let', 'const', 'function'],
    answer: 3, // function
    explanation:
      'var, let, const는 변수 선언 키워드입니다. function은 함수를 선언하는 키워드입니다.',
  },
  {
    question: 'HTML5에서 추가된 의미론적(Semantic) 태그는?',
    options: ['div', 'span', 'section', 'pre'],
    answer: 2, // <section>
    explanation:
      'section은 HTML5에서 추가된 의미론적 태그입니다. div와 span은 기존 HTML에도 있던 비의미론적 태그입니다. <content>는 존재하지 않는 태그입니다.',
  },
  {
    question:
      'CSS에서 flexbox 레이아웃의 주축(main axis) 방향을 설정하는 속성은?',
    options: ['flex-wrap', 'flex-direction', 'justify-content', 'align-items'],
    answer: 1, // flex-direction
    explanation:
      'flex-direction은 주축 방향을 설정합니다. flex-wrap은 아이템의 줄바꿈, justify-content는 주축 기준 정렬, align-items는 교차축 기준 정렬을 담당합니다.',
  },
  {
    question: 'JavaScript에서 배열의 끝에 새 요소를 추가하는 메서드는?',
    options: [
      'array.push()',
      'array.pop()',
      'array.shift()',
      'array.unshift()',
    ],
    answer: 0, // array.push()
    explanation:
      'push()는 배열 끝에 요소를 추가합니다. pop()은 배열 끝 요소를 제거, shift()는 배열 앞 요소를 제거, unshift()는 배열 앞에 요소를 추가합니다.',
  },
  {
    question: 'HTML에서 이미지를 삽입하는 태그는?',
    options: ['image', 'img', 'picture', 'figure'],
    answer: 1, // <img>
    explanation:
      'img는 이미지를 삽입하는 기본 태그입니다. picture는 반응형 이미지를 위한 컨테이너, figure는 독립적인 콘텐츠를 위한 컨테이너입니다.',
  },
  {
    question: 'CSS에서 요소를 화면에서 완전히 사라지게 하는 속성과 값은?',
    options: [
      'visibility: hidden',
      'opacity: 0',
      'display: none',
      'position: absolute',
    ],
    answer: 2, // display: none
    explanation:
      'display: none은 요소를 화면에서 완전히 제거합니다. visibility: hidden은 요소를 보이지 않게 하지만 공간은 유지, opacity: 0은 투명하게 만듭니다.',
  },
  {
    question: 'JavaScript에서 조건에 따라 코드를 실행하는 문법이 아닌 것은?',
    options: ['if-else', 'switch', 'for', 'try-catch'],
    answer: 2, // for
    explanation:
      'for는 반복문입니다. if-else, switch는 조건문, try-catch는 예외처리를 위한 구문입니다.',
  },
  {
    question: 'HTML 문서의 메타데이터를 포함하는 태그는?',
    options: ['body', 'main', 'head', 'header'],
    answer: 2, // <head>
    explanation:
      '<head>는 문서의 메타데이터를 포함합니다. body는 문서의 내용, main은 주요 콘텐츠, header는 소개나 탐색 링크를 포함합니다.',
  },
];

// 변수 초기화
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(-1);
let quizCompleted = false;

// DOM 요소 선택
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('restart-btn');
const resultMessage = document.getElementById('result-message');
const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const summaryElement = document.getElementById('summary');
const retryButton = document.getElementById('retry-btn');

// 화면 요소 선택
const mainMenu = document.getElementById('main-menu');
const quizContainer = document.querySelector('.quiz-container');
const editContainer = document.getElementById('edit-container');

const startQuizBtn = document.getElementById('start-quiz-btn');
const editQuizBtn = document.getElementById('edit-quiz-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');

const questionListEdit = document.getElementById('question-list-edit');
const saveQuestionBtn = document.getElementById('save-question-btn');

// 새 문제 입력 요소
const newQuestionInput = document.getElementById('new-question');
const newOption1 = document.getElementById('new-option1');
const newOption2 = document.getElementById('new-option2');
const newOption3 = document.getElementById('new-option3');
const newOption4 = document.getElementById('new-option4');
const newAnswer = document.getElementById('new-answer');
const newExplanation = document.getElementById('new-explanation');

//  화면 전환 함수
function showMainMenu() {
  mainMenu.style.display = 'block';
  quizContainer.classList.add('hide');
  editContainer.classList.add('hide');
}

// 퀴즈 시작 시 초기화
function initQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = new Array(quizData.length).fill(-1);
  quizCompleted = false;

  loadQuestion();
  updateUI();

  quizElement.classList.remove('hide');
  resultsElement.classList.add('hide');
  resultMessage.textContent = '';
  resultMessage.className = '';
}

// 현재 문제 로드
function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = `${currentQuestion + 1}. ${
    currentQuizData.question
  }`;

  optionsContainer.innerHTML = '';

  currentQuizData.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    if (userAnswers[currentQuestion] === index) {
      optionElement.classList.add('selected');
    }
    optionElement.textContent = option;
    optionElement.dataset.index = index;

    optionElement.addEventListener('click', selectOption);
    optionsContainer.appendChild(optionElement);
  });
}

// 옵션 선택 처리
function selectOption() {
  if (quizCompleted) return;

  const selectedIndex = parseInt(this.dataset.index);

  // 이전에 선택된 옵션 클래스 제거
  const options = document.querySelectorAll('.option');
  options.forEach((option) => option.classList.remove('selected'));

  // 현재 선택한 옵션에 클래스 추가
  this.classList.add('selected');

  // 사용자 답변 저장
  userAnswers[currentQuestion] = selectedIndex;

  updateUI();
}

// UI 업데이트
function updateUI() {
  // 이전 버튼 활성화/비활성화
  prevButton.disabled = currentQuestion === 0;

  // 다음 버튼 활성화/비활성화
  nextButton.disabled = currentQuestion === quizData.length - 1;

  // 제출 버튼 표시 여부
  submitButton.style.display =
    (userAnswers[currentQuestion] !== -1) &
    (currentQuestion == quizData.length - 1)
      ? 'block'
      : 'none';

  // 다시 시작 버튼 숨기기
  restartButton.style.display = 'none';
}

// 정답 확인
function checkAnswer() {
  if (userAnswers[currentQuestion] === -1) return;

  const currentQuizData = quizData[currentQuestion];
  const userAnswer = userAnswers[currentQuestion];
  const correctAnswer = currentQuizData.answer;

  const options = document.querySelectorAll('.option');

  // 사용자 선택 및 정답 표시
  options.forEach((option, index) => {
    if (index === correctAnswer) {
      option.classList.add('correct');
    } else if (index === userAnswer && userAnswer !== correctAnswer) {
      option.classList.add('incorrect');
    }
  });

  // 결과 메시지 표시
  if (userAnswer === correctAnswer) {
    resultMessage.textContent = '정답입니다!';
    resultMessage.className = 'correct-message';
  } else {
    resultMessage.textContent = `오답입니다. 정답: ${currentQuizData.options[correctAnswer]}`;
    resultMessage.className = 'incorrect-message';
  }

  // 버튼 상태 변경
  submitButton.style.display = 'none';

  if (currentQuestion === quizData.length - 1)
    restartButton.style.display = 'block';

  quizCompleted = true;
}

// 모든 문제 제출 및 결과 표시

function submitQuiz() {
  score = 0;
  summaryData = []; // 매번 초기화

  userAnswers.forEach((answer, index) => {
    const isCorrect = answer === quizData[index].answer;
    if (isCorrect) score++;

    // 문제 데이터 저장
    summaryData.push({
      question: quizData[index].question,
      userAnswer: answer !== -1 ? quizData[index].options[answer] : '응답 없음',
      correctAnswer: quizData[index].options[quizData[index].answer],
      explanation: quizData[index].explanation,
      isCorrect: isCorrect, // 맞았는지 여부 저장
    });
  });

  // 점수 업데이트
  document.getElementById('score').textContent = score;

  // 기본적으로 전체 문제 보여줌
  displaySummary(summaryData);

  // 결과 섹션 보이게 설정
  document.getElementById('results').classList.remove('hide');
  quizElement.classList.add('hide');
}

// 요약 결과 표시 함수
function displaySummary(filteredData) {
  const summaryElement = document.getElementById('summary');
  summaryElement.innerHTML = filteredData
    .map(
      (item) => `
    <div class="summary-item ${item.isCorrect ? 'correct' : 'incorrect'}">
      <p><strong>문제:</strong> ${item.question}</p>
      <hr>
      <p>내 답변: ${item.userAnswer}</p>
      <p>정답: ${item.correctAnswer}</p>
      <p>${item.explanation}</p>
    </div>
  `
    )
    .join('');
}

// 버튼 클릭 이벤트 추가
document.getElementById('show-all-btn').addEventListener('click', function () {
  displaySummary(summaryData); // 모든 문제 표시
});

document
  .getElementById('show-correct-btn')
  .addEventListener('click', function () {
    displaySummary(summaryData.filter((item) => item.isCorrect)); // 맞은 문제만 표시
  });

document
  .getElementById('show-incorrect-btn')
  .addEventListener('click', function () {
    displaySummary(summaryData.filter((item) => !item.isCorrect)); // 틀린 문제만 표시
  });

// 이벤트 리스너
prevButton.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
    updateUI();
    resultMessage.textContent = '';
    quizCompleted = false;
  }
});

nextButton.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
    updateUI();
    resultMessage.textContent = '';
    quizCompleted = false;
  }
});

submitButton.addEventListener('click', () => {
  submitQuiz();
});

restartButton.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
    updateUI();
    resultMessage.textContent = '';
    quizCompleted = false;
  } else {
    submitQuiz();
  }
});

retryButton.addEventListener('click', showMainMenu);

// 문제 목록 불러오기 (편집 화면)
function loadQuestionsInEdit() {
  questionListEdit.innerHTML = '';
  quizData.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('edit-question-item');
    div.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
      <button onclick="deleteQuestion(${index})">삭제</button>
    `;
    questionListEdit.appendChild(div);
  });
}

// 문제 삭제 기능
window.deleteQuestion = function (index) {
  quizData.splice(index, 1);
  loadQuestionsInEdit();
};

// 새 문제 추가 기능
function addNewQuestion() {
  const questionText = newQuestionInput.value.trim();
  const options = [
    newOption1.value.trim(),
    newOption2.value.trim(),
    newOption3.value.trim(),
    newOption4.value.trim(),
  ];
  const answerIndex = parseInt(newAnswer.value) - 1;
  const explanationText = newExplanation.value.trim();

  if (
    !questionText ||
    options.some((opt) => !opt) ||
    isNaN(answerIndex) ||
    answerIndex < 0 ||
    answerIndex > 3
  ) {
    alert('모든 필드를 올바르게 입력해주세요.');
    return;
  }

  const newQuestion = {
    question: questionText,
    options,
    answer: answerIndex,
    explanation: explanationText,
  };

  quizData.push(newQuestion);

  // 입력 폼 초기화
  newQuestionInput.value = '';
  newOption1.value = '';
  newOption2.value = '';
  newOption3.value = '';
  newOption4.value = '';
  newAnswer.value = '';
  newExplanation.value = '';

  loadQuestionsInEdit();
}

function startQuiz() {
  if (quizData.length === 0) {
    alert('퀴즈 문제가 없습니다. 문제를 추가해주세요.');
    return;
  }
  mainMenu.style.display = 'none';
  quizContainer.classList.remove('hide');
  editContainer.classList.add('hide');
  initQuiz();
}

function openEditQuiz() {
  mainMenu.style.display = 'none';
  quizContainer.classList.add('hide');
  editContainer.classList.remove('hide');
  loadQuestionsInEdit();
}

// 이벤트 리스너 추가
startQuizBtn.addEventListener('click', startQuiz);
editQuizBtn.addEventListener('click', openEditQuiz);
backToMenuBtn.addEventListener('click', showMainMenu);
saveQuestionBtn.addEventListener('click', addNewQuestion);

showMainMenu();

// 퀴즈 초기화
initQuiz();

document.addEventListener('DOMContentLoaded', () => {
  // 문제 목록 불러오기 (편집 화면)
  function loadQuestionsInEdit() {
    questionListEdit.innerHTML = '';
    quizData.forEach((q, index) => {
      const div = document.createElement('div');
      div.classList.add('edit-question-item');
      div.innerHTML = `
        <p>${index + 1}. ${q.question}</p>
        <button onclick="deleteQuestion(${index})">삭제</button>
      `;
      questionListEdit.appendChild(div);
    });
  }

  // 문제 삭제 기능
  window.deleteQuestion = function (index) {
    quizData.splice(index, 1);
    loadQuestionsInEdit();
  };

  // 새 문제 추가 기능
  function addNewQuestion() {
    const questionText = newQuestionInput.value.trim();
    const options = [
      newOption1.value.trim(),
      newOption2.value.trim(),
      newOption3.value.trim(),
      newOption4.value.trim(),
    ];
    const answerIndex = parseInt(newAnswer.value);
    const explanationText = newExplanation.value.trim();

    if (
      !questionText ||
      options.some((opt) => !opt) ||
      isNaN(answerIndex) ||
      answerIndex < 0 ||
      answerIndex > 3
    ) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const newQuestion = {
      question: questionText,
      options,
      answer: answerIndex,
      explanation: explanationText,
    };

    quizData.push(newQuestion);

    // 입력 폼 초기화
    newQuestionInput.value = '';
    newOption1.value = '';
    newOption2.value = '';
    newOption3.value = '';
    newOption4.value = '';
    newAnswer.value = '';
    newExplanation.value = '';

    loadQuestionsInEdit();
  }

  // 화면 전환 함수
  function showMainMenu() {
    mainMenu.style.display = 'block';
    quizContainer.classList.add('hide');
    editContainer.classList.add('hide');
  }

  function startQuiz() {
    if (quizData.length === 0) {
      alert('퀴즈 문제가 없습니다. 문제를 추가해주세요.');
      return;
    }
    mainMenu.style.display = 'none';
    quizContainer.classList.remove('hide');
    editContainer.classList.add('hide');
    initQuiz();
  }

  function openEditQuiz() {
    mainMenu.style.display = 'none';
    quizContainer.classList.add('hide');
    editContainer.classList.remove('hide');
    loadQuestionsInEdit();
  }

  // 이벤트 리스너 추가
  startQuizBtn.addEventListener('click', startQuiz);
  editQuizBtn.addEventListener('click', openEditQuiz);
  backToMenuBtn.addEventListener('click', showMainMenu);
  saveQuestionBtn.addEventListener('click', addNewQuestion);

  showMainMenu();
});
