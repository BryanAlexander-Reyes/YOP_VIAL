/**
 * SEGURIDAD VIAL — Quiz Interactivo
 * Módulo principal de lógica del cuestionario
 */

// ──────────────────────────────────────────────
// BANCO DE PREGUNTAS
// ──────────────────────────────────────────────

const BANCO_PREGUNTAS = [
  {
    id: 1,
    categoria: "Señales de Tránsito",
    icono: "🚦",
    pregunta: "¿Qué significa una señal de tránsito con forma octagonal (octágono) y color rojo?",
    opciones: [
      "Disminuir la velocidad y continuar con precaución",
      "Detenerse completamente antes de la línea de pare",
      "Ceder el paso a vehículos que vengan de la derecha",
      "Zona escolar, velocidad máxima 30 km/h"
    ],
    correcta: 1,
    explicacion: "La señal de PARE (octagonal roja) exige detenerse completamente antes de la línea de pare o cruce peatonal. No es suficiente reducir la velocidad; el vehículo debe estar en reposo total antes de continuar."
  },
  {
    id: 2,
    categoria: "Velocidades Permitidas",
    icono: "🏎️",
    pregunta: "En Colombia, ¿cuál es la velocidad máxima permitida dentro de una zona urbana para vehículos particulares, según el Código Nacional de Tránsito?",
    opciones: [
      "40 km/h",
      "50 km/h",
      "60 km/h",
      "80 km/h"
    ],
    correcta: 2,
    explicacion: "El Código Nacional de Tránsito (Ley 769 de 2002) establece 60 km/h como la velocidad máxima en zonas urbanas para vehículos particulares. En zonas escolares y residenciales esta cifra baja a 30 km/h."
  },
  {
    id: 3,
    categoria: "Peatones y Ciclistas",
    icono: "🚶",
    pregunta: "¿En qué lugar tiene prioridad absoluta el peatón para cruzar la vía?",
    opciones: [
      "Donde el semáforo esté en verde para vehículos",
      "En cualquier lugar de la vía si levanta la mano",
      "En el paso cebra o zona peatonal demarcada",
      "Solo cuando no haya vehículos a la vista"
    ],
    correcta: 2,
    explicacion: "El paso cebra o zona peatonal demarcada es el espacio donde el peatón tiene derecho de vía prioritario. Los conductores están obligados a detenerse para dejar pasar al peatón que ya inició el cruce."
  },
  {
    id: 4,
    categoria: "Alcohol y Conducción",
    icono: "🍺",
    pregunta: "¿Cuál es el nivel máximo de alcohol en sangre permitido para conducir un vehículo particular en Colombia?",
    opciones: [
      "0.4 gramos por litro de sangre",
      "0.8 gramos por litro de sangre",
      "0.2 gramos por litro de sangre",
      "Cero alcohol — tolerancia cero"
    ],
    correcta: 3,
    explicacion: "La Ley 1696 de 2013 establece tolerancia CERO de alcohol para conductores en Colombia. Cualquier nivel detectado es motivo de sanción grave, incluyendo inmovilización del vehículo y suspensión de la licencia."
  },
  {
    id: 5,
    categoria: "Cinturón de Seguridad",
    icono: "🔒",
    pregunta: "¿Quién está obligado a usar cinturón de seguridad dentro de un vehículo en Colombia?",
    opciones: [
      "Solo el conductor del vehículo",
      "Conductor y pasajero del asiento delantero",
      "Conductor y todos los pasajeros en asientos con cinturón",
      "Solo en viajes intermunicipales o de alta velocidad"
    ],
    correcta: 2,
    explicacion: "El Código de Tránsito obliga al conductor Y a todos los pasajeros a usar cinturón de seguridad en los asientos que lo tengan disponible. El conductor es responsable de verificar que todos los ocupantes lo usen."
  },
  {
    id: 6,
    categoria: "Distancias de Seguridad",
    icono: "📏",
    pregunta: "Al conducir a 60 km/h en condiciones normales, ¿cuál es la distancia mínima de seguridad recomendada respecto al vehículo de adelante?",
    opciones: [
      "10 metros",
      "20 metros",
      "40 metros",
      "60 metros"
    ],
    correcta: 2,
    explicacion: "A 60 km/h se recomienda al menos 40 metros de distancia (regla de 2-3 segundos). Esto considera el tiempo de reacción del conductor (~1 seg) más la distancia de frenado. En lluvia o mal estado de la vía esta distancia debe duplicarse."
  },
  {
    id: 7,
    categoria: "Señales de Tránsito",
    icono: "⚠️",
    pregunta: "¿Qué indica una señal triangular con borde rojo y el interior blanco con un símbolo en negro?",
    opciones: [
      "Una señal informativa de servicios cercanos",
      "Una señal de advertencia o peligro próximo",
      "Una señal de prohibición absoluta",
      "Una señal de zona de velocidad reducida"
    ],
    correcta: 1,
    explicacion: "Las señales triangulares con borde rojo son señales PREVENTIVAS o de advertencia. Indican un peligro próximo (curva, cruce, pendiente, etc.) y el conductor debe reducir la velocidad y aumentar la atención."
  },
  {
    id: 8,
    categoria: "Teléfono y Distractores",
    icono: "📱",
    pregunta: "¿Qué establece la ley colombiana sobre el uso del teléfono celular mientras se conduce?",
    opciones: [
      "Está permitido si se usa en modo manos libres",
      "Está prohibido en autopistas, permitido en ciudad",
      "Está totalmente prohibido sin importar el dispositivo",
      "Solo está prohibido para motos, no para carros"
    ],
    correcta: 0,
    explicacion: "La Ley 1843 de 2017 permite el uso del celular SOLO con dispositivos manos libres (audífonos, Bluetooth o soporte visible). Sostener el teléfono con la mano genera multa. Sin embargo, lo más seguro es evitar cualquier distracción."
  },
  {
    id: 9,
    categoria: "Primeros Auxilios Viales",
    icono: "🚑",
    pregunta: "Si presencias un accidente de tránsito con heridos, ¿cuál es la primera acción correcta?",
    opciones: [
      "Mover a los heridos del lugar del accidente inmediatamente",
      "Asegurar la escena, llamar a emergencias (123) y no mover víctimas",
      "Tomar fotos del accidente para el seguro antes de actuar",
      "Sacar a todos los heridos del vehículo para que respiren mejor"
    ],
    correcta: 1,
    explicacion: "Lo primero es ASEGURAR la escena (triángulos, luces) para evitar más accidentes, luego llamar al 123. NO mover a los heridos salvo riesgo de incendio, ya que moverlos puede agravar lesiones en columna vertebral."
  },
  {
    id: 10,
    categoria: "Motocicletas",
    icono: "🏍️",
    pregunta: "¿Qué elementos de protección son OBLIGATORIOS para el conductor y parrillero de una motocicleta en Colombia?",
    opciones: [
      "Solo casco para el conductor; el parrillero es opcional",
      "Casco, guantes, rodilleras y coderas obligatorios siempre",
      "Casco homologado para conductor y acompañante; chaleco reflectivo",
      "Casco y guantes solo en vías de alta velocidad"
    ],
    correcta: 2,
    explicacion: "La Ley 769 exige casco de seguridad homologado TANTO para el conductor como para el parrillero, más chaleco reflectivo con número de placa. Adicionalmente, guantes, rodilleras y botas son fuertemente recomendados."
  },
  {
    id: 11,
    categoria: "Semáforos",
    icono: "🚥",
    pregunta: "¿Qué debe hacer un conductor cuando la luz amarilla del semáforo se enciende?",
    opciones: [
      "Acelerar para cruzar antes de que cambie a roja",
      "Prepararse para detenerse si puede hacerlo de forma segura",
      "Mantener la velocidad actual y continuar el cruce",
      "Detenerse en seco inmediatamente donde esté"
    ],
    correcta: 1,
    explicacion: "La luz amarilla indica que la señal va a cambiar a roja. El conductor debe PREPARARSE para detenerse si puede hacerlo de manera segura. Solo si está demasiado cerca de la línea de stop puede continuar con precaución."
  },
  {
    id: 12,
    categoria: "Fatiga al Volante",
    icono: "😴",
    pregunta: "¿Cada cuántas horas de conducción continua se recomienda tomar un descanso para combatir la fatiga?",
    opciones: [
      "Cada 6 horas de conducción ininterrumpida",
      "Cada 4 horas si se siente cansancio",
      "Cada 2 horas, con pausas de al menos 15-20 minutos",
      "Solo cuando el conductor sienta sueño fuerte"
    ],
    correcta: 2,
    explicacion: "Los expertos en seguridad vial recomiendan parar cada 2 horas para descansar al menos 15-20 minutos. La fatiga al volante reduce los reflejos igual que el alcohol. Esperar a sentir sueño puede ser demasiado tarde."
  }
];

