// ──────────────────────────────────────────────
// JUEGO 1: SOPA DE LETRAS LLANERA
// ──────────────────────────────────────────────

const WORDS = ['CASCO', 'CHALECO', 'PARE', 'PEATON', 'CEBRA', 'SEMAFORO', 'CASANARE', 'YOPAL', 'VIAJERO', 'PRUDENCIA'];

const MESSAGES = {
  CASCO: {
    message: "¡Carajo, bien visto, pariente! El casco salva vidas en las calles de Yopal. ¡Úsalo siempre abrochado!",
    tip: "Un casco bien ajustado puede salvarte la vida en cualquier momento."
  },
  CHALECO: {
    message: "¡Eso sí! El chaleco reflectivo te hace visible en la noche. ¡Que te vean, compa!",
    tip: "En las noches llaneras, la visibilidad es fundamental para tu seguridad."
  },
  PARE: {
    message: "¡Sostenga el caballo, pariente! Ante un PARE, deténgase por completo y evite accidentes.",
    tip: "Un PARE no es sugerencia, es ley. Respétalo siempre, sin excepciones."
  },
  PEATON: {
    message: "¡El peatón es el rey de la vía! Respeta al que va a pie, que él también tiene derecho.",
    tip: "Los peatones son vulnerables. Reduce la velocidad cuando veas personas."
  },
  CEBRA: {
    message: "La CEBRA es el paso seguro. Cruza ahí, no en cualquier parte de la vía, compa.",
    tip: "Las cebras existen para que cruces seguro. Úsalas siempre."
  },
  SEMAFORO: {
    message: "¡Respeta el SEMÁFORO, guía! La luz verde te da paso, la roja te ordena parar.",
    tip: "Los semáforos coordinan el tráfico. No hay prisa que valga romper la ley."
  },
  CASANARE: {
    message: "¡Somos CASANARE, tierra de llaneros! Aquí la seguridad es cultura, no moda.",
    tip: "En Casanare tenemos que ser ejemplo de conductores responsables."
  },
  YOPAL: {
    message: "¡YOPAL, corazón del llano! En esta capital, cada conductor cuida al otro.",
    tip: "Yopal crece, y con ello crece nuestra responsabilidad vial."
  },
  VIAJERO: {
    message: "Todo VIAJERO debe conocer las reglas. En la ruta, la prudencia es tu compañía.",
    tip: "Antes de viajar, revisa tu vehículo y mantén la calma."
  },
  PRUDENCIA: {
    message: "¡La PRUDENCIA es la mejor compañera del conductor llanero! Con ella, llegas seguro.",
    tip: "La prisa mata. La prudencia salva. Elige siempre la vida."
  }
};

window.SopaDeLetrasWORDS = WORDS;
window.SopaDeLetrasMESSAGES = MESSAGES;

class SopaDeLetras {
  constructor(containerId, onWinCallback) {
    this.container = document.getElementById(containerId);
    this.onWin = onWinCallback;
    this.puzzle = [];
    this.wordLocations = {};
    this.foundWords = new Set();
    this.selectedLetters = [];
  }

  init() {
    this.foundWords.clear();
    this.selectedLetters = [];
    this.renderLayout();
    this.generatePuzzle();
    this.renderPuzzle();
    this.renderWordList();
    this.updateProgress();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="juego-container">
        <div class="juego-instruction">
          <strong>🐴 Sopa de Letras Llanera:</strong> Encuentra las 10 palabras clave sobre seguridad vial. Haz clic en las letras para seleccionarlas y formar la palabra (en cualquier dirección).
        </div>

        <div class="quiz-progress-wrapper" style="margin-bottom: 10px;">
          <div class="quiz-progress-track">
            <div class="quiz-progress-bar" id="juego-progress-bar" style="width: 0%;"></div>
          </div>
          <span class="quiz-progress-text" id="juego-progress-text">0 / 10 encontradas</span>
        </div>

        <div class="juego-layout">
          <div class="juego-board-wrap">
            <div class="juego-grid" id="juego-grid-board"></div>
          </div>
          <div class="juego-sidebar">
            <div class="juego-words-card">
              <div class="juego-words-title">Palabras por buscar:</div>
              <div class="juego-words-grid" id="juego-words-list"></div>
            </div>
            
            <div class="juego-actions">
              <button class="quiz-btn quiz-btn-outline" id="juego-btn-hint" style="flex: 1; margin-right: 8px;">💡 Pista</button>
              <button class="quiz-btn" id="juego-btn-next" style="flex: 1;" disabled>Continuar →</button>
            </div>

            <div id="juego-tip-box" class="juego-tip-box" style="display: none;">
              <div class="juego-tip-title" id="juego-tip-title"></div>
              <div class="juego-tip-desc" id="juego-tip-desc"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('juego-btn-hint').onclick = () => this.showHint();
    document.getElementById('juego-btn-next').onclick = () => {
      if (this.foundWords.size >= 5) { // Permite continuar si tiene al menos 5 o todas.
        this.onWin();
      }
    };
  }

