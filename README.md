# Crepúsculo Wiki

Aplicación web educativa tipo wiki sobre la película **Crepúsculo (2008)**, construida con
**HTML5, CSS3, JavaScript vanilla y Bootstrap 5**. Incluye fichas de personajes, una sección
de protagonistas, galería con lightbox, calificación con estrellas y un quiz interactivo con
imágenes.

> Proyecto sin ánimo de lucro, realizado como práctica de la actividad **3.4.2 · Construir una
> interfaz web responsiva aplicando Bootstrap** (GFPI-F-135 V04). No está afiliado a los
> titulares de los derechos de la saga.

## Demo local

No requiere instalación, compilación ni conexión a internet (Bootstrap, iconos, fuentes de
iconos e imágenes están en el repositorio).

```bash
cd crepusculo-wiki
python3 -m http.server 8098
```

Abre <http://127.0.0.1:8098/>.

También puede abrirse directamente `index.html`, aunque se recomienda usar un servidor local
para que el navegador cargue correctamente todos los recursos.

### Con XAMPP (Windows)

1. Copia la carpeta `crepusculo-wiki` dentro de `C:\xampp\htdocs\`.
2. Abre el **Panel de control de XAMPP** y pulsa **Start** en el módulo *Apache*
   (MySQL no es necesario: el proyecto no usa base de datos).
3. Abre <http://localhost/crepusculo-wiki/> en el navegador.

Para detenerlo, pulsa **Stop** en *Apache*.

## Estructura

```
crepusculo-wiki/
├── index.html                     Página única con todas las secciones y modales
├── assets/
│   ├── css/styles.css             Tema pastel, componentes y diseño adaptativo
│   ├── js/
│   │   ├── data.js                16 personajes y 9 preguntas del quiz
│   │   └── app.js                 Filtros, modales, estrellas, reseñas y quiz
│   ├── img/                       Retratos, pósters, escenas y favicon
│   └── vendor/
│       ├── bootstrap/             Bootstrap 5.3.3 (CSS y bundle JS)
│       └── bootstrap-icons/       Bootstrap Icons 1.11.3
└── README.md
```

La información está separada de la interfaz: para añadir un personaje o una pregunta basta
con editar `assets/js/data.js`.

## Secciones

| Sección | Contenido |
|---|---|
| Portada | Presentación, póster, datos rápidos y nota media |
| La película | Sinopsis, ficha técnica, autoras y carrusel de las cinco películas |
| Personajes | 16 tarjetas con buscador y filtro por especie, ficha en modal |
| Protagonistas | Pestañas con Bella, Edward y Jacob y sus descripciones ampliadas |
| Galería | 8 imágenes ampliables en un modal con título y descripción |
| Calificar | Formulario de reseña con 5 estrellas, promedio, distribución y reseñas |
| Quiz | 9 preguntas con imagen, explicación, progreso, resultado y mejor puntaje |

## Características técnicas

- **Bootstrap 5**: sistema de rejilla (`row`, `col-*`, `row-cols-*`), navbar, cards, tabs,
  pills, carrusel, modales, formularios, alertas, progress, badges y utilidades de espaciado.
- **Diseño adaptativo**: 1 columna en móvil, 2 en tableta y 3–4 en escritorio. Probado a
  390 px, 820 px, 1024 px, 1200 px y 1440 px sin desbordamiento horizontal.
- **CSS organizado por módulos** (variables, accesibilidad, navbar, hero, tarjetas, quiz…),
  con comentarios de sección.
- **JavaScript sin dependencias** externas: filtros, modales (vía Bootstrap), validación de
  formularios, estrellas, reseñas y lógica del quiz.
- **Persistencia local**: reseñas en `crepusculo_resenas_v1` y mejor puntaje en
  `crepusculo_quiz_mejor` (solo `localStorage`; no hay backend).
- **Modo de movimiento reducido** y estilos para `forced-colors`.

## Accesibilidad y usabilidad

- Enlace «Saltar al contenido principal» y foco visible en todos los controles.
- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).
- Todas las imágenes tienen texto alternativo descriptivo; los iconos decorativos usan
  `aria-hidden="true"`.
- Formularios con `label`, mensajes de error, `aria-live` y foco en el primer campo inválido.
- Estrellas implementadas con radios nativos, por lo que funcionan con teclado y lectores de
  pantalla.
- Modales con título asociado, cierre con `Esc` y retorno del foco (comportamiento de
  Bootstrap).
- Navegación por anclas con `scroll-padding-top` para no quedar oculta bajo la barra fija.
- Contraste revisado sobre la paleta morado/rosa pastel; textos principales en tono oscuro.

## Imágenes y derechos de autor

Las imágenes se obtuvieron de la
[Wiki de Crepúsculo en Fandom](https://crepusculo.fandom.com/wiki/P%C3%A1gina_principal) y de
la [Twilight Wiki](https://twilight.fandom.com/), y se usan **únicamente con fines
ilustrativos y educativos, sin ánimo de lucro**.

*Crepúsculo*, sus personajes, pósters, fotografías y marcas pertenecen a Stephenie Meyer,
Summit Entertainment, Lionsgate y sus respectivos autores. Este proyecto no está afiliado ni
patrocinado por ellos. Si eres titular de algún contenido y deseas su retirada, contacta con
el autor del proyecto.

## Comprobaciones realizadas

- Validez de anidamiento HTML: 0 errores (`html.parser`).
- Sintaxis JavaScript: `node --check` sin errores.
- 39 imágenes, todas con `alt` y todas cargadas correctamente.
- Sin identificadores duplicados ni enlaces vacíos.
- Flujo completo probado en navegador: menú móvil, búsqueda, filtros, modales, galería,
  estrellas, publicación de reseña y quiz de principio a fin.
