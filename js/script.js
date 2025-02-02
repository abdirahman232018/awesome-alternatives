/*/
This script handles data retrieval, DOM manipulation
/*/

document.addEventListener('DOMContentLoaded', function() {
    let products = [];
  
    // Fetch data from products.json
    fetch('data/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        products = data;
        renderProducts(products);
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  
    // A function that renders (displays) an array of products
    function renderProducts(productArray) {
      const productList = document.getElementById('product-list');
      // Clear out anything that was previously there
      productList.innerHTML = '';
  
      productArray.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
  
        // Optional: Show product image if present
        if (product.image) {
          const prodImg = document.createElement('img');
          prodImg.src = product.image;
          prodImg.alt = product.name;
          prodImg.className = 'product-image';
          productDiv.appendChild(prodImg);
        }
  
        const productName = document.createElement('h2');
        productName.textContent = product.name;
  
        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;
  
        // Alternative section
        const alternativeName = document.createElement('h3');
        alternativeName.textContent = 'Alternative: ' + product.alternative.name;
  
        const alternativeDescription = document.createElement('p');
        alternativeDescription.textContent = product.alternative.description;
  
        // Optional: Show alternative image if present
        if (product.alternative.image) {
          const altImg = document.createElement('img');
          altImg.src = product.alternative.image;
          altImg.alt = product.alternative.name;
          altImg.className = 'product-image';
          productDiv.appendChild(altImg);
        }
  
        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(alternativeName);
        productDiv.appendChild(alternativeDescription);
  
        productList.appendChild(productDiv);
      });
    }
  
    // Create a search input for filtering products
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
  
    // Filter products on each keystroke
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.alternative.name.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredProducts);
    });
  
    // Insert the search bar above the product list
    const productList = document.getElementById('product-list');
    document.body.insertBefore(searchInput, productList);
  
    // Handle user submissions of new products via the form
    const productForm = document.getElementById('product-form');
    if (productForm) {
      productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newProduct = {
          name: e.target.name.value,
          description: e.target.description.value,
          image: e.target.image.value, // optional
          alternative: {
            name: e.target.alternativeName.value,
            description: e.target.alternativeDescription.value,
            image: e.target.alternativeImage.value // optional
          }
        };
  
        // Add the new product to our in-memory array
        products.push(newProduct);
  
        // Re-render the updated product list
        renderProducts(products);
  
        // Optionally reset the form
        productForm.reset();
      });
    }
  });
  

