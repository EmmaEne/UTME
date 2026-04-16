/**
 * JAMB CBT Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial State
    let state = {
        subjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
        currentSubject: 'English',
        currentIndex: 0,
        answers: {}, // Stores: { subject: { questionId: answer } }
        reviewFlags: {}, // Stores: { subject: { questionId: true/false } }
        timeRemaining: 2 * 60 * 60, // 2 hours in seconds
        examStarted: true
    };

    // Load state from sessionStorage if exists
    const savedState = sessionStorage.getItem('jambExamState');
    if (savedState) {
        state = JSON.parse(savedState);
    } else {
        // Initialize answer and review structures
        state.subjects.forEach(sub => {
            state.answers[sub] = {};
            state.reviewFlags[sub] = {};
        });
    }

    // DOM Elements
    const elements = {
        timer: document.getElementById('timerDisplay'),
        subjectTabs: document.getElementById('subjectTabsContainer'),
        activeSubjectLabel: document.getElementById('activeSubjectDisplay'),
        questionNum: document.getElementById('questionNumberLabel'),
        questionText: document.getElementById('questionText'),
        optionsList: document.getElementById('optionsList'),
        palette: document.getElementById('paletteGrid'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        reviewBtn: document.getElementById('reviewBtn'),
        clearBtn: document.getElementById('clearBtn'),
        submitBtn: document.getElementById('submitBtn'),
        confirmSubmitBtn: document.getElementById('confirmSubmitBtn'),
        summaryContent: document.getElementById('summaryContent'),
        userRegHeader: document.getElementById('userRegHeader'),
        stripReg: document.getElementById('stripReg')
    };

    // Set Candidate Info
    const regNum = sessionStorage.getItem('candidateReg') || '77488392AB';
    if(elements.userRegHeader) elements.userRegHeader.innerText = `REG: ${regNum}`;
    if(elements.stripReg) elements.stripReg.innerText = `REG: ${regNum}`;

    // --- Core Functions ---

    function initSubjectTabs() {
        elements.subjectTabs.innerHTML = '';
        state.subjects.forEach(sub => {
            const tab = document.createElement('div');
            tab.className = `stab ${state.currentSubject === sub ? 'active' : ''}`;
            tab.innerText = sub.toUpperCase();
            tab.onclick = () => switchSubject(sub);
            elements.subjectTabs.appendChild(tab);
        });
    }

    function switchSubject(subjectName) {
        saveState();
        state.currentSubject = subjectName;
        state.currentIndex = 0;
        renderApp();
    }

    function renderQuestion() {
        const questions = window.questionsData[state.currentSubject];
        const q = questions[state.currentIndex];
        
        elements.activeSubjectLabel.innerText = `SUBJECT: ${state.currentSubject.toUpperCase()}`;
        elements.questionNum.innerText = `Question ${state.currentIndex + 1}`;
        elements.questionText.innerHTML = q.question;

        elements.optionsList.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isChecked = state.answers[state.currentSubject][q.id] === opt;
            
            const div = document.createElement('div');
            div.className = `option-row ${isChecked ? 'selected' : ''}`;
            div.innerHTML = `
                <input type="radio" name="option" id="opt${idx}" value="${opt}" ${isChecked ? 'checked' : ''}>
                <span class="option-letter">${letter}.</span>
                <span class="option-text">${opt}</span>
            `;
            div.onclick = () => selectOption(opt);
            elements.optionsList.appendChild(div);
        });

        updateNavButtons();
        renderPalette();
    }

    function selectOption(value) {
        const questions = window.questionsData[state.currentSubject];
        const q = questions[state.currentIndex];
        state.answers[state.currentSubject][q.id] = value;
        saveState();
        renderQuestion();
    }

    function clearAnswer() {
        const questions = window.questionsData[state.currentSubject];
        const q = questions[state.currentIndex];
        delete state.answers[state.currentSubject][q.id];
        saveState();
        renderQuestion();
    }

    function toggleReview() {
        const questions = window.questionsData[state.currentSubject];
        const q = questions[state.currentIndex];
        state.reviewFlags[state.currentSubject][q.id] = !state.reviewFlags[state.currentSubject][q.id];
        saveState();
        renderPalette();
    }

    function renderPalette() {
        const questions = window.questionsData[state.currentSubject];
        elements.palette.innerHTML = '';
        
        questions.forEach((q, idx) => {
            const btn = document.createElement('div');
            let className = 'pal-btn';
            
            if (idx === state.currentIndex) className += ' current';
            if (state.reviewFlags[state.currentSubject][q.id]) {
                className += ' review';
            } else if (state.answers[state.currentSubject][q.id]) {
                className += ' answered';
            }

            btn.className = className;
            btn.innerText = idx + 1;
            btn.onclick = () => {
                state.currentIndex = idx;
                renderApp();
            };
            elements.palette.appendChild(btn);
        });
    }

    function updateNavButtons() {
        const questions = window.questionsData[state.currentSubject];
        elements.prevBtn.disabled = state.currentIndex === 0;
        elements.nextBtn.disabled = state.currentIndex === questions.length - 1;
    }

    function startTimer() {
        const timerInterval = setInterval(() => {
            state.timeRemaining--;
            if (state.timeRemaining <= 0) {
                clearInterval(timerInterval);
                autoSubmit();
            }
            updateTimerDisplay();
            if(state.timeRemaining % 30 === 0) saveState(); // Periodic save
        }, 1000);
    }

    function updateTimerDisplay() {
        const h = Math.floor(state.timeRemaining / 3600);
        const m = Math.floor((state.timeRemaining % 3600) / 60);
        const s = state.timeRemaining % 60;
        elements.timer.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        if (state.timeRemaining < 300) elements.timer.classList.add('danger');
    }

    function saveState() {
        sessionStorage.setItem('jambExamState', JSON.stringify(state));
    }

    function renderApp() {
        initSubjectTabs();
        renderQuestion();
    }

    // --- Event Listeners ---

    elements.nextBtn.onclick = () => {
        const questions = window.questionsData[state.currentSubject];
        if (state.currentIndex < questions.length - 1) {
            state.currentIndex++;
            renderQuestion();
        }
    };

    elements.prevBtn.onclick = () => {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            renderQuestion();
        }
    };

    elements.clearBtn.onclick = clearAnswer;
    elements.reviewBtn.onclick = toggleReview;

    elements.submitBtn.onclick = () => {
        generateSummary();
        const modal = new bootstrap.Modal(document.getElementById('summaryModal'));
        modal.show();
    };

    elements.confirmSubmitBtn.onclick = () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('summaryModal'));
        modal.hide();
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        confirmModal.show();
    };

    window.finalProcess = function() {
        sessionStorage.setItem('examFinished', 'true');
        sessionStorage.removeItem('jambExamState');
        window.location.href = 'success.html';
    };

    function generateSummary() {
        let html = '<table class="summary-tbl">';
        html += '<thead><tr><th>SUBJECT</th><th>TOTAL</th><th>ANSWERED</th><th>UNANSWERED</th><th>REVIEW</th></tr></thead><tbody>';
        
        state.subjects.forEach(sub => {
            const total = window.questionsData[sub].length;
            const answered = Object.keys(state.answers[sub]).length;
            const review = Object.values(state.reviewFlags[sub]).filter(v => v).length;
            
            html += `<tr>
                <td class="fw-bold">${sub.toUpperCase()}</td>
                <td>${total}</td>
                <td class="col-answered">${answered}</td>
                <td class="col-unanswered">${total - answered}</td>
                <td class="col-review">${review}</td>
            </tr>`;
        });
        
        html += '</tbody></table>';
        elements.summaryContent.innerHTML = html;
    }

    function autoSubmit() {
        alert("Time is up! Your examination will be submitted automatically.");
        window.finalProcess();
    }

    // Initialize
    renderApp();
    startTimer();
    updateTimerDisplay();
});