// ──────────────────────────────────────────────
// ESTADO DEL QUIZ
// ──────────────────────────────────────────────

const estado = {
  preguntas: [],
  indice: 0,
  puntaje: 0,
  correctas: 0,
  incorrectas: 0,
  respondida: false,
  totalPreguntas: 10
};

// ──────────────────────────────────────────────
// UTILIDADES
// ──────────────────────────────────────────────

/**
 * Mezcla un arreglo de forma aleatoria (Fisher-Yates)
 * @param {Array} arr
 * @returns {Array}
 */
function mezclarArreglo(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Calcula el mensaje de resultado según el porcentaje
 * @param {number} porcentaje
 * @returns {{emoji: string, titulo: string, mensaje: string}}
 */
function obtenerMensajeResultado(porcentaje) {
  if (porcentaje >= 90) {
    return {
      emoji: "🏆",
      titulo: "¡Experto en Seguridad Vial!",
      mensaje: "Excelente desempeño. Tus conocimientos sobre tránsito son sobresalientes. ¡Eres un ejemplo en la vía!"
    };
  } else if (porcentaje >= 70) {
    return {
      emoji: "🌟",
      titulo: "¡Muy buen resultado!",
      mensaje: "Tienes una buena base de conocimientos viales. Refuerza los temas en los que fallaste y serás un conductor modelo."
    };
  } else if (porcentaje >= 50) {
    return {
      emoji: "📚",
      titulo: "Resultado aceptable",
      mensaje: "Conoces algunas normas básicas, pero hay aspectos importantes por mejorar. Te recomendamos estudiar más el Código de Tránsito."
    };
  } else {
    return {
      emoji: "⚠️",
      titulo: "Necesitas repasar",
      mensaje: "Tus conocimientos viales requieren refuerzo urgente. La seguridad en la vía depende de conocer y aplicar las normas. ¡Inténtalo de nuevo!"
    };
  }
}

/**
 * Genera el color del arco del medidor según el porcentaje
 * @param {number} porcentaje
 * @returns {string}
 */
function obtenerColorMedidor(porcentaje) {
  if (porcentaje >= 70) return '#2E7D32';
  if (porcentaje >= 50) return '#F9A825';
  return '#C62828';
}

// ──────────────────────────────────────────────
// CONTROL DE PANTALLAS
// ──────────────────────────────────────────────

/**
 * Muestra una pantalla específica y oculta el resto
 * @param {string} idPantalla
 */
function mostrarPantalla(idPantalla) {
  document.querySelectorAll('.pantalla').forEach(p => {
    p.classList.remove('activa', 'fade-enter');
  });
  const pantalla = document.getElementById(idPantalla);
  if (pantalla) {
    pantalla.classList.add('activa', 'fade-enter');
  }
}

// ──────────────────────────────────────────────
// INICIO DEL QUIZ
// ──────────────────────────────────────────────

function iniciarQuiz() {
  // Seleccionar preguntas aleatorias
  estado.preguntas = mezclarArreglo(BANCO_PREGUNTAS).slice(0, estado.totalPreguntas);
  estado.indice = 0;
  estado.puntaje = 0;
  estado.correctas = 0;
  estado.incorrectas = 0;
  estado.respondida = false;

  mostrarPantalla('pantalla-quiz');
  renderizarPregunta();
}

// ──────────────────────────────────────────────
// RENDERIZADO DE PREGUNTA
// ──────────────────────────────────────────────

function renderizarPregunta() {
  const pregunta = estado.preguntas[estado.indice];
  const total = estado.totalPreguntas;
  const actual = estado.indice + 1;

  estado.respondida = false;

  // Progreso
  const porcentajeProgreso = ((estado.indice) / total) * 100;
  document.getElementById('barra-progreso').style.width = porcentajeProgreso + '%';
  document.getElementById('contador-actual').textContent = actual;
  document.getElementById('contador-total').textContent = total;

  // Meta info
  document.getElementById('cat-icono').textContent = pregunta.icono;
  document.getElementById('cat-nombre').textContent = pregunta.categoria;

  // Pregunta
  document.getElementById('numero-pregunta').textContent = `Pregunta ${actual} de ${total}`;
  document.getElementById('texto-pregunta').textContent = pregunta.pregunta;

  // Opciones
  const contenedor = document.getElementById('opciones-contenedor');
  contenedor.innerHTML = '';
  const letras = ['A', 'B', 'C', 'D'];

  pregunta.opciones.forEach((opcion, index) => {
    const btn = document.createElement('button');
    btn.className = 'opcion-btn';
    btn.innerHTML = `
      <span class="opcion-letra">${letras[index]}</span>
      <span class="opcion-texto">${opcion}</span>
    `;
    btn.addEventListener('click', () => seleccionarOpcion(index));
    contenedor.appendChild(btn);
  });

  // Ocultar feedback
  const feedback = document.getElementById('feedback-box');
  feedback.style.display = 'none';
  feedback.className = 'feedback-box';

  // Botones
  document.getElementById('btn-siguiente').disabled = true;
  document.getElementById('btn-siguiente').textContent =
    (actual < total) ? 'Siguiente →' : 'Ver Resultados';
}

// ──────────────────────────────────────────────
// SELECCIÓN DE OPCIÓN
// ──────────────────────────────────────────────

function seleccionarOpcion(indiceSeleccion) {
  if (estado.respondida) return;
  estado.respondida = true;

  const pregunta = estado.preguntas[estado.indice];
  const esCorrecta = indiceSeleccion === pregunta.correcta;
  const botones = document.querySelectorAll('.opcion-btn');

  // Puntaje: respuesta correcta = 10 puntos
  if (esCorrecta) {
    estado.puntaje += 10;
    estado.correctas++;
  } else {
    estado.incorrectas++;
  }

  // Estilos de los botones
  botones.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === pregunta.correcta) {
      btn.classList.add('correcta');
    } else if (idx === indiceSeleccion && !esCorrecta) {
      btn.classList.add('incorrecta');
    } else {
      btn.classList.add('sin-marcar');
    }
  });

  // Mostrar feedback
  mostrarFeedback(esCorrecta, pregunta.explicacion);

  // Habilitar botón siguiente
  document.getElementById('btn-siguiente').disabled = false;
}

