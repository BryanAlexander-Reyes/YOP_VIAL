// ── Preguntas ──
const preguntas = [
  {
    cat: "Velocidades",
    q: "¿Cuál es el límite de velocidad máxima permitido dentro del perímetro urbano de Yopal según el Código Nacional de Tránsito?",
    opts: ["50 km/h", "80 km/h", "60 km/h", "40 km/h"],
    ans: 3,
    exp: "En zonas urbanas el límite es 40 km/h. Respetar esta velocidad reduce drásticamente la distancia de frenado y la gravedad de los accidentes."
  },
  {
    cat: "Velocidades",
    q: "En zonas escolares de Yopal (frente a colegios e instituciones educativas), ¿cuál es la velocidad máxima permitida durante el horario escolar?",
    opts: ["20 km/h", "30 km/h", "50 km/h", "40 km/h"],
    ans: 0,
    exp: "En zonas escolares la velocidad máxima se reduce a 20 km/h durante el horario de entrada y salida de estudiantes, protegiendo especialmente a niños y jóvenes."
  },
  {
    cat: "Velocidades",
    q: "¿Cuál es la velocidad máxima permitida en carreteras primarias intermunicipales como la vía Yopal–Aguazul?",
    opts: ["60 km/h", "80 km/h", "120 km/h", "100 km/h"],
    ans: 3,
    exp: "En carreteras primarias nacionales el límite general es 100 km/h para automóviles. Sin embargo, en condiciones adversas (lluvia, niebla, noche) debe reducirse."
  },
  {
    cat: "Peatones",
    q: "¿Qué debe hacer el conductor al acercarse a un peatón que está cruzando en un paso cebra?",
    opts: ["Tocar la bocina para advertirle", "Acelerar para pasar rápido", "Reducir la velocidad y ceder el paso", "Cambiar de carril sin detenerse"],
    ans: 2,
    exp: "El peatón tiene prioridad absoluta en el paso cebra. El conductor debe reducir velocidad y detenerse si es necesario para garantizar el cruce seguro."
  },
  {
    cat: "Peatones",
    q: "¿Por qué los peatones deben caminar por el lado izquierdo de la vía cuando no hay andén?",
    opts: ["Porque la ley lo exige solo de noche", "Para ver de frente los vehículos que se aproximan y reaccionar a tiempo", "No importa el lado si van por la vía", "Para tener mejor visibilidad del paisaje"],
    ans: 1,
    exp: "Caminar de frente al tráfico permite al peatón ver los vehículos que se acercan y esquivarlos con tiempo; si caminara de espaldas, no podría reaccionar ante un vehículo que invada el borde."
  },
  {
    cat: "Motocicletas",
    q: "¿A partir de qué edad es obligatorio el uso del casco certificado para motociclistas y parrilleros en Colombia?",
    opts: ["Solo para mayores de 18 años", "A partir de los 14 años", "Solo para el conductor, no el parrillero", "Para todos, sin importar la edad"],
    ans: 3,
    exp: "El casco homologado es obligatorio para el conductor Y el parrillero sin importar la edad. Es la protección más importante ante un accidente de motocicleta."
  },
  {
    cat: "Motocicletas",
    q: "En Yopal, los accidentes con motocicletas concentran la mayor parte de la accidentalidad. ¿Cuál de estas acciones reduce más ese riesgo?",
    opts: ["Conducir por el andén para evitar el tráfico", "Aumentar la velocidad para salir rápido del tráfico", "No encender las luces de día para ahorrar energía", "Usar siempre casco, chaleco reflectivo y respetar el carril"],
    ans: 3,
    exp: "El uso correcto del casco, el chaleco reflectivo y mantenerse en el carril asignado son las medidas con mayor impacto en la reducción de lesiones graves para motociclistas."
  },
  {
    cat: "Motocicletas",
    q: "¿Qué significa la zigzagueación o 'colarse' entre vehículos en un trancón para una motocicleta?",
    opts: ["Es una habilidad permitida si se hace despacio", "Solo es peligroso en la noche", "Aumenta el riesgo de accidente por el ángulo muerto de otros vehículos", "Es legal si el conductor lleva más de 5 años de experiencia"],
    ans: 2,
    exp: "Zigzaguear entre vehículos coloca al motociclista en los puntos ciegos (ángulos muertos) de los conductores de automóviles y camiones, aumentando significativamente el riesgo de colisión."
  },
  {
    cat: "Alcohol y drogas",
    q: "¿Cuál es la consecuencia legal de conducir bajo el efecto del alcohol con un nivel de alcoholemia entre 0,4 y 0,8 g/L en Colombia?",
    opts: ["No tiene consecuencias si no hay accidente", "Solo retención del vehículo por 24 horas", "Solo se cobra una multa de menor cuantía", "Suspensión de la licencia por 1 año y multa de 45 SMDLV"],
    ans: 3,
    exp: "Conducir con alcoholemia entre 0,4 y 0,8 g/L implica multa de 45 SMDLV y suspensión de la licencia de conducción por 1 año, además de la retención del vehículo."
  },
  {
    cat: "Alcohol y drogas",
    q: "¿Cuántas copas de licor estándar son suficientes para que un conductor adulto supere el límite legal de alcoholemia de 0,4 g/L?",
    opts: ["Solo afecta si se consumen más de 5 copas", "Entre 1 y 2 bebidas estándar pueden ser suficientes según el peso y el tiempo", "El umbral no existe, solo importa si el conductor se siente mareado", "Ninguna: la mejor decisión es no beber nada antes de conducir"],
    ans: 1,
    exp: "Incluso 1 o 2 bebidas pueden superar el límite de 0,4 g/L dependiendo del peso, el sexo, el tiempo transcurrido y si la persona comió antes. La mejor decisión siempre es no beber nada antes de conducir."
  },
  {
    cat: "Señales de tránsito",
    q: "¿Qué significa una señal circular con borde rojo y una cifra en el centro en la vía?",
    opts: ["Velocidad mínima obligatoria", "Zona de reducción de velocidad próxima", "Velocidad máxima permitida en ese tramo", "Velocidad recomendada"],
    ans: 2,
    exp: "Las señales circulares con borde rojo son restrictivas. Cuando muestran una cifra, indican la velocidad máxima permitida obligatoria en ese tramo de la vía."
  },
  {
    cat: "Señales de tránsito",
    q: "¿Qué indica una señal triangular con fondo blanco y borde rojo en una intersección?",
    opts: ["Ceda el paso: el conductor debe dejar pasar a los vehículos de la vía principal", "Está prohibido girar", "Fin de la zona de velocidad reducida", "Zona de desvío obligatorio"],
    ans: 0,
    exp: "La señal de ceda el paso (triángulo con vértice hacia abajo) obliga al conductor a dejar pasar a los vehículos que circulan por la vía con prelación antes de continuar."
  },
  {
    cat: "Señales de tránsito",
    q: "¿Qué debe hacer el conductor cuando el semáforo está en amarillo?",
    opts: ["Cambiar de carril inmediatamente", "Acelerar para pasar antes de que cambie a rojo", "Es una señal informativa que no obliga a nada", "Detenerse si puede hacerlo con seguridad; si ya está muy cerca del cruce, pasar con precaución"],
    ans: 3,
    exp: "El amarillo indica que el semáforo está a punto de cambiar a rojo. El conductor debe frenar si tiene distancia suficiente; si ya está demasiado cerca para frenar con seguridad, puede cruzar con precaución."
  },
  {
    cat: "Distancias y maniobras",
    q: "¿Cuál es la distancia de seguridad recomendada entre vehículos a 60 km/h en carretera?",
    opts: ["20 metros", "10 metros", "30 metros", "50 metros"],
    ans: 3,
    exp: "A 60 km/h se recomienda mantener al menos 50 metros de distancia (regla de los 3 segundos). En vías mojadas o de noche esta distancia debe ser mayor."
  },
  {
    cat: "Distancias y maniobras",
    q: "¿En qué situaciones está prohibido adelantar en una vía interurbana colombiana?",
    opts: ["Está permitido siempre que el carril contrario esté libre", "Solo cuando hay señal de no adelantar", "En curvas, puentes, túneles, cruces, zonas de niebla o línea continua", "Solo en curvas pronunciadas"],
    ans: 2,
    exp: "El adelantamiento está prohibido en curvas, puentes, túneles, cruces de vías, con neblina o lluvia intensa, y donde haya línea amarilla continua. Son zonas de visibilidad reducida con alto riesgo de colisión frontal."
  },
  {
    cat: "Fatiga y conducción",
    q: "¿Cuántas horas continuas máximas puede conducir un transportador de carga antes de tomar un descanso obligatorio?",
    opts: ["12 horas", "4 horas", "6 horas", "8 horas"],
    ans: 2,
    exp: "Después de 6 horas continuas de conducción, el conductor debe descansar mínimo 30 minutos. La fatiga al volante es una causa frecuente de accidentes en vías nacionales como la Marginal del Llano."
  },
  {
    cat: "Fatiga y conducción",
    q: "¿Cuál de las siguientes señales indica que un conductor está en riesgo de quedarse dormido al volante?",
    opts: ["Mayor concentración en la vía", "Aumento de la velocidad de reacción", "Sensación de calor en el vehículo", "Parpadeo frecuente, dificultad para mantener los ojos abiertos y microdesvíos de carril"],
    ans: 3,
    exp: "El parpadeo excesivo, los microdesvíos involuntarios y la dificultad para mantener la vista enfocada son señales claras de fatiga extrema. Ante estas señales, el conductor debe detenerse de inmediato en un lugar seguro."
  },
  {
    cat: "Cinturón y seguridad pasiva",
    q: "¿En qué asientos del vehículo es obligatorio el uso del cinturón de seguridad en Colombia?",
    opts: ["Solo el conductor", "Solo en viajes fuera del perímetro urbano", "En todos los asientos, incluyendo los pasajeros traseros", "Solo en los asientos delanteros"],
    ans: 2,
    exp: "El cinturón es obligatorio para todos los ocupantes del vehículo, incluyendo pasajeros traseros. En caso de accidente, los pasajeros sin cinturón trasero pueden proyectarse hacia delante y causar lesiones graves a los ocupantes delanteros."
  },
  {
    cat: "Cinturón y seguridad pasiva",
    q: "¿Cómo debe viajar un niño menor de 10 años o menor de 1,45 m de estatura en un vehículo particular?",
    opts: ["En el asiento delantero si el conductor puede vigilarlo", "En una silla o sistema de retención infantil homologado, instalado en el asiento trasero", "En la falda de un adulto con cinturón compartido", "En el asiento trasero con cinturón normal"],
    ans: 1,
    exp: "La ley colombiana exige el uso de silla de retención infantil homologada para niños menores de 10 años o menores de 1,45 m. Debe ubicarse siempre en el asiento trasero del vehículo."
  },
  {
    cat: "Vías y condiciones",
    q: "En las vías de los Llanos Orientales, ¿qué riesgo especial presentan los animales sueltos en la carretera durante la noche?",
    opts: ["El peligro es mínimo porque los animales evitan las vías iluminadas", "Ninguno si el conductor lleva las luces encendidas", "Solo son peligrosos para motociclistas, no para vehículos grandes", "Alta peligrosidad: los animales no tienen reflectores y pueden aparecer repentinamente, causando colisiones fatales"],
    ans: 3,
    exp: "En el piedemonte llanero y los llanos de Casanare es frecuente encontrar ganado y fauna silvestre en la vía, especialmente de noche. Los animales no tienen reflectores y pueden aparecer de repente, siendo uno de los factores de accidentalidad más subestimados en la región."
  }
];

