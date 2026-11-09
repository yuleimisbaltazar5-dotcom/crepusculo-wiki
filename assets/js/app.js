/**
 * ============================================================
 *  Crepúsculo Wiki — Lógica de la interfaz
 *  ------------------------------------------------------------
 *  Módulos:
 *    1. Utilidades
 *    2. Navegación y botón "volver arriba"
 *    3. Buscador y filtros de personajes
 *    4. Modal de ficha de personaje
 *    5. Galería (lightbox)
 *    6. Calificación con estrellas y reseñas
 *    7. Quiz interactivo
 *
 *  No se usa ningún servidor: las reseñas y el mejor puntaje se
 *  guardan en localStorage. Si el navegador lo bloquea, la app
 *  sigue funcionando durante la sesión.
 * ============================================================
 */
(() => {
  "use strict";

  /* ------------------------------------------------------------
     1. UTILIDADES
     ------------------------------------------------------------ */
  const $ = (selector, contexto = document) => contexto.querySelector(selector);
  const $$ = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];

  /** Quita acentos, mayúsculas y espacios sobrantes para comparar. */
  const normalizar = (texto) =>
    (texto || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  /** Acceso seguro a localStorage (puede estar bloqueado). */
  const almacenamiento = {
    leer(clave, porDefecto = null) {
      try {
        const valor = window.localStorage.getItem(clave);
        return valor === null ? porDefecto : valor;
      } catch {
        return porDefecto;
      }
    },
    guardar(clave, valor) {
      try {
        window.localStorage.setItem(clave, valor);
        return true;
      } catch {
        return false;
      }
    },
    borrar(clave) {
      try {
        window.localStorage.removeItem(clave);
      } catch {
        /* Sin almacenamiento disponible: no hay nada que borrar. */
      }
    }
  };

  /* ------------------------------------------------------------
     2. NAVEGACIÓN Y BOTÓN "VOLVER ARRIBA"
     ------------------------------------------------------------ */
  const navbar = $("#navPrincipal");
  const btnArriba = $("#btnArriba");
  const enlacesNav = $$("#navPrincipal .nav-link");
  const secciones = $$("main section[id]");

  function actualizarInterfazScroll() {
    const y = window.scrollY;

    if (navbar) navbar.classList.toggle("is-scrolled", y > 10);
    if (btnArriba) btnArriba.classList.toggle("visible", y > 600);

    // Marca el enlace de la sección visible.
    let actual = "inicio";
    secciones.forEach((seccion) => {
      const inicio = seccion.offsetTop - 120;
      if (y >= inicio) actual = seccion.id;
    });

    enlacesNav.forEach((enlace) => {
      const esActual = enlace.getAttribute("href") === `#${actual}`;
      enlace.classList.toggle("active", esActual);
      if (esActual) enlace.setAttribute("aria-current", "page");
      else enlace.removeAttribute("aria-current");
    });
  }

  if (navbar) {
    window.addEventListener("scroll", actualizarInterfazScroll, { passive: true });
    actualizarInterfazScroll();
  }

  if (btnArriba) {
    btnArriba.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Cierra el menú móvil al elegir un enlace.
  const menuColapsable = $("#menuPrincipal");
  $$("#navPrincipal .nav-link").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      if (menuColapsable && menuColapsable.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menuColapsable).hide();
      }
    });
  });

  // Año dinámico del pie de página.
  const anioActual = $("#anioActual");
  if (anioActual) anioActual.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     3. BUSCADOR Y FILTROS DE PERSONAJES
     ------------------------------------------------------------ */
  const gridPersonajes = $("#gridPersonajes");
  const filtroTexto = $("#filtroTexto");
  const filtroCategoria = $("#filtroCategoria");
  const btnLimpiarFiltros = $("#btnLimpiarFiltros");
  const contadorPersonajes = $("#contadorPersonajes");
  const sinResultados = $("#sinResultados");
  const formBuscador = $("#formBuscador");
  const buscadorNav = $("#buscadorNav");

  function aplicarFiltrosPersonajes() {
    if (!gridPersonajes) return;

    const texto = normalizar(filtroTexto ? filtroTexto.value : "");
    const categoria = filtroCategoria ? filtroCategoria.value : "todos";
    const tarjetas = $$(".tw-personaje", gridPersonajes);
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
      const coincideTexto = normalizar(tarjeta.dataset.nombre).includes(texto);
      const coincideCategoria =
        categoria === "todos" || tarjeta.dataset.categoria === categoria;
      const mostrar = coincideTexto && coincideCategoria;

      tarjeta.classList.toggle("d-none", !mostrar);
      if (mostrar) visibles += 1;
    });

    if (contadorPersonajes) {
      contadorPersonajes.textContent =
        visibles === tarjetas.length
          ? `${visibles} personajes`
          : `${visibles} de ${tarjetas.length} personajes`;
    }

    if (sinResultados) sinResultados.classList.toggle("d-none", visibles !== 0);
  }

  if (filtroTexto) filtroTexto.addEventListener("input", aplicarFiltrosPersonajes);
  if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltrosPersonajes);

  if (btnLimpiarFiltros) {
    btnLimpiarFiltros.addEventListener("click", () => {
      if (filtroTexto) filtroTexto.value = "";
      if (filtroCategoria) filtroCategoria.value = "todos";
      aplicarFiltrosPersonajes();
      if (filtroTexto) filtroTexto.focus({ preventScroll: true });
    });
  }

  // El buscador del navbar reutiliza el filtro de la sección de personajes.
  if (formBuscador && buscadorNav) {
    formBuscador.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const consulta = buscadorNav.value.trim();

      if (filtroTexto) filtroTexto.value = consulta;
      if (filtroCategoria) filtroCategoria.value = "todos";
      aplicarFiltrosPersonajes();

      const seccionPersonajes = $("#personajes");
      if (seccionPersonajes) {
        seccionPersonajes.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (filtroTexto) filtroTexto.focus({ preventScroll: true });
    });
  }

  // Sincroniza el contador con el número real de tarjetas al cargar.
  aplicarFiltrosPersonajes();

  /* ------------------------------------------------------------
     4. MODAL DE FICHA DE PERSONAJE
     ------------------------------------------------------------ */
  const modalPersonaje = $("#modalPersonaje");

  if (modalPersonaje) {
    const claseBadge = {
      humanos: "tw-badge-humano",
      vampiros: "tw-badge-vampiro",
      licantropos: "tw-badge-licantropo"
    };

    modalPersonaje.addEventListener("show.bs.modal", (evento) => {
      const disparador = evento.relatedTarget;
      const clave = disparador ? disparador.dataset.personaje : null;
      const personaje = clave ? PERSONAJES[clave] : null;
      if (!personaje) return;

      const imagen = $("#personajeImagen");
      const nombre = $("#personajeNombre");
      const actor = $("#personajeActor");
      const especie = $("#personajeEspecie");
      const descripcion = $("#personajeDescripcion");
      const cita = $("#personajeCita");
      const datos = $("#personajeDatos");
      const titulo = $("#personajeModalLabel");

      if (imagen) {
        imagen.src = personaje.imagen;
        imagen.alt = `Retrato de ${personaje.nombre}`;
      }
      if (nombre) nombre.textContent = personaje.nombre;
      if (actor) actor.textContent = personaje.actor;
      if (titulo) titulo.textContent = personaje.nombre;
      if (descripcion) descripcion.textContent = personaje.descripcion;
      if (cita) cita.textContent = personaje.cita;

      if (especie) {
        especie.textContent = personaje.especie;
        especie.className = `tw-badge ${claseBadge[personaje.categoria] || "tw-badge-vampiro"}`;
      }

      if (datos) {
        datos.replaceChildren();
        personaje.datos.forEach(([termino, valor]) => {
          const dt = document.createElement("dt");
          const dd = document.createElement("dd");
          dt.textContent = termino;
          dd.textContent = valor;
          datos.append(dt, dd);
        });
      }
    });
  }

  /* ------------------------------------------------------------
     5. GALERÍA (LIGHTBOX)
     ------------------------------------------------------------ */
  const modalGaleria = $("#modalGaleria");

  if (modalGaleria) {
    modalGaleria.addEventListener("show.bs.modal", (evento) => {
      const disparador = evento.relatedTarget;
      if (!disparador) return;

      const imagen = $("#galeriaImagen");
      const titulo = $("#galeriaTitulo");
      const descripcion = $("#galeriaDescripcion");

      if (imagen) {
        imagen.src = disparador.dataset.img || "";
        imagen.alt = disparador.dataset.titulo
          ? `Imagen ampliada: ${disparador.dataset.titulo}`
          : "Imagen ampliada de la galería";
      }
      if (titulo) titulo.textContent = disparador.dataset.titulo || "Galería";
      if (descripcion) descripcion.textContent = disparador.dataset.descripcion || "";
    });
  }

  /* ------------------------------------------------------------
     6. CALIFICACIÓN CON ESTRELLAS Y RESEÑAS
     ------------------------------------------------------------ */
  const CLAVE_RESENAS = "crepusculo_resenas_v1";

  // Reseñas de ejemplo: dan vida al promedio inicial de la demo.
  const RESENAS_INICIALES = [
    {
      nombre: "Luna",
      nota: 5,
      comentario:
        "La química entre Bella y Edward y esa fotografía azulada de Forks me siguen pareciendo mágicas.",
      fecha: "2026-10-28"
    },
    {
      nombre: "Elena",
      nota: 5,
      comentario:
        "Una banda sonora inolvidable. La escena del prado es mi favorita desde que era adolescente.",
      fecha: "2026-10-24"
    },
    {
      nombre: "Sofía",
      nota: 4,
      comentario:
        "Me encanta la estética y la historia, aunque algunas escenas han envejecido. Aun así, es un clásico.",
      fecha: "2026-10-19"
    },
    {
      nombre: "Marco",
      nota: 4,
      comentario:
        "Robert Pattinson y Kristen Stewart tienen una química increíble. El béisbol entre vampiros es icónico.",
      fecha: "2026-10-15"
    },
    {
      nombre: "Valeria",
      nota: 5,
      comentario:
        "El romance imposible, la familia Cullen y la lluvia de Forks: una combinación perfecta.",
      fecha: "2026-10-11"
    },
    {
      nombre: "Andrés",
      nota: 3,
      comentario:
        "Es una película muy de su época. La disfruté, pero el ritmo decae en algunos momentos.",
      fecha: "2026-10-06"
    }
  ];

  const formResena = $("#formResena");
  const nombreResena = $("#nombreResena");
  const comentarioResena = $("#comentarioResena");
  const aceptoResena = $("#aceptoResena");
  const errorCalificacion = $("#errorCalificacion");
  const textoCalificacion = $("#textoCalificacion");
  const contadorComentario = $("#contadorComentario");
  const alertaResena = $("#alertaResena");
  const listaResenas = $("#listaResenas");
  const promedioNota = $("#promedioNota");
  const promedioEstrellas = $("#promedioEstrellas");
  const promedioTexto = $("#promedioTexto");
  const distribucionEstrellas = $("#distribucionEstrellas");
  const notaHero = $("#notaHero");
  const btnRestaurarResenas = $("#btnRestaurarResenas");
  const radiosCalificacion = $$('input[name="calificacion"]');

  let calificacionSeleccionada = 0;
  let resenas = [];
  let temporizadorAlerta = null;

  // Carga inicial de reseñas.
  try {
    const guardadas = JSON.parse(almacenamiento.leer(CLAVE_RESENAS, "[]"));
    resenas = Array.isArray(guardadas) && guardadas.length
      ? guardadas
      : RESENAS_INICIALES.map((resena) => ({ ...resena }));
  } catch {
    resenas = RESENAS_INICIALES.map((resena) => ({ ...resena }));
  }

  function guardarResenas() {
    almacenamiento.guardar(CLAVE_RESENAS, JSON.stringify(resenas));
  }

  function formatearFecha(fecha) {
    if (!fecha) return "";
    const objeto = new Date(`${fecha}T12:00:00`);
    if (Number.isNaN(objeto.getTime())) return fecha;
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(objeto);
  }

  function crearEstrellas(promedio) {
    const redondeado = Math.round(promedio * 2) / 2;
    let html = "";
    for (let i = 1; i <= 5; i += 1) {
      if (redondeado >= i) html += '<i class="bi bi-star-fill"></i>';
      else if (redondeado >= i - 0.5) html += '<i class="bi bi-star-half"></i>';
      else html += '<i class="bi bi-star"></i>';
    }
    return html;
  }

  function renderizarResumenResenas() {
    const total = resenas.length;
    const suma = resenas.reduce((acumulado, resena) => {
      const nota = Number(resena.nota);
      return acumulado + (Number.isFinite(nota) ? Math.min(5, Math.max(1, nota)) : 0);
    }, 0);
    const promedio = total ? suma / total : 0;

    if (promedioNota) promedioNota.textContent = promedio.toFixed(1);
    if (notaHero) notaHero.textContent = promedio.toFixed(1);
    if (promedioTexto) {
      promedioTexto.textContent =
        total === 1 ? "Basado en 1 reseña" : `Basado en ${total} reseñas`;
    }
    if (promedioEstrellas) {
      promedioEstrellas.innerHTML = crearEstrellas(promedio);
      promedioEstrellas.setAttribute("title", `${promedio.toFixed(1)} de 5 estrellas`);
    }

    // Distribución de 5 a 1 estrellas.
    if (distribucionEstrellas) {
      const conteo = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      resenas.forEach((resena) => {
        const nota = Math.min(5, Math.max(1, Math.round(Number(resena.nota) || 0)));
        if (conteo[nota] !== undefined) conteo[nota] += 1;
      });

      distribucionEstrellas.replaceChildren();
      for (let nota = 5; nota >= 1; nota -= 1) {
        const porcentaje = total ? Math.round((conteo[nota] / total) * 100) : 0;

        const fila = document.createElement("div");
        fila.className = "tw-dist-row";

        const etiqueta = document.createElement("span");
        etiqueta.className = "tw-dist-label";
        etiqueta.innerHTML = `${nota} <i class="bi bi-star-fill" aria-hidden="true"></i>`;

        const progreso = document.createElement("div");
        progreso.className = "progress";

        const barra = document.createElement("div");
        barra.className = "progress-bar";
        barra.style.width = `${porcentaje}%`;
        barra.setAttribute("role", "progressbar");
        barra.setAttribute("aria-valuemin", "0");
        barra.setAttribute("aria-valuemax", "100");
        barra.setAttribute("aria-valuenow", String(porcentaje));
        barra.setAttribute("aria-label", `${nota} estrellas: ${porcentaje}% de las reseñas`);
        progreso.appendChild(barra);

        const cantidad = document.createElement("span");
        cantidad.className = "tw-dist-count";
        cantidad.textContent = String(conteo[nota]);

        fila.append(etiqueta, progreso, cantidad);
        distribucionEstrellas.appendChild(fila);
      }
    }

    // Reseñas recientes (máximo 4).
    if (listaResenas) {
      const recientes = [...resenas]
        .sort((a, b) => String(b.fecha || "").localeCompare(String(a.fecha || "")))
        .slice(0, 4);

      listaResenas.replaceChildren();

      if (!recientes.length) {
        const vacio = document.createElement("p");
        vacio.className = "text-muted mb-0";
        vacio.textContent = "Todavía no hay reseñas. ¡Sé la primera persona en opinar!";
        listaResenas.appendChild(vacio);
      }

      recientes.forEach((resena) => {
        const articulo = document.createElement("article");
        articulo.className = "tw-resena";

        const avatar = document.createElement("span");
        avatar.className = "tw-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = (resena.nombre || "?").trim().charAt(0).toUpperCase() || "?";

        const contenido = document.createElement("div");
        contenido.className = "flex-grow-1";

        const cabecera = document.createElement("div");
        cabecera.className = "d-flex align-items-center justify-content-between gap-2 flex-wrap";

        const nombre = document.createElement("h4");
        nombre.textContent = resena.nombre || "Anónimo";

        const estrellas = document.createElement("span");
        estrellas.className = "tw-estrellas-mini";
        estrellas.setAttribute("aria-label", `${resena.nota} de 5 estrellas`);
        estrellas.textContent =
          "★".repeat(Number(resena.nota) || 0) + "☆".repeat(5 - (Number(resena.nota) || 0));

        cabecera.append(nombre, estrellas);

        const comentario = document.createElement("p");
        comentario.textContent = resena.comentario || "";

        const fecha = document.createElement("time");
        fecha.dateTime = resena.fecha || "";
        fecha.textContent = formatearFecha(resena.fecha);

        contenido.append(cabecera, comentario, fecha);
        articulo.append(avatar, contenido);
        listaResenas.appendChild(articulo);
      });
    }
  }

  // Selección de estrellas con teclado o clic.
  radiosCalificacion.forEach((radio) => {
    radio.addEventListener("change", () => {
      calificacionSeleccionada = Number(radio.value);
      if (textoCalificacion) {
        textoCalificacion.textContent =
          `Has elegido ${calificacionSeleccionada} ` +
          (calificacionSeleccionada === 1 ? "estrella." : "estrellas.");
      }
      if (errorCalificacion) errorCalificacion.hidden = true;
    });
  });

  // Contador de caracteres del comentario.
  if (comentarioResena && contadorComentario) {
    comentarioResena.addEventListener("input", () => {
      contadorComentario.textContent = String(comentarioResena.value.length);
      comentarioResena.classList.remove("is-invalid");
    });
  }

  if (nombreResena) {
    nombreResena.addEventListener("input", () => nombreResena.classList.remove("is-invalid"));
  }
  if (aceptoResena) {
    aceptoResena.addEventListener("change", () => aceptoResena.classList.remove("is-invalid"));
  }

  function mostrarAlertaResena(mensaje) {
    if (!alertaResena) return;
    alertaResena.textContent = "";
    const icono = document.createElement("i");
    icono.className = "bi bi-check-circle-fill";
    icono.setAttribute("aria-hidden", "true");
    alertaResena.append(icono, document.createTextNode(` ${mensaje}`));
    alertaResena.classList.remove("d-none");

    window.clearTimeout(temporizadorAlerta);
    temporizadorAlerta = window.setTimeout(() => {
      alertaResena.classList.add("d-none");
    }, 6000);
  }

  if (formResena) {
    formResena.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nombre = nombreResena ? nombreResena.value.trim() : "";
      const comentario = comentarioResena ? comentarioResena.value.trim() : "";
      const terminosAceptados = Boolean(aceptoResena && aceptoResena.checked);
      let valido = true;
      let primerError = null;

      // Validación de la calificación.
      if (!calificacionSeleccionada) {
        if (errorCalificacion) errorCalificacion.hidden = false;
        valido = false;
        primerError = primerError || radiosCalificacion[0];
      }

      // Validación del nombre.
      if (nombre.length < 2) {
        if (nombreResena) nombreResena.classList.add("is-invalid");
        valido = false;
        primerError = primerError || nombreResena;
      }

      // Validación del comentario.
      if (comentario.length < 10) {
        if (comentarioResena) comentarioResena.classList.add("is-invalid");
        valido = false;
        primerError = primerError || comentarioResena;
      }

      // Validación del consentimiento.
      if (!terminosAceptados) {
        if (aceptoResena) aceptoResena.classList.add("is-invalid");
        valido = false;
        primerError = primerError || aceptoResena;
      }

      if (!valido) {
        if (primerError) primerError.focus({ preventScroll: true });
        return;
      }

      const nuevaResena = {
        nombre: nombre.slice(0, 40),
        nota: calificacionSeleccionada,
        comentario: comentario.slice(0, 280),
        fecha: new Date().toISOString().slice(0, 10)
      };

      resenas.unshift(nuevaResena);
      guardarResenas();
      renderizarResumenResenas();

      formResena.reset();
      calificacionSeleccionada = 0;
      if (textoCalificacion) textoCalificacion.textContent = "Aún no has seleccionado una calificación.";
      if (errorCalificacion) errorCalificacion.hidden = true;
      if (contadorComentario) contadorComentario.textContent = "0";
      [nombreResena, comentarioResena, aceptoResena].forEach((campo) => {
        if (campo) campo.classList.remove("is-invalid");
      });

      mostrarAlertaResena("¡Gracias! Tu reseña se guardó correctamente.");
    });
  }

  if (btnRestaurarResenas) {
    btnRestaurarResenas.addEventListener("click", () => {
      const confirmado = window.confirm(
        "¿Quieres borrar tus reseñas y restaurar las reseñas de ejemplo?"
      );
      if (!confirmado) return;

      resenas = RESENAS_INICIALES.map((resena) => ({ ...resena }));
      guardarResenas();
      renderizarResumenResenas();
      mostrarAlertaResena("Se restauraron las reseñas de ejemplo.");
    });
  }

  // Primer render del resumen.
  renderizarResumenResenas();

  /* ------------------------------------------------------------
     7. QUIZ INTERACTIVO
     ------------------------------------------------------------ */
  const CLAVE_MEJOR_PUNTAJE = "crepusculo_quiz_mejor";
  const quizImagen = $("#quizImagen");
  const quizPie = $("#quizPie");
  const quizCategoria = $("#quizCategoria");
  const quizPregunta = $("#quizPregunta");
  const quizOpciones = $("#quizOpciones");
  const quizFeedback = $("#quizFeedback");
  const quizProgreso = $("#quizProgreso");
  const quizProgresoBar = $("#quizProgresoBar");
  const quizProgresoTexto = $("#quizProgresoTexto");
  const quizPuntajeTexto = $("#quizPuntajeTexto");
  const quizSiguiente = $("#quizSiguiente");
  const quizReiniciar = $("#quizReiniciar");
  const quizMejor = $("#quizMejor");
  const modalQuiz = $("#modalQuiz");
  const quizResultadoNota = $("#quizResultadoNota");
  const quizResultadoEstrellas = $("#quizResultadoEstrellas");
  const quizResultadoMensaje = $("#quizResultadoMensaje");
  const quizResultadoTexto = $("#quizResultadoTexto");
  const quizReintentar = $("#quizReintentar");

  let indiceActual = 0;
  let aciertos = 0;
  let respondida = false;
  let mejorPuntaje = null;

  const mejorGuardado = almacenamiento.leer(CLAVE_MEJOR_PUNTAJE, null);
  if (mejorGuardado !== null && Number.isFinite(Number(mejorGuardado))) {
    mejorPuntaje = Number(mejorGuardado);
  }

  function renderizarMejorPuntaje() {
    if (!quizMejor) return;
    quizMejor.textContent =
      mejorPuntaje === null ? "—" : `${mejorPuntaje}/${PREGUNTAS.length}`;
  }

  function renderizarPregunta(enfocar = false) {
    if (!quizPregunta || !quizOpciones || !PREGUNTAS.length) return;

    const pregunta = PREGUNTAS[indiceActual];
    respondida = false;

    if (quizImagen) {
      quizImagen.src = pregunta.imagen;
      quizImagen.alt = pregunta.alt;
    }
    if (quizPie) quizPie.textContent = `Pregunta ${indiceActual + 1} de ${PREGUNTAS.length}`;
    if (quizCategoria) quizCategoria.textContent = `Pregunta ${indiceActual + 1}`;
    if (quizPregunta) quizPregunta.textContent = pregunta.pregunta;
    if (quizProgresoTexto) {
      quizProgresoTexto.textContent = `Pregunta ${indiceActual + 1} de ${PREGUNTAS.length}`;
    }
    if (quizPuntajeTexto) quizPuntajeTexto.textContent = String(aciertos);
    if (quizProgresoBar) {
      const porcentaje = Math.round(((indiceActual + 1) / PREGUNTAS.length) * 100);
      quizProgresoBar.style.width = `${porcentaje}%`;
    }
    if (quizProgreso) {
      quizProgreso.setAttribute("aria-valuenow", String(indiceActual + 1));
      quizProgreso.setAttribute("aria-valuemax", String(PREGUNTAS.length));
    }
    if (quizFeedback) quizFeedback.replaceChildren();
    if (quizSiguiente) {
      quizSiguiente.disabled = true;
      const esUltima = indiceActual === PREGUNTAS.length - 1;
      quizSiguiente.innerHTML = esUltima
        ? 'Ver resultado <i class="bi bi-trophy" aria-hidden="true"></i>'
        : 'Siguiente <i class="bi bi-arrow-right" aria-hidden="true"></i>';
    }

    quizOpciones.replaceChildren();
    pregunta.opciones.forEach((opcion, indice) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "tw-quiz-opcion";
      boton.textContent = opcion;
      boton.dataset.indice = String(indice);
      boton.addEventListener("click", () => responder(indice));
      quizOpciones.appendChild(boton);
    });

    if (enfocar) quizPregunta.focus({ preventScroll: false });
  }

  function responder(indiceElegido) {
    if (respondida || !quizOpciones) return;
    respondida = true;

    const pregunta = PREGUNTAS[indiceActual];
    const botones = $$("button", quizOpciones);
    const esCorrecta = indiceElegido === pregunta.correcta;

    botones.forEach((boton, indice) => {
      boton.disabled = true;
      if (indice === pregunta.correcta) boton.classList.add("correcta");
      if (indice === indiceElegido && !esCorrecta) boton.classList.add("incorrecta");
    });

    if (esCorrecta) {
      aciertos += 1;
      if (quizPuntajeTexto) quizPuntajeTexto.textContent = String(aciertos);
    }

    if (quizFeedback) {
      const alerta = document.createElement("div");
      alerta.className = `alert ${esCorrecta ? "alert-success" : "alert-danger"} d-flex align-items-start gap-2`;
      alerta.setAttribute("role", "status");

      const icono = document.createElement("i");
      icono.className = `bi ${esCorrecta ? "bi-check-circle-fill" : "bi-x-circle-fill"}`;
      icono.setAttribute("aria-hidden", "true");

      const contenido = document.createElement("div");
      const titulo = document.createElement("strong");
      titulo.textContent = esCorrecta ? "¡Correcto! " : "No exactamente. ";
      const explicacion = document.createElement("span");
      explicacion.textContent = pregunta.explicacion;
      contenido.append(titulo, explicacion);

      alerta.append(icono, contenido);
      quizFeedback.replaceChildren(alerta);
    }

    if (quizSiguiente) quizSiguiente.disabled = false;
  }

  function finalizarQuiz() {
    const total = PREGUNTAS.length;
    const porcentaje = Math.round((aciertos / total) * 100);

    let estrellas = 1;
    let mensaje = "Sigue practicando";
    let detalle = "Vuelve a ver la película y prueba otra vez: cada intento cuenta.";

    if (aciertos === total) {
      estrellas = 5;
      mensaje = "¡Eres un experto en Crepúsculo!";
      detalle = "Conoces la película de principio a fin. Las cinco estrellas son tuyas.";
    } else if (aciertos >= 7) {
      estrellas = 5;
      mensaje = "¡Casi perfecto!";
      detalle = "Dominas la historia y solo te faltó un pequeño detalle.";
    } else if (aciertos >= 5) {
      estrellas = 4;
      mensaje = "¡Muy buen resultado!";
      detalle = "Recuerdas lo esencial de la película. Un repaso y llegas a la perfección.";
    } else if (aciertos >= 3) {
      estrellas = 3;
      mensaje = "¡Buen intento!";
      detalle = "Ya conoces varias escenas clave. Vuelve a intentarlo para subir el puntaje.";
    } else if (aciertos >= 1) {
      estrellas = 2;
      mensaje = "Vas por buen camino";
      detalle = "Forks todavía tiene secretos para ti. Explora las fichas y vuelve a jugar.";
    }

    if (quizResultadoNota) quizResultadoNota.textContent = `${aciertos}/${total}`;
    if (quizResultadoEstrellas) {
      quizResultadoEstrellas.innerHTML =
        '<i class="bi bi-star-fill"></i>'.repeat(estrellas) +
        '<i class="bi bi-star"></i>'.repeat(5 - estrellas);
    }
    if (quizResultadoMensaje) quizResultadoMensaje.textContent = mensaje;
    if (quizResultadoTexto) {
      quizResultadoTexto.textContent =
        `${detalle} Acertaste ${aciertos} de ${total} preguntas (${porcentaje} %).`;
    }

    if (mejorPuntaje === null || aciertos > mejorPuntaje) {
      mejorPuntaje = aciertos;
      almacenamiento.guardar(CLAVE_MEJOR_PUNTAJE, String(mejorPuntaje));
      renderizarMejorPuntaje();
    }

    if (modalQuiz && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalQuiz).show();
    }
  }

  function siguientePregunta() {
    if (!respondida) return;

    if (indiceActual === PREGUNTAS.length - 1) {
      finalizarQuiz();
      return;
    }

    indiceActual += 1;
    renderizarPregunta(true);
  }

  function reiniciarQuiz() {
    indiceActual = 0;
    aciertos = 0;
    respondida = false;
    renderizarPregunta(false);
    renderizarMejorPuntaje();

    if (modalQuiz && window.bootstrap) {
      const instancia = bootstrap.Modal.getInstance(modalQuiz);
      if (instancia) instancia.hide();
    }
  }

  if (quizSiguiente) quizSiguiente.addEventListener("click", siguientePregunta);
  if (quizReiniciar) quizReiniciar.addEventListener("click", reiniciarQuiz);
  if (quizReintentar) quizReintentar.addEventListener("click", reiniciarQuiz);

  // Primer render del quiz.
  renderizarMejorPuntaje();
  renderizarPregunta(false);
})();
