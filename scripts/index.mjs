document.addEventListener('DOMContentLoaded', () => {
  // This code will run when the DOM content is fully loaded
  displayMovies();
});


// Fetching API
const API_BASE_URL = "https://api.noroff.dev/api/v1/square-eyes";

async function getData() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data") 
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Failed to fetch data")
  } 
}

async function displayMovies() {
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  
  try {
    loader.style.display = 'block';
    const data = await getData();

    mainContent.innerHTML = '';

    data.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
  
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.title;
      productDiv.appendChild(img);
  
      const title = document.createElement('h2');
      title.textContent = product.title;
      productDiv.appendChild(title);
  
      const genre = document.createElement('p');
      genre.textContent = `Genre: ${product.genre}`;
      productDiv.appendChild(genre);
  
      const price = document.createElement('p');
      price.textContent = `Price: ${product.price}`;
      productDiv.appendChild(price);
  
      const button = document.createElement('button');
      button.textContent = 'View Details';
      button.classList.add('product-button');
  
      button.addEventListener('click', () => {
        window.location.href = `product/index.html?id=${product.id}`;
      });
      productDiv.appendChild(button);
      
      mainContent.appendChild(productDiv);
    });
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
  } 
}