// ── Estado del quiz ──
let actual     = 0;
let respuestas = new Array(preguntas.length).fill(null);
let mostradas  = new Array(preguntas.length).fill(false);

// ── Tips de seguridad ──
const tips = [
  "En Casanare, las motocicletas están involucradas en más del 60 % de los accidentes de tránsito reportados. Conocer las normas salva vidas.",
  "El uso del cinturón de seguridad reduce en un 45 % el riesgo de muerte en accidentes de tránsito.",
  "Cada año, más de 7.000 personas mueren en las vías colombianas. La mayoría de accidentes son prevenibles.",
  "El tiempo de reacción promedio de un conductor es de 1 segundo. A 80 km/h, recorres 22 metros antes de frenar.",
  "Conducir usando el celular multiplica por 4 el riesgo de sufrir un accidente.",
  "El exceso de velocidad es la principal causa de muerte en carretera. Reducir 10 km/h puede salvar vidas.",
  "En Colombia, los peatones representan el 20 % de las víctimas fatales en accidentes de tránsito.",
  "El 35 % de los accidentes mortales en vías colombianas están relacionados con el consumo de alcohol.",
  "Conducir de noche sin luces encendidas multiplica por 3 el riesgo de atropellar a un peatón.",
  "Usar audífonos mientras se conduce o se camina reduce la capacidad de reacción ante peligros.",
  "Los niños siempre deben viajar en silla infantil homologada, independientemente de la distancia del trayecto.",
  "La fatiga al volante puede ser tan peligrosa como conducir bajo los efectos del alcohol.",
  "Respetar la señal de ceda el paso reduce en un 30 % los accidentes en intersecciones.",
  "En vías rurales de Casanare, los animales sueltos causan decenas de accidentes cada año, especialmente de noche.",
  "Mantener los neumáticos con la presión correcta puede reducir el consumo de combustible y mejorar la seguridad.",
  "Los motociclistas que usan chaleco reflectivo son detectados por otros conductores hasta 3 veces antes.",
  "Un peatón impactado a 50 km/h tiene un 80 % de probabilidad de morir; a 30 km/h esa probabilidad baja al 10 %.",
  "En Colombia es obligatorio llevar siempre el kit de carretera: botiquín, extintor, triángulos y llanta de repuesto.",
  "Adelantar en zonas prohibidas (curvas, puentes, doble línea) es una de las causas más frecuentes de accidentes frontales.",
  "Usar luces bajas de día hace que tu vehículo sea visible desde 140 m más de distancia para otros conductores."
];

