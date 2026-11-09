/**
 * ============================================================
 *  Crepúsculo Wiki — Datos del sitio
 *  ------------------------------------------------------------
 *  Este archivo concentra la información reutilizable:
 *   1. PERSONAJES  → fichas completas que se muestran en el modal.
 *   2. PREGUNTAS   → banco de preguntas del quiz interactivo.
 *
 *  Al separar los datos de la interfaz mantenemos el proyecto
 *  modular: para añadir un personaje o una pregunta solo hay que
 *  editar este archivo, sin tocar el HTML ni la lógica de app.js.
 *
 *  Aviso: contenido con fines educativos y sin ánimo de lucro.
 * ============================================================
 */

/* ------------------------------------------------------------
   1. PERSONAJES
   Cada clave (bella, edward, jacob…) se usa en el atributo
   data-personaje de las tarjetas del HTML.
   ------------------------------------------------------------ */
const PERSONAJES = {
  bella: {
    nombre: "Bella Swan",
    actor: "Kristen Stewart",
    especie: "Humana",
    categoria: "humanos",
    imagen: "assets/img/bella.jpg",
    descripcion:
      "Isabella Marie Swan es una adolescente de Phoenix que se muda a Forks para vivir con su padre, Charlie. Es curiosa, sensible y obstinada; no termina de encajar en su nuevo instituto hasta que conoce a Edward Cullen. Su sangre ejerce una atracción irresistible sobre los vampiros, lo que la convierte en el centro de un conflicto ancestral. A lo largo de la saga deberá elegir entre el amor de Edward y la amistad de Jacob.",
    cita: "«No tengo miedo de ti.»",
    datos: [
      ["Nombre completo", "Isabella Marie Swan"],
      ["Edad en la película", "17 años"],
      ["Origen", "Phoenix, Arizona"],
      ["Familia", "Charlie Swan (padre) y Renée Dwyer (madre)"]
    ]
  },

  edward: {
    nombre: "Edward Cullen",
    actor: "Robert Pattinson",
    especie: "Vampiro",
    categoria: "vampiros",
    imagen: "assets/img/edward.jpg",
    descripcion:
      "Edward Cullen nació en Chicago en 1901 y fue convertido en vampiro por Carlisle en 1918. Aparenta 17 años y asiste al instituto de Forks junto a sus hermanos. Puede leer la mente de casi todas las personas, excepto la de Bella, un misterio que lo atrae de inmediato. Aunque teme hacerle daño, se enamora de ella y decide protegerla de los peligros de su mundo.",
    cita: "«Y así, el león se enamoró de la oveja.»",
    datos: [
      ["Nacimiento", "20 de junio de 1901"],
      ["Conversión", "1918, por Carlisle Cullen"],
      ["Habilidad", "Telepatía (excepto con Bella)"],
      ["Familia", "Los Cullen"]
    ]
  },

  jacob: {
    nombre: "Jacob Black",
    actor: "Taylor Lautner",
    especie: "Licántropo",
    categoria: "licantropos",
    imagen: "assets/img/jacob.jpg",
    descripcion:
      "Jacob Black es el mejor amigo de Bella en La Push y miembro de la tribu Quileute. Al principio es un adolescente alegre y bromista, pero pronto descubre su herencia: puede transformarse en un hombre lobo para proteger a su pueblo. Su lealtad hacia Bella se convierte en un amor no correspondido, dando forma al triángulo amoroso más recordado de la saga.",
    cita: "«Siempre estaré aquí para ti, Bella.»",
    datos: [
      ["Nacimiento", "14 de enero de 1990"],
      ["Tribu", "Quileute"],
      ["Especie", "Licántropo (hombre lobo)"],
      ["Manada", "Sam Uley"]
    ]
  },

  alice: {
    nombre: "Alice Cullen",
    actor: "Ashley Greene",
    especie: "Vampira",
    categoria: "vampiros",
    imagen: "assets/img/alice.jpg",
    descripcion:
      "Alice Cullen es una vampira con el don de ver posibles futuros. Fue convertida por Carlisle y es la pareja de Jasper. Su energía alegre, su estilo peculiar y su cariño por Bella la convierten en una de las aliadas más importantes de la familia. Gracias a sus visiones, anticipa peligros y ayuda a proteger a quienes quiere.",
    cita: "«Te he estado esperando, Bella.»",
    datos: [
      ["Especie", "Vampira"],
      ["Don", "Premoniciones"],
      ["Pareja", "Jasper Hale"],
      ["Familia", "Los Cullen"]
    ]
  },

  carlisle: {
    nombre: "Carlisle Cullen",
    actor: "Peter Facinelli",
    especie: "Vampiro",
    categoria: "vampiros",
    imagen: "assets/img/carlisle.jpg",
    descripcion:
      "Carlisle Cullen es el patriarca de la familia y un médico respetado en Forks. Nació en 1640 y fue convertido por un vampiro anciano; siglos después decidió alimentarse solo de sangre animal para no dañar a los humanos. Ha convertido a Esme, Edward, Rosalie, Emmett y Jasper, y dirige a su familia con compasión y firmeza.",
    cita: "«Somos diferentes. Podemos elegir.»",
    datos: [
      ["Nacimiento", "1640"],
      ["Profesión", "Médico"],
      ["Especie", "Vampiro"],
      ["Familia", "Los Cullen"]
    ]
  },

  esme: {
    nombre: "Esme Cullen",
    actor: "Elizabeth Reaser",
    especie: "Vampira",
    categoria: "vampiros",
    imagen: "assets/img/esme.jpg",
    descripcion:
      "Esme Cullen es la matriarca de la familia. Tras una vida marcada por la pérdida, fue convertida por Carlisle, de quien se enamoró. Su hogar es un refugio cálido para todos los Cullen y pronto abre sus puertas a Bella. Es paciente, afectuosa y profundamente protectora.",
    cita: "«Bienvenida a la familia, Bella.»",
    datos: [
      ["Especie", "Vampira"],
      ["Pareja", "Carlisle Cullen"],
      ["Familia", "Los Cullen"],
      ["Rasgo", "Protectora y cálida"]
    ]
  },

  rosalie: {
    nombre: "Rosalie Hale",
    actor: "Nikki Reed",
    especie: "Vampira",
    categoria: "vampiros",
    imagen: "assets/img/rosalie.jpg",
    descripcion:
      "Rosalie Hale es considerada la mujer más bella de Forks. Fue convertida por Carlisle después de sufrir una agresión, y desde entonces conserva un carácter orgulloso y distante. Aunque al principio desconfía de Bella, su lealtad a la familia termina imponiéndose. Su historia es una de las más trágicas del clan.",
    cita: "«No elegí esta vida.»",
    datos: [
      ["Especie", "Vampira"],
      ["Pareja", "Emmett Cullen"],
      ["Familia", "Los Cullen"],
      ["Rasgo", "Orgullosa y leal"]
    ]
  },

  emmett: {
    nombre: "Emmett Cullen",
    actor: "Kellan Lutz",
    especie: "Vampiro",
    categoria: "vampiros",
    imagen: "assets/img/emmett.jpg",
    descripcion:
      "Emmett Cullen es el hermano más fuerte y despreocupado de la familia. Carlisle lo convirtió tras un ataque de oso, y desde entonces disfruta de la fuerza sobrehumana que le otorga su nueva naturaleza. Es bromista, competitivo y protector; su vínculo con Rosalie es inquebrantable.",
    cita: "«¿Quién dijo que los vampiros no pueden divertirse?»",
    datos: [
      ["Especie", "Vampiro"],
      ["Pareja", "Rosalie Hale"],
      ["Familia", "Los Cullen"],
      ["Rasgo", "Fuerza sobrehumana"]
    ]
  },

  jasper: {
    nombre: "Jasper Hale",
    actor: "Jackson Rathbone",
    especie: "Vampiro",
    categoria: "vampiros",
    imagen: "assets/img/jasper.jpg",
    descripcion:
      "Jasper Hale nació en Texas en 1843 y fue convertido durante la Guerra Civil. Puede percibir y manipular las emociones de quienes lo rodean, un don que le ayuda a calmar a la familia. Su control sobre la sed de sangre humana es más difícil que para el resto, pero Alice lo acompaña en ese proceso.",
    cita: "«Puedo sentir lo que sientes.»",
    datos: [
      ["Nacimiento", "1843"],
      ["Especie", "Vampiro"],
      ["Don", "Empatía y control emocional"],
      ["Pareja", "Alice Cullen"]
    ]
  },

  charlie: {
    nombre: "Charlie Swan",
    actor: "Billy Burke",
    especie: "Humano",
    categoria: "humanos",
    imagen: "assets/img/charlie.jpg",
    descripcion:
      "Charlie Swan es el padre de Bella y el jefe de policía de Forks. Hombre de pocas palabras, demuestra su cariño con gestos sencillos: preparar el desayuno, preocuparse por sus horarios o intentar entender a su hija. Su relación con Bella es uno de los vínculos más cálidos de la película.",
    cita: "«Solo quiero que seas feliz, Bells.»",
    datos: [
      ["Profesión", "Jefe de policía"],
      ["Hija", "Bella Swan"],
      ["Residencia", "Forks, Washington"],
      ["Rasgo", "Reservado y protector"]
    ]
  },

  victoria: {
    nombre: "Victoria",
    actor: "Rachelle Lefevre",
    especie: "Vampira",
    categoria: "vampiros",
    imagen: "assets/img/victoria.jpg",
    descripcion:
      "Victoria es una vampira nómada y la pareja de James. Se caracteriza por su melena rojiza y su instinto de supervivencia. Cuando James muere a manos de los Cullen, Victoria jura vengarse de Bella, convirtiéndose en una amenaza que se extiende a lo largo de la saga.",
    cita: "«James era mío.»",
    datos: [
      ["Especie", "Vampira"],
      ["Pareja", "James"],
      ["Objetivo", "Vengar la muerte de James"],
      ["Rasgo", "Instinto de supervivencia"]
    ]
  },

  james: {
    nombre: "James",
    actor: "Cam Gigandet",
    especie: "Vampiro",
    categoria: "vampiros",
    imagen: "assets/img/james.jpg",
    descripcion:
      "James es un vampiro cazador con un olfato excepcional y un gusto particular por los desafíos. Al ver a Bella, decide perseguirla como parte de un juego macabro. Su habilidad para rastrear presas lo convierte en una amenaza directa para los Cullen y en el antagonista principal de la primera película.",
    cita: "«Que empiece el juego.»",
    datos: [
      ["Especie", "Vampiro"],
      ["Habilidad", "Rastreo excepcional"],
      ["Pareja", "Victoria"],
      ["Rol", "Antagonista principal"]
    ]
  },

  laurent: {
    nombre: "Laurent",
    actor: "Edi Gathegi",
    especie: "Vampiro",
    categoria: "vampiros",
    imagen: "assets/img/laurent.jpg",
    descripcion:
      "Laurent es un vampiro nómada de origen francés que viaja con James y Victoria. Más prudente que sus compañeros, prefiere evitar conflictos innecesarios, aunque su lealtad no es del todo clara. Su presencia añade tensión a la amenaza de los nómadas.",
    cita: "«No es prudente quedarse aquí.»",
    datos: [
      ["Especie", "Vampiro"],
      ["Grupo", "Nómadas"],
      ["Origen", "Francia"],
      ["Rasgo", "Prudente y calculador"]
    ]
  },

  billy: {
    nombre: "Billy Black",
    actor: "Gil Birmingham",
    especie: "Humano",
    categoria: "humanos",
    imagen: "assets/img/billy.jpg",
    descripcion:
      "Billy Black es el anciano de la tribu Quileute y padre de Jacob. Se desplaza en silla de ruedas, pero su sabiduría y su mirada serena lo convierten en una figura respetada. Conoce las leyendas de su pueblo y desconfía de los Cullen, aunque mantiene una relación cordial con Charlie Swan.",
    cita: "«Las leyendas de mi pueblo son más antiguas que este pueblo.»",
    datos: [
      ["Tribu", "Quileute"],
      ["Hijo", "Jacob Black"],
      ["Residencia", "La Push"],
      ["Rol", "Anciano y narrador de leyendas"]
    ]
  },

  renee: {
    nombre: "Renée Dwyer",
    actor: "Sarah Clarke",
    especie: "Humana",
    categoria: "humanos",
    imagen: "assets/img/renee.jpg",
    descripcion:
      "Renée Dwyer es la madre de Bella. Vive en Phoenix con su nuevo esposo, Phil, y mantiene con su hija una relación cercana y afectuosa. Aunque aparece brevemente en la película, su decisión de dejar que Bella viva con Charlie marca el inicio de toda la historia.",
    cita: "«Llámame cuando llegues, ¿vale?»",
    datos: [
      ["Hija", "Bella Swan"],
      ["Esposo", "Phil Dwyer"],
      ["Residencia", "Phoenix, Arizona"],
      ["Rasgo", "Maternal y cercana"]
    ]
  },

  sam: {
    nombre: "Sam Uley",
    actor: "Chaske Spencer",
    especie: "Licántropo",
    categoria: "licantropos",
    imagen: "assets/img/sam.jpg",
    descripcion:
      "Sam Uley es el líder de la manada de hombres lobo de La Push. Serio, disciplinado y protector, guía a los jóvenes Quileute que descubren su transformación. Su prioridad es mantener a salvo a la tribu frente a la amenaza de los vampiros, aunque su liderazgo también genera tensiones con Jacob.",
    cita: "«La manada es tu familia ahora.»",
    datos: [
      ["Especie", "Licántropo"],
      ["Rol", "Líder de la manada"],
      ["Tribu", "Quileute"],
      ["Manada", "La Push"]
    ]
  }
};

