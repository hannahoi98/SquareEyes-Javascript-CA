document.addEventListener("DOMContentLoaded", () => {
    const API_BASE_URL = "https://api.noroff.dev/api/v1/square-eyes";
  
    // Function to parse URL and extract query parameters
    function parseUrlParams(url) {
        const params = {};
        const urlParts = url.split("?");
        if (urlParts.length > 1) {
            const queryString = urlParts[1];
            const keyValuePairs = queryString.split("&");
            keyValuePairs.forEach(pair => {
                const [key, value] = pair.split("=");
                params[key] = value;
            });
        }
        return params;
    }
  
    // Function to get movie details by ID
    async function getMovieDetails(movieId) {
        try {
            const response = await fetch(`${API_BASE_URL}/${movieId}`);
            const movie = await response.json();
            return movie;
        } catch (error) {
            console.error(error);
        }
    }
  
    // Function to display movie details on the page
    async function displayMovieDetails() {
        const urlParams = parseUrlParams(window.location.href);
        const movieId = urlParams.id;
  
        if (movieId) {
            const movie = await getMovieDetails(movieId);
            if (movie) {
                // Create elements to display movie details
                const movieDetailsContainer = document.getElementById("movie-details-container");
  
                // Create main div for movie details
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie-details");
                movieDetailsContainer.appendChild(movieDiv);
  
                // Create div for image
                const imgDiv = document.createElement("div");
                imgDiv.classList.add("img-single-movie");
                movieDiv.appendChild(imgDiv);
  
                const img = document.createElement("img");
                img.src = movie.image;
                img.alt = movie.title;
                imgDiv.appendChild(img);
  
                // Create div for other details
                const detailsDiv = document.createElement("div");
                detailsDiv.classList.add("details-single-movie");
                movieDiv.appendChild(detailsDiv);
  
                const title = document.createElement("h2");
                title.textContent = movie.title;
                detailsDiv.appendChild(title);
  
                const genre = document.createElement("p");
                genre.textContent = `Genre: ${movie.genre}`;
                detailsDiv.appendChild(genre);
  
                const rating = document.createElement("p");
                rating.textContent = `Rating: ${movie.rating}`;
                detailsDiv.appendChild(rating);
  
                const released = document.createElement("p");
                released.textContent = `Released: ${movie.released}`;
                detailsDiv.appendChild(released);
  
                const description = document.createElement("p");
                description.textContent = `Description: ${movie.description}`;
                detailsDiv.appendChild(description);
  
                const price = document.createElement("p");
                price.textContent = `Price: ${movie.price}`;
                detailsDiv.appendChild(price);
                
                const addToCartBtn = document.createElement("button");
                addToCartBtn.textContent = "Add to Cart";
                addToCartBtn.id = "add-to-cart-button";
                addToCartBtn.addEventListener("click", handleAddToCartClick);
                detailsDiv.appendChild(addToCartBtn);
  
            } else {
                console.error("Movie not found");
            }
        } else {
            console.error("Movie ID not provided");
        }
    }
  
    displayMovieDetails();
  
    // Function to handle adding a movie to the cart
    function addToCart(movie) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(movie);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // Function to handle "Add to Cart" button click
    function handleAddToCartClick() {
        const urlParams = parseUrlParams(window.location.href);
        const movieId = urlParams.id;
  
        if (movieId) {
            getMovieDetails(movieId).then(movie => {
                addToCart(movie);
                alert("Movie added to cart!");
            }).catch(error => {
                console.error(error);
            });
        } else {
            console.error("Movie ID not provided");
        }
    }
  
    // Add event listener to "Add to Cart" button
    const addToCartBtn = document.getElementById("add-to-cart-button");
    addToCartBtn.addEventListener("click", handleAddToCartClick);
  });