let tipActual = 0;
let tipTimer  = null;

function irATip(idx) {
  if (idx === tipActual) return;
  const el = document.getElementById('tip-text');
  el.classList.add('saliendo');
  setTimeout(() => {
    tipActual = idx;
    el.innerHTML = `<strong>¿Sabías que?</strong> ${tips[tipActual]}`;
    el.classList.remove('saliendo');
  }, 300);
  reiniciarTimer();
}

function siguienteTip() {
  irATip((tipActual + 1) % tips.length);
}

function reiniciarTimer() {
  clearInterval(tipTimer);
  tipTimer = setInterval(siguienteTip, 5000);
}

function iniciarTips() {
  document.getElementById('tip-text').innerHTML = `<strong>¿Sabías que?</strong> ${tips[0]}`;
  reiniciarTimer();
}

// ── Render de pregunta ──
function render() {
  const p = preguntas[actual];
  const letras = ['A','B','C','D'];
  const pct = Math.round(((actual + 1) / preguntas.length) * 100);

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${actual + 1} / ${preguntas.length}`;

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  btnPrev.disabled = actual === 0;

  const esUltima = actual === preguntas.length - 1;
  const todasRespondidas = respuestas.every(r => r !== null);
  if (esUltima && todasRespondidas) {
    btnNext.textContent = 'Ver resultado →';
  } else if (esUltima) {
    btnNext.textContent = 'Ver resultado →';
  } else {
    btnNext.textContent = 'Siguiente →';
  }

  let html = `<div class="q-card">
    <div class="q-eyebrow">
      <div class="q-num-badge">${actual + 1}</div>
      <span class="q-category">${p.cat}</span>
    </div>
    <div class="q-text">${p.q}</div>
    <div class="options">`;

  p.opts.forEach((opt, i) => {
    let cls = 'opt-btn';
    let dis = '';
    if (mostradas[actual]) {
      dis = 'disabled';
      if (i === p.ans) cls += ' correct';
      else if (respuestas[actual] === i && i !== p.ans) cls += ' wrong';
    } else if (respuestas[actual] === i) {
      cls += ' selected';
    }
    html += `<button class="${cls}" onclick="elegir(${i})" ${dis}>
      <span class="opt-letter">${letras[i]}</span>
      <span>${opt}</span>
    </button>`;
  });

  html += `</div>`;

  if (mostradas[actual]) {
    const correcto = respuestas[actual] === p.ans;
    html += `<div class="feedback ${correcto ? 'ok' : 'ko'}">
      <span class="feedback-icon">${correcto ? '✅' : '❌'}</span>
      <div class="feedback-body"><strong>${correcto ? 'Correcto.' : 'Incorrecto.'}</strong> ${p.exp}</div>
    </div>`;
  }

  html += `</div>`;
  document.getElementById('q-area').innerHTML = html;
}

// ── Elegir respuesta ──
function elegir(i) {
  if (mostradas[actual]) return;
  respuestas[actual] = i;
  mostradas[actual]  = true;

  const correcto = i === preguntas[actual].ans;
  mostrarAnimacion(correcto);
  render();

  setTimeout(() => {
    const card = document.querySelector('.q-card');
    if (card) card.classList.add(correcto ? 'anim-success' : 'anim-failure');
  }, 10);
}

// ── Animación de respuesta ──
function mostrarAnimacion(correcto) {
  const overlay = document.createElement('div');
  overlay.className = 'anim-overlay ' + (correcto ? 'success' : 'failure');

  const icon  = document.createElement('div');
  icon.className = 'anim-icon';
  icon.textContent = correcto ? '✅' : '❌';

  const label = document.createElement('div');
  label.className = 'anim-label';
  label.textContent = correcto ? '¡Correcto!' : '¡Incorrecto!';

  overlay.appendChild(icon);
  overlay.appendChild(label);
  document.body.appendChild(overlay);

  if (correcto) lanzarConfetti();

  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 380);
  }, 900);
}

// ── Confetti ──
function lanzarConfetti() {
  const colores = ['#1E88E5','#43A047','#F9A825','#0D3B6E','#81C784','#FFD54F','#64B5F6'];
  for (let k = 0; k < 28; k++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left   = Math.random() * 100 + 'vw';
    p.style.top    = (Math.random() * 30 + 10) + 'vh';
    p.style.background = colores[Math.floor(Math.random() * colores.length)];
    p.style.width  = (Math.random() * 8 + 6) + 'px';
    p.style.height = (Math.random() * 8 + 6) + 'px';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.animationDelay    = (Math.random() * 0.3) + 's';
    p.style.animationDuration = (Math.random() * 0.5 + 0.7) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1400);
  }
}

// ── Navegación ──
function navNext() {
  if (actual < preguntas.length - 1) {
    actual++;
    render();
  } else {
    mostrarResultado();
  }
}

function navPrev() {
  if (actual > 0) { actual--; render(); }
}

// ── Pantalla de resultado ──
function mostrarResultado() {
  const correctas = respuestas.reduce((acc, r, i) => acc + (r === preguntas[i].ans ? 1 : 0), 0);
  const total     = preguntas.length;
  const pct       = Math.round((correctas / total) * 100);

  document.getElementById('quiz-screen').style.display   = 'none';
  document.getElementById('result-screen').style.display = 'block';

  document.getElementById('res-score').textContent       = `${correctas} / ${total}`;
  document.getElementById('res-correctas').textContent   = `✓ ${correctas} correctas`;
  document.getElementById('res-incorrectas').textContent = `✗ ${total - correctas} incorrectas`;
  document.getElementById('res-pct').textContent         = `${pct} %`;

  setTimeout(() => {
    document.getElementById('res-bar').style.width = pct + '%';
  }, 100);

  let trophy = '🏆', msg = '';
  if (pct >= 90) {
    trophy = '🏆';
    msg = '¡Excelente! Tienes un conocimiento sólido sobre seguridad vial. Eres un ejemplo para la comunidad de Yopal. Comparte estos conocimientos con tu familia y amigos para seguir reduciendo la accidentalidad en Casanare.';
  } else if (pct >= 70) {
    trophy = '🥈';
    msg = '¡Muy bien! Tienes buenas bases en seguridad vial. Repasa los temas donde tuviste errores, especialmente las normas para motociclistas y las señales de tránsito. Cada detalle que aprendas puede salvar una vida.';
  } else if (pct >= 50) {
    trophy = '⚠️';
    msg = 'Conocimiento básico. Hay aspectos importantes que debes reforzar. En Yopal y Casanare la accidentalidad es un problema serio — conocer bien las reglas es el primer paso para ser un conductor o peatón más seguro.';
  } else {
    trophy = '📚';
    msg = 'Necesitas repasar las normas de tránsito. No te desanimes: este cuestionario es una oportunidad para aprender. Te recomendamos estudiar el Código Nacional de Tránsito y volver a intentarlo. Juntos podemos hacer las vías de Casanare más seguras.';
  }

  document.getElementById('res-trophy').textContent = trophy;
  document.getElementById('res-msg').textContent    = msg;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Reiniciar quiz ──
function restart() {
  actual     = 0;
  respuestas = new Array(preguntas.length).fill(null);
  mostradas  = new Array(preguntas.length).fill(false);
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display   = 'block';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Inicialización ──
render();
iniciarTips();
