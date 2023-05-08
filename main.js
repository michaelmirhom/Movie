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