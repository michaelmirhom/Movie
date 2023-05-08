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

// Function to clear the search input field
function clearSearchInput() {
    searchInput.value = '';
}
let favorites = localStorage.getItem('favorites');
if (favorites) {
    favorites = JSON.parse(favorites);
    // Fetch movie data for each favorite movie ID
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
     // Resolve all movie promises and filter out null values
     const movies = (await Promise.all(moviePromises)).filter(movie => movie !== null);
     // Display favorite movies
     displayMovies(movies, true);
 } else {
     movieContainer.innerHTML = '<p>No favorite movies found.</p>';
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
        // Create a movie card for each movie
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