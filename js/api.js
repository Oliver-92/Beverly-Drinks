// api.js
async function fetchCocktails() {
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.drinks.slice(0, 10);  // Tomar los primeros 10 tragos
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    }
}

// Función para renderizar los tragos en el carrusel
function renderCocktails(drinks, trackId) {
    const track = document.querySelector(trackId);
    drinks.forEach((drink) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide-drink');
        slide.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        track.appendChild(slide);
    });
}

// Función para manejar el carrusel
function setupCarousel(trackId, nextButtonId, prevButtonId) {
    const track = document.querySelector(trackId);
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }

    document.querySelector(nextButtonId).addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;  // Volver al primer slide
        }
        updateCarousel();
    });

    document.querySelector(prevButtonId).addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;  // Ir al último slide
        }
        updateCarousel();
    });

    updateCarousel(); // Inicializa la posición del carrusel
}

// Inicialización
async function initCarousel(trackId, nextButtonId, prevButtonId) {
    const drinks = await fetchCocktails();
    renderCocktails(drinks, trackId);
    setupCarousel(trackId, nextButtonId, prevButtonId);
}

// Llama a la función con los IDs de los elementos del carrusel
initCarousel('.carousel-track', '.carousel-button.next', '.carousel-button.prev');