  generatePuzzle() {
    const width = 14;
    const height = 14;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    this.puzzle = Array(height).fill(null).map(() => Array(width).fill('X'));
    this.wordLocations = {};
    
    const directions = [
      {x: 1, y: 0},   // Derecha
      {x: 0, y: 1},   // Abajo
      {x: 1, y: 1},   // Diagonal abajo-derecha
      {x: 1, y: -1},  // Diagonal arriba-derecha
      {x: -1, y: 0},  // Izquierda
      {x: 0, y: -1},  // Arriba
      {x: -1, y: -1}, // Diagonal arriba-izquierda
      {x: -1, y: 1}   // Diagonal abajo-izquierda
    ];

    for (const word of WORDS) {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 200) {
        const startRow = Math.floor(Math.random() * height);
        const startCol = Math.floor(Math.random() * width);
        const direction = directions[Math.floor(Math.random() * directions.length)];
        
        if (this.canPlaceWord(word, startRow, startCol, direction, width, height)) {
          this.placeWord(word, startRow, startCol, direction);
          this.wordLocations[word] = { startRow, startCol, direction, word };
          placed = true;
        }
        attempts++;
      }
    }

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (this.puzzle[row][col] === 'X') {
          this.puzzle[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }

  canPlaceWord(word, startRow, startCol, direction, width, height) {
    for (let i = 0; i < word.length; i++) {
      const row = startRow + (direction.y * i);
      const col = startCol + (direction.x * i);
      
      if (row < 0 || row >= height || col < 0 || col >= width) {
        return false;
      }
      
      const cell = this.puzzle[row][col];
      if (cell !== 'X' && cell !== word[i]) {
        return false;
      }
    }
    return true;
  }

  placeWord(word, startRow, startCol, direction) {
    for (let i = 0; i < word.length; i++) {
      const row = startRow + (direction.y * i);
      const col = startCol + (direction.x * i);
      this.puzzle[row][col] = word[i];
    }
  }

  renderPuzzle() {
    const gridEl = document.getElementById('juego-grid-board');
    gridEl.innerHTML = '';

    this.puzzle.forEach((row, rowIndex) => {
      row.forEach((letter, colIndex) => {
        const btn = document.createElement('button');
        btn.className = 'juego-letter-btn';
        btn.textContent = letter;
        btn.dataset.row = rowIndex;
        btn.dataset.col = colIndex;
        btn.id = `juego-cell-${rowIndex}-${colIndex}`;
        btn.onclick = (e) => this.handleLetterClick(e, rowIndex, colIndex);
        gridEl.appendChild(btn);
      });
    });
  }

  renderWordList() {
    const listEl = document.getElementById('juego-words-list');
    listEl.innerHTML = '';

    WORDS.forEach(word => {
      const div = document.createElement('div');
      div.className = 'juego-word-item';
      div.id = `juego-word-${word}`;
      div.textContent = word;
      listEl.appendChild(div);
    });
  }

  handleLetterClick(e, rowIndex, colIndex) {
    const btn = e.target;
    const key = `${rowIndex}-${colIndex}`;

    if (btn.classList.contains('found')) return; // No hacer nada si ya se encontró

    if (this.selectedLetters.includes(key)) {
      this.selectedLetters = this.selectedLetters.filter(k => k !== key);
      btn.classList.remove('selected');
    } else {
      this.selectedLetters.push(key);
      btn.classList.add('selected');
    }

    this.checkForWord();
  }

  checkForWord() {
    if (this.selectedLetters.length < 3) return;
    if (!this.isStraightSelection()) return;

    const selectedText = this.selectedLetters
      .map(key => {
        const [row, col] = key.split('-');
        return this.puzzle[row][col];
      }).join('');

    const reverseText = selectedText.split('').reverse().join('');

    for (const word of WORDS) {
      if (!this.foundWords.has(word)) {
        if (selectedText === word || reverseText === word) {
          this.markWordFound(word);
          return;
        }
      }
    }
  }

  isStraightSelection() {
    if (this.selectedLetters.length < 2) return true;

    const coords = this.selectedLetters.map(key => {
      const [row, col] = key.split('-').map(Number);
      return { row, col };
    });

    const rowStep = Math.sign(coords[1].row - coords[0].row);
    const colStep = Math.sign(coords[1].col - coords[0].col);

    if (rowStep === 0 && colStep === 0) return false;

    for (let i = 1; i < coords.length; i++) {
      const expectedRow = coords[0].row + rowStep * i;
      const expectedCol = coords[0].col + colStep * i;
      if (coords[i].row !== expectedRow || coords[i].col !== expectedCol) {
        return false;
      }
    }

    return true;
  }

  markWordFound(word) {
    this.foundWords.add(word);
    
    // Desmarcar selección
    this.selectedLetters = [];
    document.querySelectorAll('.juego-letter-btn.selected').forEach(btn => btn.classList.remove('selected'));

    // Pintar encontradas
    const wordLoc = this.wordLocations[word];
    if (wordLoc) {
      for (let i = 0; i < word.length; i++) {
        const row = wordLoc.startRow + (wordLoc.direction.y * i);
        const col = wordLoc.startCol + (wordLoc.direction.x * i);
        const cell = document.getElementById(`juego-cell-${row}-${col}`);
        if (cell) {
          cell.classList.remove('selected');
          cell.classList.add('found');
        }
      }
    }

    // Marcar en la lista
    const wordEl = document.getElementById(`juego-word-${word}`);
    if (wordEl) {
      wordEl.classList.add('found');
    }

    this.updateProgress();
    this.showWordMessage(word);

    // Permitir avanzar al tener 5 encontradas (más accesible) o todas
    if (this.foundWords.size >= 5) {
      document.getElementById('juego-btn-next').disabled = false;
    }

    if (this.foundWords.size === WORDS.length) {
      // Completado total
      setTimeout(() => {
        this.onWin();
      }, 1500);
    }
  }

  updateProgress() {
    const count = this.foundWords.size;
    const pct = (count / WORDS.length) * 100;
    
    const bar = document.getElementById('juego-progress-bar');
    const txt = document.getElementById('juego-progress-text');
    if (bar && txt) {
      bar.style.width = pct + '%';
      txt.textContent = `${count} / ${WORDS.length} encontradas`;
    }
  }

  showWordMessage(word) {
    const data = MESSAGES[word];
    const tipBox = document.getElementById('juego-tip-box');
    const title = document.getElementById('juego-tip-title');
    const desc = document.getElementById('juego-tip-desc');
    
    if (tipBox && title && desc && data) {
      title.textContent = `¡Encontraste: ${word}! 🤠`;
      desc.textContent = `${data.message} TIP: ${data.tip}`;
      tipBox.style.display = 'block';
    }
  }

  showHint() {
    const notFound = WORDS.filter(w => !this.foundWords.has(w));
    if (notFound.length === 0) return;

    const hint = notFound[Math.floor(Math.random() * notFound.length)];
    const hintLoc = this.wordLocations[hint];
    
    const tipBox = document.getElementById('juego-tip-box');
    const title = document.getElementById('juego-tip-title');
    const desc = document.getElementById('juego-tip-desc');
    
    if (tipBox && title && desc && hintLoc) {
      title.textContent = `Pista para "${hint}" 🔍`;
      desc.textContent = `Busca cerca de la Fila ${hintLoc.startRow + 1}, Columna ${hintLoc.startCol + 1}.`;
      tipBox.style.display = 'block';
    }
  }
}
window.SopaDeLetras = SopaDeLetras;