// ──────────────────────────────────────────────
// FEEDBACK
// ──────────────────────────────────────────────

function mostrarFeedback(esCorrecta, explicacion) {
  const box = document.getElementById('feedback-box');
  box.style.display = 'flex';
  box.className = 'feedback-box ' + (esCorrecta ? 'ok' : 'mal');
  box.innerHTML = `
    <span class="feedback-icono">${esCorrecta ? '✅' : '❌'}</span>
    <div>
      <strong>${esCorrecta ? '¡Correcto!' : 'Incorrecto'}</strong>
      ${explicacion}
    </div>
  `;
}

// ──────────────────────────────────────────────
// SIGUIENTE PREGUNTA
// ──────────────────────────────────────────────

function siguientePregunta() {
  if (!estado.respondida) return;

  estado.indice++;

  if (estado.indice >= estado.totalPreguntas) {
    mostrarResultados();
  } else {
    renderizarPregunta();
  }
}

// ──────────────────────────────────────────────
// RESULTADOS
// ──────────────────────────────────────────────

function mostrarResultados() {
  const porcentaje = Math.round((estado.correctas / estado.totalPreguntas) * 100);
  const info = obtenerMensajeResultado(porcentaje);

  // Actualizar barra al 100%
  document.getElementById('barra-progreso').style.width = '100%';

  // Cambiar a pantalla de resultados
  mostrarPantalla('pantalla-resultado');

  // Emoji y título
  document.getElementById('resultado-emoji').textContent = info.emoji;
  document.getElementById('resultado-titulo').textContent = info.titulo;
  document.getElementById('resultado-mensaje').textContent = info.mensaje;

  // Desglose
  document.getElementById('res-correctas').textContent = estado.correctas;
  document.getElementById('res-incorrectas').textContent = estado.incorrectas;
  document.getElementById('res-puntaje').textContent = estado.puntaje;

  // Medidor circular
  animarMedidor(porcentaje);
}

