// テストシステムのメインロジック
class TestSystem {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = null;
        this.timerInterval = null;
        this.userName = '';
        this.resultManager = new TestResultManager();
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // 画面要素
        this.nameInputScreen = document.getElementById('nameInputScreen');
        this.testScreen = document.getElementById('testScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.resultsListScreen = document.getElementById('resultsListScreen');
        
        // 名前入力要素
        this.nameForm = document.getElementById('nameForm');
        this.userNameInput = document.getElementById('userName');
        
        // テスト要素
        this.questionNumber = document.getElementById('questionNumber');
        this.questionText = document.getElementById('questionText');
        this.testProgress = document.getElementById('testProgress');
        this.timer = document.getElementById('timer');
        this.progressFill = document.getElementById('progressFill');
        this.optionsContainer = document.querySelector('.options-container');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.finishBtn = document.getElementById('finishBtn');
        
        // 結果要素
        this.resultName = document.getElementById('resultName');
        this.resultScore = document.getElementById('resultScore');
        this.resultPercentage = document.getElementById('resultPercentage');
        this.resultTime = document.getElementById('resultTime');
        this.levelIndicator = document.getElementById('levelIndicator');
        this.levelFill = document.getElementById('levelFill');
        this.levelText = document.getElementById('levelText');
        this.wrongAnswersContainer = document.getElementById('wrongAnswersContainer');
        this.wrongAnswersList = document.getElementById('wrongAnswersList');
        
        // 結果一覧要素
        this.resultsList = document.getElementById('resultsList');
        this.retakeBtn = document.getElementById('retakeBtn');
        this.viewResultsBtn = document.getElementById('viewResultsBtn');
        this.backToTestBtn = document.getElementById('backToTestBtn');
        this.clearResultsBtn = document.getElementById('clearResultsBtn');
    }

