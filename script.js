const quizData = [
  {
    question: '제적 사유가 아닌 것은?',
    options: ['비매너', '무단 결석', '출석률 미달', '수업 중 노트 필기'],
    answer: 3, // 수업 중 노트 필기
    explanation:
      '수업 중 노트 필기는 제적 사유가 아니며, 출결 미준수와 관련된 행동이 문제입니다.',
  },
  {
    question: '슬랙을 사용하는 이유는 무엇인가요?',
    options: [
      '게임하기 위해',
      '모든 커뮤니케이션을 위해',
      '개인적인 메신저로 사용하려고',
      '사진 공유만 하려고',
    ],
    answer: 1, // 모든 커뮤니케이션을 위해
    explanation: '슬랙은 모든 커뮤니케이션을 위한 플랫폼으로 사용됩니다.',
  },
  {
    question: '훈련생이 수업 내용을 녹음하는 것은 어떻게 되나요?',
    options: ['허용됨', '금지됨', '제한됨', '선생님과 협의해야 함'],
    answer: 1, // 허용됨
    explanation: '훈련생이 수업 내용을 녹음하는 것은 허용됩니다.',
  },
  {
    question: '출석률이 77%인 경우의 지원금은?',
    options: ['316,000원', '284,400원', '지급되지 않음', '500,000원'],
    answer: 2, // 지급되지 않음
    explanation: '출석률이 77%인 경우 지급되지 않습니다.',
  },
  {
    question: '교육 지원금은 주로 어떤 계좌로 지급되나요?',
    options: ['신한은행 계좌', '국민은행 계좌', '우리은행 계좌', '농협 계좌'],
    answer: 1, // 국민은행 계좌
    explanation: '지급받는 계좌는 반드시 KB국민은행 계좌여야 합니다.',
  },
  {
    question: '모든 커뮤니케이션은 무엇을 통해 진행하나요?',
    options: ['이메일', '슬랙(SLACK)', '카카오톡', '문자메시지'],
    answer: 1, // 슬랙(SLACK)
    explanation: '모든 커뮤니케이션은 슬랙(SLACK)을 통해 진행됩니다.',
  },
  {
    question: '교육 보안 규범에 따라 금지된 사항은?',
    options: ['출석 체크', '소통하기', '수업을 유출하기', '질문하기'],
    answer: 2, // 수업을 유출하기
    explanation:
      '수업 내용을 유출하는 것은 보안 규범에 의해 금지되어 있습니다.',
  },
  {
    question: '자유게시판에 올릴 수 있는 항목이 아닌 것은?',
    options: ['맛집 공유', '취업 지원 상담', '스터디 모집', '강의 내용 질문'],
    answer: 3, // 강의 내용 질문
    explanation: '강의 내용에 대한 질문은 자유게시판에 올릴 수 없습니다.',
  },
  {
    question: '훈련생이 수업 중 비속어를 사용하는 경우 어떤 조치가 취해지나요?',
    options: ['재훈련', '경고', '무관심', '제적'],
    answer: 1, // 경고
    explanation: '비속어 사용 시에는 경고가 주어집니다.',
  },
  {
    question: '6기 훈련생의 출석 기준을 위한 단위 기간은?',
    options: ['1개월', '3개월', '6개월', '1주'],
    answer: 1, // 1개월
    explanation: '단위 기간은 1개월로 설정되어 있습니다.',
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
    userAnswers[currentQuestion] !== -1 ? 'block' : 'none';

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

submitButton.addEventListener('click', checkAnswer);

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
``;

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
  } else {
    alert('문제가 추가되었습니다.');
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
