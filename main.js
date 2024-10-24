document.addEventListener('mousemove', (e) => {
  const header = document.querySelector('header');
  const headerRect = header.getBoundingClientRect(); // Obtiene la posición del header

  // Verifica si el cursor está fuera del header
  if (e.clientY < headerRect.top || e.clientY > headerRect.bottom) {
    createCursorTrail(e.clientX, e.clientY);
  }
});

function createCursorTrail(x, y) {
  const cursorTrail = document.createElement('div');
  cursorTrail.classList.add('cursor-effect');
  cursorTrail.style.left = x + 'px';
  cursorTrail.style.top = y + 'px';
  document.body.appendChild(cursorTrail);

  setTimeout(() => {
      cursorTrail.remove(); // Elimina el rastro después de que la animación termine
  }, 600); // La duración coincide con la animación (0.6s)
}

const textElement = document.getElementById('text');
const originalText = "こんにちはこんにちはここんにちは"; // Texto original (18 caracteres)
const characters = originalText.split(''); // Divide en caracteres

let firstCharChanged = false; 
let secondCharChanged = false; 
let thirdCharChanged = false; 
let fourthCharChanged = false; 
let fifthCharChanged = false; 
let sixthCharChanged = false; 

const intervalId = setInterval(() => {
    const newText = characters.map((char, index) => {
        if (index === 0 && Date.now() >= startTime + 200) { // Cambiado a 1000 ms
            firstCharChanged = true; 
            return 'S'; 
        }
        if (firstCharChanged && index === 1 && Date.now() >= startTime + 400) { // Cambiado a 1500 ms
            secondCharChanged = true; 
            return 'e'; 
        }
        if (secondCharChanged && index === 2 && Date.now() >= startTime + 400) { // Cambiado a 2000 ms
            thirdCharChanged = true; 
            return 'b'; 
        }
        if (thirdCharChanged && index === 3 && Date.now() >= startTime + 500) { // Cambiado a 2500 ms
            return 'a'; 
        }
        if (thirdCharChanged && index === 4 && Date.now() >= startTime + 600) { // Cambiado a 3000 ms
            return 's'; 
        }
        if (thirdCharChanged && index === 5 && Date.now() >= startTime + 700) { // Cambiado a 3500 ms
            sixthCharChanged = true; 
            return 't'; 
        }
        if (sixthCharChanged && index === 6 && Date.now() >= startTime + 800) { // Cambiado a 4000 ms
            return 'i'; 
        }
        if (sixthCharChanged && index === 7 && Date.now() >= startTime + 900) { // Cambiado a 4500 ms
            return 'a'; 
        }
        if (sixthCharChanged && index === 8 && Date.now() >= startTime + 1000) { // Cambiado a 5000 ms
            return 'n'; 
        }
        if (sixthCharChanged && index === 9 && Date.now() >= startTime + 1100) { // Cambiado a 5500 ms
            return ' '; 
        }
        if (sixthCharChanged && index === 10 && Date.now() >= startTime + 1200) { // Cambiado a 6000 ms
            return 'D'; 
        }
        if (sixthCharChanged && index === 11 && Date.now() >= startTime + 1300) { // Cambiado a 6500 ms
            return 'u'; 
        }
        if (sixthCharChanged && index === 12 && Date.now() >= startTime + 1400) { // Cambiado a 7000 ms
            return 'a'; 
        }
        if (sixthCharChanged && index === 13 && Date.now() >= startTime + 1500) { // Cambiado a 7500 ms
            return 'r'; 
        }
        if (sixthCharChanged && index === 14 && Date.now() >= startTime + 1600) { // Cambiado a 8000 ms
            return 't'; 
        }
        if (sixthCharChanged && index === 15 && Date.now() >= startTime + 1700) { // Cambiado a 8500 ms
            return 'e'; 
        }
        if (sixthCharChanged && index === 16 && Date.now() >= startTime + 1800) { // Cambiado a 9000 ms
            return 'e'; 
        }
        return Math.random() > 0.5 ? getRandomChar() : char;
    }).join('');

    textElement.textContent = newText;

    if (Date.now() >= startTime + 9500) { // Cambiado a 9500 ms
        clearInterval(intervalId);
    }
}, 100); // Cambia cada 100 ms (0.1 segundos)

const startTime = Date.now(); 

function getRandomChar() {
    const chars = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"];
    return chars[Math.floor(Math.random() * chars.length)];
}


// container2




  // Escuchar el evento de scroll del mouse
window.addEventListener('wheel', (event) => {
    const delta = event.deltaY; // Detecta si es hacia arriba o abajo
    const currentSection = document.querySelector('.active'); // Encuentra la sección activa
    let nextSection;
  
    if (delta > 0) {
      // Scroll hacia abajo
      nextSection = currentSection.nextElementSibling;
    } else {
      // Scroll hacia arriba
      nextSection = currentSection.previousElementSibling;
    }
  
    // Si existe una sección siguiente o anterior
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' }); // Desplazarse suavemente
        currentSection.classList.remove('active'); // Remover clase activa de la actual
        nextSection.classList.add('active'); // Agregar clase activa a la siguiente
    }
});
  
  // Inicializa la primera sección como activa
document.querySelector('#section1').classList.add('active');

document.querySelector('.container1').addEventListener('wheel', (event) => {
event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container1, .container2, .container3, .container4, .container5, .container6');
    let isScrolling = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target;

                if (!isScrolling) {
                    isScrolling = true;
                    currentSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        isScrolling = false;
                    }, 800);  // Tiempo de espera hasta que el desplazamiento termine
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});
