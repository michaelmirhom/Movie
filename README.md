# MovieFinder
MovieFinder is a web application that allows users to search for movies, view movie details, and save their favorite movies for easy access later on. It uses a custom JSON database served by json-server to fetch movie information and is built using HTML, CSS, and JavaScript.
# Installation
To get started with the MovieFinder project, follow these steps:
1. Clone the repository to your local machine.
2. Install json-server globally by running npm install -g json-server.
3. Navigate to the project directory where your db.json file is located.
4. Create a `routes.json` file in the project directory with the following content:{
"/api/movies/*": "/movies$1"
}
5.  Start the json-server by running `json-server --watch db.json --routes routes.json`. By default, json-server will use port 3000.
6. Open the `index.html` file in your favorite web browser. Make sure to update the fetch URLs in your JavaScript code to match the port number used by json-server and include the `/api/movies` route.
The json-server will serve your custom JSON data on the specified port, allowing your MovieFinder app to fetch the movie information from the local database.

# Usage
To use the MovieFinder app:

1. Type a movie title into the search input field and press Enter.
2. Browse the search results displayed as movie cards.
3. Click the "Save to Favorites" button on a movie card to save the movie to your favorites list.
4. To view your favorite movies, click the "Show Favorites" button.
5. To remove a movie from your favorites list, click the "Remove from Favorites" button on the movie card.
# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change
# License
This project is licensed under the terms of the MIT license