    bindEvents() {
        // 名前入力フォーム
        this.nameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.startTest();
        });
        
        // テストナビゲーション
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.finishBtn.addEventListener('click', () => this.finishTest());
        
        // 結果画面のボタン
        this.retakeBtn.addEventListener('click', () => this.retakeTest());
        this.viewResultsBtn.addEventListener('click', () => this.showResultsList());
        this.backToTestBtn.addEventListener('click', () => this.showTestScreen());
        this.clearResultsBtn.addEventListener('click', () => this.clearResults());
        
        // オプション選択
        this.optionsContainer.addEventListener('click', (e) => {
            const option = e.target.closest('.option');
            if (option) {
                this.selectOption(parseInt(option.dataset.option));
            }
        });
    }

    startTest() {
        this.userName = this.userNameInput.value.trim();
        if (!this.userName) {
            alert('お名前を入力してください。');
            return;
        }
        
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = Date.now();
        
        this.showScreen('testScreen');
        this.startTimer();
        this.loadQuestion();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    loadQuestion() {
        const question = testQuestions[this.currentQuestionIndex];
        
        this.questionNumber.textContent = question.id;
        this.questionText.textContent = question.question;
        this.testProgress.textContent = `${this.currentQuestionIndex + 1} / ${testQuestions.length}`;
        
        // プログレスバーの更新
        const progress = ((this.currentQuestionIndex + 1) / testQuestions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // オプションの更新
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.option = index;
            
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            optionElement.innerHTML = `
                <span class="option-letter">${letter}</span>
                <span class="option-text">${option}</span>
            `;
            
            // 既に回答済みの場合は選択状態を表示
            if (this.answers[this.currentQuestionIndex] !== undefined) {
                if (this.answers[this.currentQuestionIndex] === index) {
                    optionElement.classList.add('selected');
                }
            }
            
            this.optionsContainer.appendChild(optionElement);
        });
        
        // ナビゲーションボタンの状態更新
        this.updateNavigationButtons();
    }

    selectOption(optionIndex) {
        this.answers[this.currentQuestionIndex] = optionIndex;
        
        // 選択状態の更新
        this.optionsContainer.querySelectorAll('.option').forEach((option, index) => {
            option.classList.remove('selected');
            if (index === optionIndex) {
                option.classList.add('selected');
            }
        });
        
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        // 前の問題ボタン
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // 次の問題ボタン
        const hasAnswer = this.answers[this.currentQuestionIndex] !== undefined;
        this.nextBtn.disabled = !hasAnswer;
        
        // テスト完了ボタン
        const isLastQuestion = this.currentQuestionIndex === testQuestions.length - 1;
        this.nextBtn.style.display = isLastQuestion ? 'none' : 'inline-block';
        this.finishBtn.style.display = isLastQuestion && hasAnswer ? 'inline-block' : 'none';
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < testQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }
    }

    finishTest() {
        this.stopTimer();
        this.calculateResults();
        this.showScreen('resultScreen');
    }

    calculateResults() {
        let correctCount = 0;
        const wrongAnswers = [];
        
        testQuestions.forEach((question, index) => {
            const userAnswer = this.answers[index];
            const correctAnswer = question.correct;
            
            if (userAnswer === correctAnswer) {
                correctCount++;
            } else {
                wrongAnswers.push({
                    questionNumber: question.id,
                    question: question.question,
                    userAnswer: userAnswer !== undefined ? question.options[userAnswer] : '未回答',
                    correctAnswer: question.options[correctAnswer],
                    explanation: question.explanation
                });
            }
        });
        
        const percentage = Math.round((correctCount / testQuestions.length) * 100);
        const timeSpent = Date.now() - this.startTime;
        
        // 結果を保存
        const result = this.resultManager.saveResult(
            this.userName,
            correctCount,
            testQuestions.length,
            wrongAnswers,
            timeSpent
        );
        
        this.displayResults(result, wrongAnswers);
    }

    displayResults(result, wrongAnswers) {
        // 基本情報の表示
        this.resultName.textContent = result.name;
        this.resultScore.textContent = `${result.score} / ${result.totalQuestions}`;
        this.resultPercentage.textContent = `${result.percentage}%`;
        
        // 所要時間の表示
        const minutes = Math.floor(result.timeSpent / 60000);
        const seconds = Math.floor((result.timeSpent % 60000) / 1000);
        this.resultTime.textContent = `${minutes}分${seconds}秒`;
        
        // 知識レベルの表示
        const level = this.getKnowledgeLevel(result.percentage);
        this.levelFill.style.width = `${result.percentage}%`;
        this.levelText.textContent = level.text;
        this.levelText.className = `level-text level-${level.class}`;
        
        // 間違えた問題の表示
        if (wrongAnswers.length > 0) {
            this.wrongAnswersContainer.style.display = 'block';
            this.wrongAnswersList.innerHTML = '';
            
            wrongAnswers.forEach(wrongAnswer => {
                const wrongAnswerItem = document.createElement('div');
                wrongAnswerItem.className = 'wrong-answer-item';
                wrongAnswerItem.innerHTML = `
                    <div class="wrong-answer-question">
                        Q${wrongAnswer.questionNumber}: ${wrongAnswer.question}
                    </div>
                    <div class="wrong-answer-explanation">
                        <strong>あなたの回答:</strong> ${wrongAnswer.userAnswer}<br>
                        <strong>正解:</strong> ${wrongAnswer.correctAnswer}<br>
                        <strong>解説:</strong> ${wrongAnswer.explanation}
                    </div>
                `;
                this.wrongAnswersList.appendChild(wrongAnswerItem);
            });
        } else {
            this.wrongAnswersContainer.style.display = 'none';
        }
    }

    getKnowledgeLevel(percentage) {
        if (percentage >= 90) {
            return { text: 'エキスパート', class: 'expert' };
        } else if (percentage >= 75) {
            return { text: '上級者', class: 'advanced' };
        } else if (percentage >= 50) {
            return { text: '中級者', class: 'intermediate' };
        } else {
            return { text: '初心者', class: 'beginner' };
        }
    }

    showResultsList() {
        this.loadResultsList();
        this.showScreen('resultsListScreen');
    }

    loadResultsList() {
        const results = this.resultManager.getResults();
        
        if (results.length === 0) {
            this.resultsList.innerHTML = '<p>まだテスト結果がありません。</p>';
            return;
        }
        
        // 日付順でソート（新しい順）
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        this.resultsList.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-list-item';
            
            const date = new Date(result.date);
            const dateString = date.toLocaleDateString('ja-JP');
            const timeString = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            
            resultItem.innerHTML = `
                <div class="result-list-info">
                    <div class="result-list-name">${result.name}</div>
                    <div class="result-list-details">${dateString} ${timeString}</div>
                </div>
                <div class="result-list-score">${result.percentage}%</div>
                <div class="result-list-actions">
                    <button class="btn btn-secondary btn-sm" onclick="testSystem.viewResult(${result.id})">詳細</button>
                    <button class="btn btn-danger btn-sm" onclick="testSystem.deleteResult(${result.id})">削除</button>
                </div>
            `;
            
            this.resultsList.appendChild(resultItem);
        });
    }

    viewResult(resultId) {
        const result = this.resultManager.getResultById(resultId);
        if (result) {
            this.displayResults(result, result.wrongAnswers);
            this.showScreen('resultScreen');
        }
    }

    deleteResult(resultId) {
        if (confirm('この結果を削除しますか？')) {
            this.resultManager.deleteResult(resultId);
            this.loadResultsList();
        }
    }

    retakeTest() {
        this.showScreen('nameInputScreen');
        this.userNameInput.value = this.userName;
    }

    clearResults() {
        if (confirm('すべてのテスト結果を削除しますか？この操作は取り消せません。')) {
            localStorage.removeItem('testResults');
            this.resultManager = new TestResultManager();
            this.loadResultsList();
        }
    }

    showTestScreen() {
        this.showScreen('testScreen');
    }

    showScreen(screenId) {
        // すべての画面を非表示
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 指定された画面を表示
        document.getElementById(screenId).classList.add('active');
    }
}

// テストシステムの初期化
let testSystem;
document.addEventListener('DOMContentLoaded', () => {
    testSystem = new TestSystem();
});
