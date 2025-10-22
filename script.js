// ============================
// TIEMPOS (en milisegundos)
// ============================
const TIEMPO_ESCENA2 = 4000;   // tiempo que se muestra la escena 2 antes de pasar a la 3
const TIEMPO_RESPUESTA_NO = 2000; 
const TIEMPO_LLUVIA_GATOS = 6000; // duración lluvia antes de ir a escena 4
const TIEMPO_ENTRE_ESCENAS = 5000; // tiempo entre 4 → 5 → 6

// ============================
// FUNCIONES
// ============================

function cambiarEscena(id) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // secuencia automática
  if (id === 'scene2') {
    setTimeout(() => cambiarEscena('scene3'), TIEMPO_ESCENA2);
  }

  if (id === 'scene4') {
    setTimeout(() => cambiarEscena('scene5'), TIEMPO_ENTRE_ESCENAS);
  }

  if (id === 'scene5') {
    setTimeout(() => cambiarEscena('scene6'), TIEMPO_ENTRE_ESCENAS);
  }
}

// Mensaje incorrecto de la escena 1
function respuestaNo() {
  const text = document.getElementById('incorrecto');
  text.classList.remove('hidden');
  setTimeout(() => {
    text.classList.add('hidden');
    cambiarEscena('scene1');
  }, TIEMPO_RESPUESTA_NO);
}

// Pasar de la escena 3 al "modo malvado" (3b)
function escena3b() {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  document.getElementById('scene3b').classList.add('active');
}

// ============================
// LLUVIA DE GATOS
// ============================
function mostrarGatos(contenedorId = 'catRain') {
  const container = document.getElementById(contenedorId);
  container.innerHTML = ''; // limpia gatos anteriores

  const gatos = [
    'images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg',
    'images/6.jpg','images/7.jpg','images/8.jpg','images/9.jpg','images/10.jpg','images/11.jpg'
  ];

  const filas = 20; // filas para llenar la pantalla
  const columnas = Math.ceil(window.innerWidth / 100); // columnas según ancho pantalla
  const duracionCaida = 1000; // duración de la animación en ms (1s)

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const img = document.createElement('img');
      img.src = gatos[Math.floor(Math.random() * gatos.length)];
      img.style.position = 'absolute';
      img.style.left = x * 100 + 'px';
      img.style.top = -Math.random() * 500 + 'px';
      img.style.width = '100px';
      img.style.height = 'auto';
      img.style.animation = `caer ${duracionCaida}ms ease-out forwards`;
      img.style.animationDelay = (y * 0.2) + 's';
      container.appendChild(img);
    }
  }

  // Tiempo total = animación de la última fila + 200ms extra de seguridad
  const tiempoTotal = (filas * 0.2 * 1000) + duracionCaida + 200; 
  setTimeout(() => cambiarEscena('scene4'), tiempoTotal);
}
