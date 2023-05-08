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