/**
 * Anima el arco del medidor circular de resultados
 * @param {number} porcentaje
 */
function animarMedidor(porcentaje) {
  const radio = 60;
  const circunferencia = 2 * Math.PI * radio;
  const arco = document.getElementById('medidor-arco');
  const textoPct = document.getElementById('medidor-pct');
  const color = obtenerColorMedidor(porcentaje);

  arco.style.stroke = color;
  arco.style.strokeDasharray = circunferencia;
  arco.style.strokeDashoffset = circunferencia; // empieza vacío

  // Animar porcentaje como número
  let contador = 0;
  const intervalo = setInterval(() => {
    contador += 2;
    if (contador > porcentaje) contador = porcentaje;
    textoPct.textContent = contador + '%';

    // Arco proporcional
    const offset = circunferencia - (contador / 100) * circunferencia;
    arco.style.strokeDashoffset = offset;

    if (contador >= porcentaje) clearInterval(intervalo);
  }, 20);
}

// ──────────────────────────────────────────────
// INICIALIZACIÓN
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Mostrar pantalla de inicio
  mostrarPantalla('pantalla-inicio');

  // Botón iniciar
  document.getElementById('btn-iniciar').addEventListener('click', iniciarQuiz);

  // Botón siguiente
  document.getElementById('btn-siguiente').addEventListener('click', siguientePregunta);

  // Botón reintentar
  document.getElementById('btn-reintentar').addEventListener('click', iniciarQuiz);

  // Botón inicio (desde resultados)
  document.getElementById('btn-inicio').addEventListener('click', () => {
    mostrarPantalla('pantalla-inicio');
  });
});