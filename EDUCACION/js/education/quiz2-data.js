window.quiz2Data = [
  {
    id: 6,
    tipo: "opcion unica",
    categoria: "Semaforos",
    pregunta: "Que indica la luz amarilla del semaforo para el conductor?",
    opciones: [
      "Acelerar para pasar antes de la roja",
      "Prepararse para detenerse si puede hacerlo con seguridad",
      "Parquear en la interseccion",
      "Ignorar el semaforo si no hay trafico"
    ],
    correcta: 1,
    explicacion: "La luz amarilla anuncia cambio a rojo. Se debe detener si hay distancia segura; si ya esta muy cerca, cruzar con precaucion."
  },
  {
    id: 7,
    tipo: "verdadero/falso",
    categoria: "Color de senales",
    pregunta: "Verdadero o falso: las senales preventivas suelen ser amarillas y advierten riesgos o condiciones de la via.",
    opciones: ["Verdadero", "Falso"],
    correcta: 0,
    explicacion: "Las senales preventivas advierten peligros como curvas, cruces, peatones, pendientes o animales en la via."
  },
  {
    id: 8,
    tipo: "multiple",
    categoria: "Primeros auxilios viales",
    pregunta: "Si ves un accidente con heridos, que acciones son correctas?",
    opciones: [
      "Asegurar la zona para evitar otro choque",
      "Llamar a emergencias",
      "Mover a todos los heridos aunque no haya peligro",
      "No invadir la escena ni generar aglomeracion"
    ],
    correctas: [0, 1, 3],
    explicacion: "Primero se protege la escena y se llama a emergencias. No se deben mover heridos salvo riesgo inmediato como incendio."
  },
  {
    id: 9,
    tipo: "si/no",
    categoria: "Celular",
    pregunta: "Es seguro escribir mensajes mientras conduces si el vehiculo va despacio?",
    opciones: ["Si", "No"],
    correcta: 1,
    explicacion: "No. Escribir o manipular el celular reduce la atencion y aumenta el riesgo incluso a baja velocidad."
  },
  {
    id: 10,
    tipo: "opcion unica",
    categoria: "Velocidad",
    imagen: "img/education/img-SenalesTransito/velocidad_maxima.png",
    alt: "Senal de velocidad maxima",
    pregunta: "Que indica una senal circular con borde rojo y un numero en el centro?",
    opciones: [
      "Velocidad recomendada",
      "Velocidad maxima permitida en ese tramo",
      "Distancia al proximo municipio",
      "Numero de carril obligatorio"
    ],
    correcta: 1,
    explicacion: "Las senales circulares con borde rojo son reglamentarias. Cuando tienen un numero, fijan el limite maximo de velocidad."
  }
];

window.tipsData = [
  "Mirar dos segundos el celular a 40 km/h equivale a recorrer mas de 20 metros casi a ciegas.",
  "La distancia de seguridad debe aumentar con lluvia, noche, carga pesada o via en mal estado.",
  "Las senales preventivas advierten; las reglamentarias ordenan; las informativas orientan."
];