/* ------------------------------------------------------------
   2. PREGUNTAS DEL QUIZ
   `correcta` es el índice (base 0) de la opción verdadera.
   Cada pregunta incluye una imagen y su texto alternativo para
   cumplir con las recomendaciones de accesibilidad.
   ------------------------------------------------------------ */
const PREGUNTAS = [
  {
    imagen: "assets/img/forks.jpg",
    alt: "Letrero de bienvenida del pueblo de Forks, Washington, entre árboles",
    pregunta: "¿A qué pueblo se muda Bella al inicio de la película?",
    opciones: ["Phoenix", "Forks", "Seattle", "La Push"],
    correcta: 1,
    explicacion:
      "Bella deja Phoenix para vivir con su padre en Forks, un pequeño pueblo lluvioso de Washington."
  },
  {
    imagen: "assets/img/edward.jpg",
    alt: "Retrato de Edward Cullen con mirada intensa",
    pregunta: "¿Qué criatura sobrenatural es Edward Cullen?",
    opciones: ["Un licántropo", "Un vampiro", "Un fantasma", "Un brujo"],
    correcta: 1,
    explicacion:
      "Edward es un vampiro que se alimenta de sangre animal para no dañar a los humanos."
  },
  {
    imagen: "assets/img/escena-biologia.jpg",
    alt: "Bella y Edward sentados juntos en la clase de biología",
    pregunta: "¿Qué habilidad especial tiene Edward?",
    opciones: [
      "Ver el futuro",
      "Transformarse en lobo",
      "Leer la mente",
      "Controlar el clima"
    ],
    correcta: 2,
    explicacion:
      "Edward puede escuchar los pensamientos de las personas, pero no los de Bella."
  },
  {
    imagen: "assets/img/jacob.jpg",
    alt: "Retrato de Jacob Black sonriendo",
    pregunta: "¿Quién es el amigo licántropo de Bella?",
    opciones: ["Jacob Black", "Charlie Swan", "Mike Newton", "Carlisle Cullen"],
    correcta: 0,
    explicacion:
      "Jacob pertenece a la tribu Quileute y se transforma en hombre lobo para proteger La Push."
  },
  {
    imagen: "assets/img/escena-beisbol.jpg",
    alt: "Escena de béisbol de los Cullen durante una tormenta",
    pregunta: "¿Qué deporte juegan los Cullen durante la tormenta?",
    opciones: ["Fútbol", "Baloncesto", "Voleibol", "Béisbol"],
    correcta: 3,
    explicacion:
      "La familia aprovecha los truenos para jugar al béisbol sin que los humanos noten sus poderes."
  },
  {
    imagen: "assets/img/escena-prado.jpg",
    alt: "Bella y Edward tumbados en un prado lleno de flores",
    pregunta: "¿Qué lugar eligen Edward y Bella para hablar de su verdadera naturaleza?",
    opciones: [
      "La playa de La Push",
      "El prado escondido en el bosque",
      "La biblioteca del instituto",
      "El hospital de Forks"
    ],
    correcta: 1,
    explicacion:
      "En el prado, bajo el sol, Edward le muestra a Bella cómo brilla su piel."
  },
  {
    imagen: "assets/img/james.jpg",
    alt: "Retrato de James, el vampiro cazador",
    pregunta: "¿Quién es el vampiro cazador que persigue a Bella?",
    opciones: ["Laurent", "Carlisle", "James", "Emmett"],
    correcta: 2,
    explicacion:
      "James rastrea a Bella por deporte y desata el conflicto central de la película."
  },
  {
    imagen: "assets/img/charlie.jpg",
    alt: "Retrato de Charlie Swan con su uniforme de policía",
    pregunta: "¿Quién es el padre de Bella y sheriff de Forks?",
    opciones: ["Billy Black", "Charlie Swan", "Carlisle Cullen", "Phil Dwyer"],
    correcta: 1,
    explicacion:
      "Charlie Swan es el jefe de policía de Forks y el padre de Bella."
  },
  {
    imagen: "assets/img/catherine-hardwicke.jpg",
    alt: "Fotografía de la directora Catherine Hardwicke",
    pregunta: "¿Quién dirigió Crepúsculo (2008)?",
    opciones: [
      "Catherine Hardwicke",
      "Chris Weitz",
      "David Slade",
      "Bill Condon"
    ],
    correcta: 0,
    explicacion:
      "Catherine Hardwicke dirigió la primera película; Weitz, Slade y Condon dirigieron las secuelas."
  }
];
