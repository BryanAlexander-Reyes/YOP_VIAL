class EducationController {
  constructor() {
    this.activeStep = 0;
    this.quiz1State = this.createQuizState();
    this.quiz2State = this.createQuizState();
    this.quiz3State = this.createQuizState();
    this.quiz4State = this.createQuizState();
    this.quiz5State = this.createQuizState();
    this.crosswordState = { answers: {}, completed: false };
    this.juegoInstance = null;

    this.quiz1Questions = window.quiz1Data || [];
    this.quiz2Questions = window.quiz2Data || [];
    this.quiz3Questions = window.quiz3Data || [];
    this.quiz4Questions = window.quiz4Data || [];
    this.quiz5Questions = window.quiz5Data || [];
  }

  createQuizState() {
    return { actual: 0, answers: [], score: 0 };
  }

  init() {
    this.setupStepNavigation();
    this.renderStepIndicators(this.activeStep);
    this.renderStepContent(this.activeStep);
  }

  resetProgress() {
    this.activeStep = 0;
    this.quiz1State = this.createQuizState();
    this.quiz2State = this.createQuizState();
    this.quiz3State = this.createQuizState();
    this.quiz4State = this.createQuizState();
    this.quiz5State = this.createQuizState();
    this.crosswordState = { answers: {}, completed: false };
    this.init();
  }

  setupStepNavigation() {
    document.querySelectorAll('.sv-edu-step').forEach((stepEl, idx) => {
      stepEl.onclick = () => {
        // If an external app is open, close it and restore the UI
        const external = document.getElementById('sv-edu-external');
        if (external && external.classList.contains('active')) {
          this.closeExternal();
        }
        this.navigateToStep(idx);
      };
    });
  }

  navigateToStep(stepIdx) {
    this.activeStep = stepIdx;
    if (window.switchAppView) window.switchAppView('education');
    this.renderStepIndicators(stepIdx);
    this.renderStepContent(stepIdx);
    this.scrollToActiveView(stepIdx);
  }

  scrollToElement(element, offset = 24) {
    if (!element) return;

    requestAnimationFrame(() => {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  }

  scrollToActiveView(stepIdx = this.activeStep) {
    const activeView = document.getElementById(`sv-edu-view-${stepIdx}`);
    this.scrollToElement(activeView, 28);
  }

  scrollToQuizActions(num) {
    const nextBtn = document.getElementById(`quiz-btn-next-${num}`);
    const actions = nextBtn ? nextBtn.closest('.quiz-actions') : null;
    this.scrollToElement(actions || nextBtn, window.innerHeight * 0.55);
  }

  renderStepIndicators(activeOverride = null) {
    const target = activeOverride !== null ? activeOverride : this.activeStep;
    document.querySelectorAll('.sv-edu-step').forEach((stepEl, idx) => {
      stepEl.className = 'sv-edu-step';
      if (idx === target) stepEl.classList.add('active');
      else if (idx < target) stepEl.classList.add('completed');
    });
  }

  renderStepContent(stepIdx) {
    document.querySelectorAll('.sv-edu-view').forEach(view => view.classList.remove('active'));

    const activeView = document.getElementById(`sv-edu-view-${stepIdx}`);
    if (!activeView) return;
    activeView.classList.add('active');

    // Ensure the external container is closed when navigating to internal content
    const externalContainer = document.getElementById('sv-edu-external');
    if (externalContainer && externalContainer.classList.contains('active')) {
      // remove iframe and class but keep header visible
      externalContainer.innerHTML = '';
      externalContainer.classList.remove('active');
    }

    if (stepIdx === 0) this.renderQuiz(1, 'sv-edu-view-0');
    if (stepIdx === 1) this.renderQuiz(2, 'sv-edu-view-1');
    if (stepIdx === 2) this.renderJuego('sv-edu-view-2');
    if (stepIdx === 3) this.renderQuiz(3, 'sv-edu-view-3');
    if (stepIdx === 4) this.renderQuiz(4, 'sv-edu-view-4');
    if (stepIdx === 5) this.renderQuiz(5, 'sv-edu-view-5');
    if (stepIdx === 6) this.renderCrossword('sv-edu-view-6');
    if (stepIdx === 7) this.renderCompletionScreen('sv-edu-view-7');
  }

  getQuizConfig(num) {
    const configs = {
      1: { state: this.quiz1State, questions: this.quiz1Questions, title: 'Quiz 1: Senales y decisiones basicas' },
      2: { state: this.quiz2State, questions: this.quiz2Questions, title: 'Quiz 2: Normas, velocidad y prioridad' },
      3: { state: this.quiz3State, questions: this.quiz3Questions, title: 'Quiz 3: Motociclistas y peatones' },
      4: { state: this.quiz4State, questions: this.quiz4Questions, title: 'Quiz 4: Riesgos y conduccion segura' },
      5: { state: this.quiz5State, questions: this.quiz5Questions, title: 'Quiz 5: Colores y senalizacion vial' }
    };
    return configs[num];
  }

  renderQuiz(num, viewId) {
    const container = document.getElementById(viewId);
    const config = this.getQuizConfig(num);
    const { state, questions, title } = config;
    const total = questions.length;

    if (!total) {
      container.innerHTML = '<p>No hay preguntas cargadas para este quiz.</p>';
      return;
    }

    if (state.actual >= total) {
      this.renderQuizResults(num, container, state, total);
      return;
    }

    const currentQ = questions[state.actual];
    const isMultiple = currentQ.tipo === 'multiple';
    const isAnswered = state.answers[state.actual] !== undefined;
    const selected = isAnswered ? this.normalizeAnswer(state.answers[state.actual]) : [];
    const correctSet = this.getCorrectSet(currentQ);
    const category = currentQ.categoria || title;
    const instruction = isMultiple ? 'Selecciona todas las respuestas correctas.' : (currentQ.tipo || 'Selecciona una respuesta.');
    const imageMarkup = currentQ.imagen ? `
      <div class="quiz-visual">
        <img src="${currentQ.imagen}" alt="${currentQ.alt || currentQ.categoria || 'Imagen de apoyo'}" />
      </div>
    ` : '';

    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-info-header">
          <span class="quiz-category-badge">${category}</span>
          <span class="quiz-progress-text">Pregunta ${state.actual + 1} de ${total}</span>
        </div>

        <div class="quiz-progress-wrapper">
          <div class="quiz-progress-track">
            <div class="quiz-progress-bar" style="width: ${((state.actual + 1) / total) * 100}%;"></div>
          </div>
        </div>

        <div class="quiz-question-card">
          ${imageMarkup}
          <div class="quiz-question-text">${currentQ.pregunta}</div>
          <div class="quiz-question-helper">${instruction}</div>
          <div class="quiz-options-list ${isMultiple ? 'quiz-options-multiple' : ''}">
            ${currentQ.opciones.map((opt, idx) => this.renderOption(opt, idx, isAnswered, selected, correctSet, isMultiple)).join('')}
          </div>

          <div id="quiz-feedback-container-${num}"></div>

          <div class="quiz-actions">
            ${isMultiple && !isAnswered ? `<button class="quiz-btn" id="quiz-btn-check-${num}">Comprobar</button>` : ''}
            <button class="quiz-btn" id="quiz-btn-next-${num}" style="display: none;">Siguiente</button>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.onclick = () => {
        if (state.answers[state.actual] !== undefined) return;
        const selectedIdx = parseInt(btn.dataset.idx, 10);

        if (isMultiple) {
          btn.classList.toggle('selected');
        } else {
          this.finishQuestion(num, viewId, selectedIdx);
        }
      };
    });

    const checkBtn = document.getElementById(`quiz-btn-check-${num}`);
    if (checkBtn) {
      checkBtn.onclick = () => {
        const selectedIndexes = Array.from(container.querySelectorAll('.quiz-option-btn.selected'))
          .map(btn => parseInt(btn.dataset.idx, 10));
        if (!selectedIndexes.length) return;
        this.finishQuestion(num, viewId, selectedIndexes);
      };
    }

    if (isAnswered) this.renderQuestionFeedback(num, viewId, currentQ, state, correctSet);
  }

  renderOption(opt, idx, isAnswered, selected, correctSet, isMultiple) {
    let btnClass = 'quiz-option-btn';
    const checked = selected.includes(idx);
    if (!isAnswered && checked) btnClass += ' selected';
    if (isAnswered) {
      if (correctSet.includes(idx)) btnClass += ' correct';
      else if (checked) btnClass += ' wrong';
    }

    const marker = isMultiple ? `<span class="quiz-option-marker">${checked ? '✓' : ''}</span>` : '';
    return `<button class="${btnClass}" data-idx="${idx}" ${isAnswered ? 'disabled' : ''}>${marker}<span>${opt}</span></button>`;
  }

  finishQuestion(num, viewId, answer) {
    const { state, questions } = this.getQuizConfig(num);
    const currentQ = questions[state.actual];
    state.answers[state.actual] = Array.isArray(answer) ? answer.slice().sort((a, b) => a - b) : answer;
    if (this.isCorrectAnswer(currentQ, state.answers[state.actual])) state.score++;
    this.renderQuiz(num, viewId);
    this.scrollToQuizActions(num);
  }

  renderQuestionFeedback(num, viewId, currentQ, state) {
    const selectedAnswer = state.answers[state.actual];
    const correct = this.isCorrectAnswer(currentQ, selectedAnswer);
    const feedbackContainer = document.getElementById(`quiz-feedback-container-${num}`);
    const nextBtn = document.getElementById(`quiz-btn-next-${num}`);

    if (feedbackContainer) {
      feedbackContainer.innerHTML = `
        <div class="quiz-feedback-animation ${correct ? 'is-correct' : 'is-wrong'}">
          <div class="quiz-feedback-symbol">${correct ? '✓' : 'X'}</div>
        </div>
        <div class="quiz-feedback-box ${correct ? 'correct-feedback' : 'wrong-feedback'}">
          <div class="quiz-feedback-title">${correct ? 'Correcto' : 'Incorrecto'}</div>
          <div class="quiz-feedback-text">${currentQ.explicacion}</div>
        </div>
      `;
    }

    if (nextBtn) {
      nextBtn.style.display = 'block';
      nextBtn.onclick = () => {
        state.actual++;
        this.renderQuiz(num, viewId);
        this.scrollToElement(document.getElementById(viewId), 28);
      };
    }
  }

  getCorrectSet(question) {
    if (Array.isArray(question.correctas)) return question.correctas.slice().sort((a, b) => a - b);
    return [question.correcta];
  }

  normalizeAnswer(answer) {
    return Array.isArray(answer) ? answer.slice().sort((a, b) => a - b) : [answer];
  }

  isCorrectAnswer(question, answer) {
    const expected = this.getCorrectSet(question);
    const selected = this.normalizeAnswer(answer);
    return expected.length === selected.length && expected.every((value, idx) => value === selected[idx]);
  }

  renderQuizResults(num, container, state, total) {
    const scorePct = Math.round((state.score / total) * 100);
    const nextStepName = num === 5 ? 'Ir al crucigrama vial' : this.getNextQuizLabel(num);

    container.innerHTML = `
      <div class="quiz-results-card">
        <div class="quiz-results-icon">✓</div>
        <div class="quiz-score-big">${state.score} / ${total}</div>
        <div class="quiz-denom">Respuestas correctas (${scorePct}%)</div>
        <h3>Quiz ${num} completado</h3>
        <p style="margin: 0.5rem auto 1.5rem; max-width: 500px; color: #666; line-height: 1.5;">Has terminado esta seccion del aula de seguridad vial.</p>
        <div class="quiz-results-actions">
          <button class="quiz-btn" id="quiz-btn-proceed-${num}">${nextStepName}</button>
        </div>
      </div>
    `;

    document.getElementById(`quiz-btn-proceed-${num}`).onclick = () => {
      if (num === 1) this.activeStep = 1;
      if (num === 2) this.activeStep = 2;
      if (num === 3) this.activeStep = 4;
      if (num === 4) this.activeStep = 5;
      if (num === 5) this.activeStep = 6;
      this.init();
      this.scrollToActiveView(this.activeStep);
    };
  }

  getNextQuizLabel(num) {
    if (num === 1) return 'Avanzar al Quiz 2';
    if (num === 2) return 'Avanzar a la Sopa de Letras';
    if (num === 3) return 'Avanzar al Quiz 4';
    return 'Avanzar al Quiz 5';
  }

  renderJuego(viewId) {
    if (window.SopaDeLetras) {
      this.juegoInstance = new window.SopaDeLetras(viewId, () => {
        this.activeStep = 3;
        this.init();
        this.scrollToActiveView(this.activeStep);
      });
      this.juegoInstance.init();
    } else {
      document.getElementById(viewId).innerHTML = '<p>Cargando sopa de letras...</p>';
    }
  }


  renderCrossword(viewId) {
    const container = document.getElementById(viewId);
    const clues = [
      { key: 'pare', label: 'Horizontal 1', clue: 'Senal roja octagonal que obliga a detenerse.', answer: 'PARE' },
      { key: 'cebra', label: 'Horizontal 2', clue: 'Zona demarcada para que crucen peatones.', answer: 'CEBRA' },
      { key: 'casco', label: 'Vertical 1', clue: 'Elemento obligatorio para motociclista y acompanante.', answer: 'CASCO' },
      { key: 'verde', label: 'Vertical 2', clue: 'Color del semaforo que permite avanzar con precaucion.', answer: 'VERDE' }
    ];

    const answers = this.crosswordState.answers;
    const isComplete = clues.every(item => (answers[item.key] || '').toUpperCase() === item.answer);

    container.innerHTML = `
      <div class="crossword-shell">
        <div class="crossword-header">
          <span class="quiz-category-badge">Juego final</span>
          <h3>Crucigrama vial</h3>
          <p>Responde las pistas. Cada palabra correcta arma una parte del tablero.</p>
        </div>
        <div class="crossword-layout">
          <div class="crossword-board" aria-label="Tablero de crucigrama">
            ${this.renderCrosswordBoard(answers)}
          </div>
          <div class="crossword-clues">
            ${clues.map(item => `
              <label class="crossword-clue ${((answers[item.key] || '').toUpperCase() === item.answer) ? 'solved' : ''}">
                <span>${item.label}: ${item.clue}</span>
                <input type="text" data-key="${item.key}" maxlength="${item.answer.length}" value="${answers[item.key] || ''}" autocomplete="off" />
              </label>
            `).join('')}
            <button class="quiz-btn" id="crossword-check">Comprobar crucigrama</button>
            <button class="quiz-btn quiz-btn-outline" id="crossword-finish" ${isComplete ? '' : 'disabled'}>Finalizar aula</button>
            <div id="crossword-message" class="crossword-message">${isComplete ? 'Todo correcto. Ya puedes finalizar.' : 'Completa todas las palabras para finalizar.'}</div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('input[data-key]').forEach(input => {
      input.oninput = () => {
        const cleaned = input.value.toUpperCase().replace(/[^A-Z]/g, '');
        input.value = cleaned;
        answers[input.dataset.key] = cleaned;
      };
    });

    document.getElementById('crossword-check').onclick = () => {
      this.renderCrossword(viewId);
      this.scrollToElement(document.getElementById(viewId), 28);
    };
    document.getElementById('crossword-finish').onclick = () => {
      this.crosswordState.completed = true;
      this.activeStep = 7;
      this.init();
      this.scrollToActiveView(this.activeStep);
    };
  }

  renderCrosswordBoard(answers) {
    const rows = [
      ['P', 'A', 'R', 'E', null, null, null],
      [null, null, null, null, 'E', null, null],
      ['C', 'C', 'E', 'B', 'R', 'A', null],
      ['A', null, null, null, 'D', null, null],
      ['S', null, null, null, 'E', null, null],
      ['C', null, null, null, null, null, null],
      ['O', null, null, null, null, null, null]
    ];

    const solvedLetters = new Set();
    const addWord = (key, coords, word) => {
      if ((answers[key] || '').toUpperCase() !== word) return;
      coords.forEach(([r, c]) => solvedLetters.add(`${r}-${c}`));
    };

    addWord('pare', [[0, 0], [0, 1], [0, 2], [0, 3]], 'PARE');
    addWord('cebra', [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5]], 'CEBRA');
    addWord('casco', [[2, 0], [3, 0], [4, 0], [5, 0], [6, 0]], 'CASCO');
    addWord('verde', [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]], 'VERDE');

    return rows.map((row, r) => row.map((letter, c) => {
      if (!letter) return '<div class="crossword-cell empty"></div>';
      const revealed = solvedLetters.has(`${r}-${c}`);
      return `<div class="crossword-cell ${revealed ? 'revealed' : ''}">${revealed ? letter : ''}</div>`;
    }).join('')).join('');
  }

  renderCompletionScreen(viewId) {
    const container = document.getElementById(viewId);
    const scores = [
      { label: 'Quiz 1: Senales y decisiones', score: this.quiz1State.score, total: this.quiz1Questions.length },
      { label: 'Quiz 2: Normas y prioridad', score: this.quiz2State.score, total: this.quiz2Questions.length },
      { label: 'Quiz 3: Motociclistas y peatones', score: this.quiz3State.score, total: this.quiz3Questions.length },
      { label: 'Quiz 4: Riesgos y conduccion', score: this.quiz4State.score, total: this.quiz4Questions.length },
      { label: 'Quiz 5: Colores y senalizacion', score: this.quiz5State.score, total: this.quiz5Questions.length }
    ];
    const scoreTotal = scores.reduce((acc, item) => acc + item.score, 0);
    const maxScore = scores.reduce((acc, item) => acc + item.total, 0);
    const scorePct = Math.round((scoreTotal / maxScore) * 100);

    container.innerHTML = `
      <div class="sv-edu-completion">
        <span class="sv-edu-badge">✓</span>
        <h3>Aula finalizada</h3>
        <p>Completaste los 5 quizzes, la sopa de letras y el crucigrama vial. Tu resultado queda resumido abajo para que puedas repasar lo necesario.</p>

        <div class="sv-edu-card-summary">
          ${scores.map(item => `
            <div class="sv-edu-summary-row">
              <span>${item.label}</span>
              <strong>${item.score} / ${item.total}</strong>
            </div>
          `).join('')}
          <div class="sv-edu-summary-row">
            <span>Sopa de Letras</span>
            <strong>Completado</strong>
          </div>
          <div class="sv-edu-summary-row">
            <span>Crucigrama vial</span>
            <strong>Completado</strong>
          </div>
          <div class="sv-edu-summary-row" style="font-size: 1.1rem; font-weight: 700; color: var(--sv-verde); border-top: 1px solid #ddd; margin-top: 8px; padding-top: 12px;">
            <span>Aciertos totales</span>
            <span>${scoreTotal} / ${maxScore} (${scorePct}%)</span>
          </div>
        </div>

        <button class="sv-edu-reset-btn" id="edu-btn-reset">Reiniciar aula</button>
      </div>
    `;

    document.getElementById('edu-btn-reset').onclick = () => this.resetProgress();
  }

  loadExternalApp(url) {
    // Hide internal views
    document.querySelectorAll('.sv-edu-view').forEach(v => v.classList.remove('active'));

    const container = document.getElementById('sv-edu-external');
    if (!container) return;
    // Descriptions for known apps (can extend)
    const descriptions = {
      'trivia_vial/index.html': 'Trivia adicional: preguntas rápidas para afianzar conceptos de seguridad vial en formato de cuestionario interactivo.',
      'escape_room_vial/index.html': 'Escape Room Vial: resuelve acertijos y pruebas relacionadas con la seguridad en la via para avanzar en la misión.',
      'dist/index.html': 'Crossy Road: juego estilo "cruce de vías" donde debes guiar un personaje evitando tráfico y aprendiendo reglas viales.'
    };

    const safeUrl = url;
    const descText = descriptions[url] || '';

    // Put description into the header paragraph so it uses the same style
    const headerDescEl = document.getElementById('sv-edu-header-desc');
    if (headerDescEl) {
      if (this._origHeaderDesc === undefined) this._origHeaderDesc = headerDescEl.innerHTML;
      headerDescEl.innerHTML = descText;
    }

    // Build iframe shell with a toolbar (description is in header)
    container.innerHTML = `
      <div class="external-shell">
        <div class="external-toolbar">
          <div style="display:flex;justify-content:flex-end;">
            <button class="quiz-btn quiz-btn-outline" id="external-close">Cerrar</button>
          </div>
        </div>
        <div class="external-iframe-wrap">
          <div class="iframe-spinner" id="iframe-spinner">
            <div class="spinner-dot"></div>
            <div class="spinner-dot"></div>
            <div class="spinner-dot"></div>
          </div>
          <iframe src="${safeUrl}" title="Programa externo" sandbox="allow-scripts allow-forms allow-same-origin allow-popups"></iframe>
        </div>
      </div>
    `;
    container.classList.add('active');

    // Attach iframe load/error handlers to hide spinner and inject styles
    const iframeEl = container.querySelector('iframe');
    const spinnerEl = container.querySelector('#iframe-spinner');
    if (iframeEl && spinnerEl) {
      iframeEl.addEventListener('load', () => {
        spinnerEl.style.display = 'none';
        try {
          const doc = iframeEl.contentDocument || iframeEl.contentWindow.document;
          const css = `
            body{ background:#F8F5F0 !important; color:#0c2d3d !important; }
            .card, .inicio-contenido, .acertijo-card, .sala-contenedor, #pantalla-inicio, #pantalla-juego, #pantalla-carga { background:#fff !important; color:#0c2d3d !important; border:1px solid rgba(12,45,61,0.06) !important; box-shadow:0 8px 24px rgba(12,45,61,0.06) !important; }
            .navbar{ background:#0c2d3d !important; color:#fff !important; border-color: rgba(12,45,61,0.08) !important; }
            .header h1, .titulo-principal { color:#0c2d3d !important; }
            .btn-primary, .btn-primario { background:#0a72e8 !important; color:#fff !important; border:none !important; }
            .btn-secondary, .btn-secundario, .btn-secondary { border-color:#0a72e8 !important; color:#0a72e8 !important; background:transparent !important; }
            .opciones-grid .btn-opcion, .opcion-btn, .btn-opcion { background:#f5f7fa !important; color:#0c2d3d !important; border:1px solid rgba(12,45,61,0.06) !important; }
          `;
          const s = doc.createElement('style');
          s.setAttribute('data-injected','yopalvial');
          s.textContent = css;
          doc.head.appendChild(s);
        } catch (err) {
          console.warn('No se pudo inyectar estilo en iframe', err);
        }
      });
      iframeEl.addEventListener('error', () => {
        spinnerEl.style.display = 'none';
        const errMsg = document.createElement('div');
        errMsg.style.padding = '12px';
        errMsg.style.color = '#b00';
        errMsg.innerText = 'No se pudo cargar el programa. Puedes abrirlo en una nueva pestaña.';
        container.querySelector('.external-iframe-wrap').appendChild(errMsg);
      });
    }

    document.getElementById('external-close').onclick = () => this.closeExternal();
    this.scrollToElement(container, 28);
  }

  closeExternal() {
    const container = document.getElementById('sv-edu-external');
    if (!container) return;
    // Remove iframe to stop any running scripts
    container.innerHTML = '';
    container.classList.remove('active');
    // Restore header description
    const headerDescEl = document.getElementById('sv-edu-header-desc');
    if (headerDescEl && this._origHeaderDesc !== undefined) {
      headerDescEl.innerHTML = this._origHeaderDesc;
      this._origHeaderDesc = undefined;
    }
    // Return to the default active step view
    this.renderStepIndicators(this.activeStep);
    this.renderStepContent(this.activeStep);
    this.scrollToActiveView(this.activeStep);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const controller = new EducationController();
  controller.init();
  window.eduController = controller;
  window.navigateToEduStep = stepIdx => controller.navigateToStep(stepIdx);
  window.loadExternalApp = url => controller.loadExternalApp(url);

  // Ensure clicking launch cards that open internal content restores the steps/header
  document.querySelectorAll('.sv-edu-launch-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const onclick = card.getAttribute('onclick') || '';
      // if card is NOT opening via loadExternalApp, close any external view
      if (!onclick.includes('loadExternalApp')) controller.closeExternal();
    });
  });
});
