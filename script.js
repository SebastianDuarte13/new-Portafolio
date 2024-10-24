let swiper = new Swiper(".mySwiper", {
    grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      },
  });

const hamburger = document.querySelector(".hamburger")
const navContent = document.querySelector(".nav-content")
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navContent.classList.toggle("active")
  body.classList.toggle("no-scroll");
})

function closeMenu() {
  hamburger.classList.remove("active")
  navContent.classList.remove("active")
  body.classList.remove("no-scroll");
}

const proyectos = [
    { id: 1, titulo: "Proyecto 1", descripcion: "Este proyecto se enfonco en el desarrollo de plantillas css y volviendolas responsivas una y cada una con un menu intuitivo que permite navegar una y cada uda de estas pequeñas landing pages. Este proyecto se llevo acabo con mi colega samuel Ospina", imagen: "public/img/landing-pages.png?height=400&width=600", link: "https://landingpagessamuel.netlify.app/"},
    { id: 2, titulo: "Proyecto 2", descripcion: "En este proyecto se desarrolo un borrador para presentarle a un cliente de un catalogo de su propio restaurante para mostrar los servicios que ofrece, de manera web y movil siendo responsivo", imagen: "public/img/catalogo-burger.png", link: "https://trabajo-reserreccion.vercel.app/" },
    { id: 3, titulo: "Proyecto 3", descripcion: "Este proyecto utiliza las habilidades de HTML, CSS y JavaScript para crear un pequeño formulario para registrar un heroe y almacenarlo en una base de datos con una imagen de dicho heroe", imagen: "public/img/registro-heroes.png", link: "https://super-heros-five.vercel.app/" },
    { id: 4, titulo: "Proyecto 4", descripcion: "Para este proyecto se realizo una imitacion de la famosa app cuanto cuesta mi app, con la que se replico de la mejor manera utilizando web-componets para tener una mejor compilacion y desarrollo profesional.", imagen: "public/img/cuantocuestamiapp.png", link: "https://trabajo-js-chi.vercel.app/" },
    { id: 5, titulo: "Proyecto 5", descripcion: "Confecciones Pepita, el mejor sistema de desarrollo, intuitivo y amigable a la hora de llevar el control administrativo de tus confecciones en una base de datos que te calcula todo de manera automatizada, ordenada y eficiente", imagen: "public/img/confeccionespepita.png", link: "https://confecciones-pepita.vercel.app/" },
    { id: 6, titulo: "Proyecto 6", descripcion: "Cuando estamos en una empresa y quemeros llevar el control y tener roles y que cada uno de ellos tenga tareas especificas, le presentro mi proyecto full stack en el cual vinculamos Html, Css, JavaScript, MySQL, Java y Springboot y frameworks como nodeJs y arquitectura como la Hexagonal Para llevar a cabo una interfaz para administrativos y distintos roles que quieran agregrar para llevar el control empresarial y el orden en una empresa de entrada, salida y utilidad de productos en cualquier region, sucursal, etc...", imagen: "/placeholder.svg", link: "https://example.com/proyecto6" }
];

let currentIndex = 0;
let intervalId;

const sliderContent = document.getElementById('sliderContent');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const sliderDots = document.getElementById('sliderDots');
const sliderContainer = document.getElementById('sliderContainer');
const prevPreview = document.getElementById('prevPreview');
const nextPreview = document.getElementById('nextPreview');

function createSlides() {
    proyectos.forEach((proyecto, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');
        slide.innerHTML = `
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
            <div class="slide-info">
                <h3 class="slide-title">${proyecto.titulo}</h3>
                <p class="slide-description">${proyecto.descripcion}</p>
            </div>
        `;
        
        // Redirigir cuando se haga clic en el slide
        slide.addEventListener('click', () => {
            window.location.href = proyecto.link;
        });
        
        sliderContent.appendChild(slide);

        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
}


function updateSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Desvanecer el slide activo
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            slide.classList.add('fade-out');
        }
    });

    // Esperar hasta que la animación de desvanecimiento se complete
    setTimeout(() => {
        slides.forEach((slide, index) => {
            // Quitar todas las clases activas y de transición
            slide.classList.remove('active', 'fade-out', 'fade-in');
            dots[index].classList.remove('active');
            
            // Activar solo el slide actual
            if (index === currentIndex) {
                slide.classList.add('active', 'fade-in');
                dots[index].classList.add('active');
            }
        });
    }, 500); // La duración debe coincidir con la duración de la animación de `fade-out`

    updatePreviews();
}


function updatePreviews() {
    const prevIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
    // const nextIndex = (currentIndex + 2) % proyectos.length;

    prevPreview.querySelector('img').src = proyectos[prevIndex].imagen;
    prevPreview.querySelector('h4').textContent = proyectos[prevIndex].titulo;

    nextPreview.querySelector('img').src = proyectos[nextIndex].imagen;
    nextPreview.querySelector('h4').textContent = proyectos[nextIndex].titulo;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % proyectos.length;
    updateSlide();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
    updateSlide();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlide();
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

prevButton.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

prevPreview.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

nextPreview.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

createSlides();
updateSlide();
startAutoSlide();