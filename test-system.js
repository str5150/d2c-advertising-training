// テストシステムのメインロジック
class TestSystem {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = null;
        this.timerInterval = null;
        this.userName = '';
        this.resultManager = new TestResultManager();
        this.shuffledQuestions = []; // シャッフルされた問題リスト
        
        this.initializeElements();
        this.bindEvents();
    }
    
    // 問題をランダムにシャッフルし、各問題の選択肢もランダムにシャッフル
    shuffleQuestions() {
        // 元の問題をコピー
        this.shuffledQuestions = testQuestions.map(q => ({ ...q }));
        
        // 問題の順番をシャッフル
        for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [this.shuffledQuestions[j], this.shuffledQuestions[i]];
        }
        
        // 各問題の選択肢をシャッフル（正解のインデックスも更新）
        this.shuffledQuestions.forEach(question => {
            const originalCorrect = question.correct;
            const options = [...question.options];
            const indices = [0, 1, 2, 3];
            
            // 選択肢のインデックスをシャッフル
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            
            // 選択肢をシャッフルされた順序で再配置
            question.options = indices.map(idx => options[idx]);
            
            // 正解のインデックスを更新
            question.correct = indices.indexOf(originalCorrect);
        });
    }

    initializeElements() {
        // 画面要素
        this.nameInputScreen = document.getElementById('nameInputScreen');
        this.testScreen = document.getElementById('testScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.resultsListScreen = document.getElementById('resultsListScreen');
        this.adminLoginScreen = document.getElementById('adminLoginScreen');
        this.adminScreen = document.getElementById('adminScreen');
        
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
        this.exitTestBtn = document.getElementById('exitTestBtn');
        
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
        this.filterName = document.getElementById('filterName');
        this.sortBy = document.getElementById('sortBy');
        this.retakeBtn = document.getElementById('retakeBtn');
        this.viewResultsBtn = document.getElementById('viewResultsBtn');
        this.backToTestBtn = document.getElementById('backToTestBtn');
        this.clearResultsBtn = document.getElementById('clearResultsBtn');
        this.copyResultBtn = document.getElementById('copyResultBtn');
        this.adminLoginBtn = document.getElementById('adminLoginBtn');
        
        // 管理者要素
        this.adminLoginForm = document.getElementById('adminLoginForm');
        this.adminPassword = document.getElementById('adminPassword');
        this.cancelAdminLoginBtn = document.getElementById('cancelAdminLoginBtn');
        this.adminResultsList = document.getElementById('adminResultsList');
        this.adminFilterName = document.getElementById('adminFilterName');
        this.adminSortBy = document.getElementById('adminSortBy');
        this.exportAllResultsBtn = document.getElementById('exportAllResultsBtn');
        this.logoutAdminBtn = document.getElementById('logoutAdminBtn');
        
        // 現在の結果データを保持
        this.currentResult = null;
        this.currentWrongAnswers = [];
        this.isAdmin = false;
        this.ADMIN_PASSWORD = '0920';
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
        this.exitTestBtn.addEventListener('click', () => this.exitTest());
        
        // 結果画面のボタン
        this.retakeBtn.addEventListener('click', () => this.retakeTest());
        this.viewResultsBtn.addEventListener('click', () => this.showResultsList());
        this.backToTestBtn.addEventListener('click', () => this.showTestScreen());
        this.clearResultsBtn.addEventListener('click', () => this.clearResults());
        this.copyResultBtn.addEventListener('click', () => this.copyResults());
        
        // フィルタ・ソート
        this.filterName.addEventListener('input', () => this.loadResultsList());
        this.sortBy.addEventListener('change', () => this.loadResultsList());
        
        // 管理者関連
        this.adminLoginBtn.addEventListener('click', () => this.showAdminLogin());
        this.adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });
        this.cancelAdminLoginBtn.addEventListener('click', () => this.showResultsList());
        this.adminFilterName.addEventListener('input', () => this.loadAdminResults());
        this.adminSortBy.addEventListener('change', () => this.loadAdminResults());
        this.exportAllResultsBtn.addEventListener('click', () => this.exportAllResults());
        this.logoutAdminBtn.addEventListener('click', () => this.logoutAdmin());
        
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
        
        // 問題をシャッフル
        this.shuffleQuestions();
        
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
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        
        this.questionNumber.textContent = question.id;
        this.questionText.textContent = question.question;
        this.testProgress.textContent = `${this.currentQuestionIndex + 1} / ${this.shuffledQuestions.length}`;
        
        // プログレスバーの更新
        const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
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
        const isLastQuestion = this.currentQuestionIndex === this.shuffledQuestions.length - 1;
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
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        }
    }

    finishTest() {
        this.stopTimer();
        this.calculateResults();
        this.showScreen('resultScreen');
    }

    exitTest() {
        if (confirm('テストを途中で終了しますか？現在までの回答結果で採点されます。')) {
            this.stopTimer();
            this.calculateResults();
            this.showScreen('resultScreen');
        }
    }

    calculateResults() {
        let correctCount = 0;
        const wrongAnswers = [];
        
        this.shuffledQuestions.forEach((question, index) => {
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
        
        const percentage = Math.round((correctCount / this.shuffledQuestions.length) * 100);
        const timeSpent = Date.now() - this.startTime;
        
        // 結果を保存
        const result = this.resultManager.saveResult(
            this.userName,
            correctCount,
            this.shuffledQuestions.length,
            wrongAnswers,
            timeSpent
        );
        
        this.currentResult = result;
        this.currentWrongAnswers = wrongAnswers;
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
        let results = this.resultManager.getResults();
        
        // フィルタリング
        const filterName = this.filterName.value.trim().toLowerCase();
        if (filterName) {
            results = results.filter(result => 
                result.name.toLowerCase().includes(filterName)
            );
        }
        
        // ソート
        const sortBy = this.sortBy.value;
        results.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'name-asc':
                    return a.name.localeCompare(b.name, 'ja');
                case 'name-desc':
                    return b.name.localeCompare(a.name, 'ja');
                case 'score-desc':
                    return b.percentage - a.percentage;
                case 'score-asc':
                    return a.percentage - b.percentage;
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });
        
        if (results.length === 0) {
            this.resultsList.innerHTML = '<p>該当するテスト結果がありません。</p>';
            return;
        }
        
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
            this.currentResult = result;
            this.currentWrongAnswers = result.wrongAnswers || [];
            this.displayResults(result, this.currentWrongAnswers);
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

    copyResults() {
        if (!this.currentResult || !this.currentWrongAnswers) {
            return;
        }

        const result = this.currentResult;
        const wrongAnswers = this.currentWrongAnswers;
        const level = this.getKnowledgeLevel(result.percentage);
        const minutes = Math.floor(result.timeSpent / 60000);
        const seconds = Math.floor((result.timeSpent % 60000) / 1000);

        let text = `クロコス社内運用試験 結果\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        text += `お名前: ${result.name}\n`;
        text += `正解数: ${result.score} / ${result.totalQuestions}\n`;
        text += `正解率: ${result.percentage}%\n`;
        text += `所要時間: ${minutes}分${seconds}秒\n`;
        text += `知識レベル: ${level.text}\n\n`;

        if (wrongAnswers.length > 0) {
            text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            text += `間違えた問題 (${wrongAnswers.length}問)\n`;
            text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
            
            wrongAnswers.forEach((wrongAnswer, index) => {
                text += `${index + 1}. Q${wrongAnswer.questionNumber}: ${wrongAnswer.question}\n`;
                text += `   あなたの回答: ${wrongAnswer.userAnswer}\n`;
                text += `   正解: ${wrongAnswer.correctAnswer}\n`;
                text += `   解説: ${wrongAnswer.explanation}\n\n`;
            });
        } else {
            text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            text += `全問正解です！\n`;
            text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        }

        // クリップボードにコピー
        navigator.clipboard.writeText(text).then(() => {
            // ボタンのテキストを一時的に変更
            const originalText = this.copyResultBtn.textContent;
            this.copyResultBtn.textContent = 'コピーしました！';
            this.copyResultBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                this.copyResultBtn.textContent = originalText;
                this.copyResultBtn.style.opacity = '1';
            }, 2000);
        }).catch(err => {
            alert('コピーに失敗しました。手動でコピーしてください。');
            console.error('コピーエラー:', err);
        });
    }

    showAdminLogin() {
        this.showScreen('adminLoginScreen');
        this.adminPassword.value = '';
    }

    handleAdminLogin() {
        const password = this.adminPassword.value.trim();
        if (password === this.ADMIN_PASSWORD) {
            this.isAdmin = true;
            this.loadAdminResults();
            this.showScreen('adminScreen');
        } else {
            alert('パスワードが正しくありません。');
        }
    }

    logoutAdmin() {
        this.isAdmin = false;
        this.showResultsList();
    }

    loadAdminResults() {
        // 全受験者の結果を取得（localStorageから）
        const allResults = this.resultManager.getAllResults();
        
        // フィルタリング
        let results = allResults;
        const filterName = this.adminFilterName.value.trim().toLowerCase();
        if (filterName) {
            results = results.filter(result => 
                result.name.toLowerCase().includes(filterName)
            );
        }
        
        // ソート
        const sortBy = this.adminSortBy.value;
        results.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'name-asc':
                    return a.name.localeCompare(b.name, 'ja');
                case 'name-desc':
                    return b.name.localeCompare(a.name, 'ja');
                case 'score-desc':
                    return b.percentage - a.percentage;
                case 'score-asc':
                    return a.percentage - b.percentage;
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });
        
        if (results.length === 0) {
            this.adminResultsList.innerHTML = '<p>該当するテスト結果がありません。</p>';
            return;
        }
        
        this.adminResultsList.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-list-item';
            
            const date = new Date(result.date);
            const dateString = date.toLocaleDateString('ja-JP');
            const timeString = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            const minutes = Math.floor(result.timeSpent / 60000);
            const seconds = Math.floor((result.timeSpent % 60000) / 1000);
            
            resultItem.innerHTML = `
                <div class="result-list-info">
                    <div class="result-list-name">${result.name}</div>
                    <div class="result-list-details">${dateString} ${timeString} | ${minutes}分${seconds}秒</div>
                </div>
                <div class="result-list-score">${result.percentage}%</div>
                <div class="result-list-actions">
                    <button class="btn btn-secondary btn-sm" onclick="testSystem.viewAdminResult(${result.id})">詳細</button>
                </div>
            `;
            
            this.adminResultsList.appendChild(resultItem);
        });
    }

    viewAdminResult(resultId) {
        const allResults = this.resultManager.getAllResults();
        const result = allResults.find(r => r.id === resultId);
        if (result) {
            this.currentResult = result;
            this.currentWrongAnswers = result.wrongAnswers || [];
            this.displayResults(result, this.currentWrongAnswers);
            this.showScreen('resultScreen');
        }
    }

    exportAllResults() {
        const allResults = this.resultManager.getAllResults();
        if (allResults.length === 0) {
            alert('エクスポートする結果がありません。');
            return;
        }

        let csv = '名前,正解数,総問題数,正解率,所要時間(分),所要時間(秒),知識レベル,日時\n';
        
        allResults.forEach(result => {
            const level = this.getKnowledgeLevel(result.percentage);
            const minutes = Math.floor(result.timeSpent / 60000);
            const seconds = Math.floor((result.timeSpent % 60000) / 1000);
            const date = new Date(result.date);
            const dateString = date.toLocaleString('ja-JP');
            
            csv += `"${result.name}",${result.score},${result.totalQuestions},${result.percentage},${minutes},${seconds},"${level.text}","${dateString}"\n`;
        });

        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `クロコス社内運用試験_全結果_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

// アクセス制限チェック
function checkAccessRestriction() {
    const allowedHosts = [
        'str5150.github.io',
        'localhost',
        '127.0.0.1'
    ];
    
    const currentHost = window.location.hostname;
    const referrer = document.referrer;
    
    // 現在のホストが許可されたホストかチェック
    const isAllowedHost = allowedHosts.some(host => currentHost === host || currentHost.endsWith('.' + host));
    
    // リファラーが許可されたホストからのものかチェック
    const isAllowedReferrer = !referrer || allowedHosts.some(host => referrer.includes(host));
    
    // 直接アクセス（referrerが空）でGitHub Pagesのドメインからの場合は許可
    if (!isAllowedHost && !isAllowedReferrer) {
        // アクセス拒否メッセージを表示
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Noto Sans JP', sans-serif;">
                <div style="text-align: center; padding: 2rem;">
                    <h1 style="color: #e74c3c; margin-bottom: 1rem;">アクセスが制限されています</h1>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem;">このページは公開URLからのみアクセス可能です。</p>
                    <p style="color: #7f8c8d;">正しいURLからアクセスしてください。</p>
                </div>
            </div>
        `;
        return false;
    }
    
    return true;
}

// テストシステムの初期化
let testSystem;
document.addEventListener('DOMContentLoaded', () => {
    // アクセス制限をチェック
    if (!checkAccessRestriction()) {
        return;
    }
    
    testSystem = new TestSystem();
});
