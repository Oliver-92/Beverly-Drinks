// carousel.js
function setupCarousel(trackSelector, nextButtonSelector, prevButtonSelector) {
    const track = document.querySelector(trackSelector);
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(nextButtonSelector);
    const prevButton = document.querySelector(prevButtonSelector);
    let currentSlide = 0;

    // Actualizar la posición del carrusel
    function updateSlidePosition() {
        track.style.transform = `translateX(-${100 * currentSlide}%)`;
    }

    // Evento para el botón "Next"
    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0; // Volver al primer slide
        }
        updateSlidePosition();
    });

    // Evento para el botón "Prev"
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.length - 1; // Volver al último slide
        }
        updateSlidePosition();
    });
}



