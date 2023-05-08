const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');
const clearSearchButton = document.getElementById('clear-search');
const showFavoritesButton = document.getElementById('show-favorites');

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value;
        fetchMovies(searchTerm);
    }
});

clearSearchButton.addEventListener('click', clearSearchInput);
showFavoritesButton.addEventListener('click', showFavoriteMovies);

function clearSearchInput() {
    searchInput.value = '';
}

async function showFavoriteMovies() {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        favorites = JSON.parse(favorites);
        const moviePromises = favorites.map(async (id) => {
            const response = await fetch(`http://localhost:3000/movies/${id}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error fetching movie with ID ${id}: ${response.statusText}`);
                return null;
            }
        });

        const movies = (await Promise.all(moviePromises)).filter(movie => movie !== null);
        displayMovies(movies, true);
    } else {
        movieContainer.innerHTML = '<p>No favorite movies found.</p>';
    }
}


async function fetchMovies(searchTerm) {
    const response = await fetch(`http://localhost:3000/movies?q=${searchTerm}`);
    const data = await response.json();
    if (data.length > 0) {
        displayMovies(data, false);
    } else {
        movieContainer.innerHTML = '<p>No movies found.</p>';
    }
}

function displayMovies(movies, isFavorite) {
    movieContainer.innerHTML = '';
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h2>${movie.title}</h2>
            <img src="${movie.poster}" alt="${movie.title}">
            <p>Released: ${movie.year}</p>
            <button class="save-favorite" data-id="${movie.id}" ${isFavorite ? 'hidden' : ''}>Save to Favorites</button>
            <button class="remove-favorite" data-id="${movie.id}" ${isFavorite ? '' : 'hidden'}>Remove from Favorites</button>
        `;
        const saveFavoriteButton = movieCard.querySelector('.save-favorite');
        const removeFavoriteButton = movieCard.querySelector('.remove-favorite');
        
        saveFavoriteButton.addEventListener('click', () => {
            saveToFavorites(movie.id);
            saveFavoriteButton.hidden = true;
            removeFavoriteButton.hidden = false;
        });
        
        removeFavoriteButton.addEventListener('click', () => {
            removeFromFavorites(movie.id);
            saveFavoriteButton.hidden = false;
            removeFavoriteButton.hidden = true;
        });

        movieContainer.appendChild(movieCard);
    });
}

function saveToFavorites(id) {
    let favorites = localStorage.getItem('favorites');

    if (favorites) {
        favorites = JSON.parse(favorites);
    } else {
        favorites = [];
    }

    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function removeFromFavorites(id) {
    let favorites = localStorage.getItem('favorites');

    if (favorites) {
        favorites = JSON.parse(favorites);
        const index = favorites.indexOf(id);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }
}
