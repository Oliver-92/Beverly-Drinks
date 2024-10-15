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
    const track = document.querySelector(trackId);  // Identificar el carrusel correspondiente
    drinks.forEach((drink, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide-drink');
        // Añadir la clase 'active' al primer slide
        if (index === 0) {
            slide.classList.add('active');
        }
        slide.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        track.appendChild(slide);
    });
}

// Inicialización
async function initCarousel(trackId) {
    const drinks = await fetchCocktails();
    renderCocktails(drinks, trackId);
}

