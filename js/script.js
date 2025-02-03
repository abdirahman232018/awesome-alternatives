/*/ Authors:
    - Name: Abdirahman A
/*/ 

document.addEventListener('DOMContentLoaded', function() {
  // Check if the product list exists (i.e. on index.html)
  const productList = document.getElementById('product-list');
  if (productList) {
    let products = [];
  
    // Fetch data from products.json
    fetch('data/products.json')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Retrieved data:', data);
        products = data;
        renderProducts(products);
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  
    // A function that renders (displays) an array of products
    function renderProducts(productArray) {
      productList.innerHTML = ''; // Clear out existing content
    
      productArray.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
    
        // Append the product name first
        const productName = document.createElement('h2');
        productName.textContent = product.name;
        productDiv.appendChild(productName);
    
        // Append the product image right after the name
        if (product.urls && product.urls.regular) {
          const prodImg = document.createElement('img');
          prodImg.src = product.urls.regular;
          prodImg.alt = product.name;
          prodImg.className = 'product-image';
          productDiv.appendChild(prodImg);
        }
    
        // Append the product description below the image
        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;
        productDiv.appendChild(productDescription);
    
        // Create and append the alternative product details
        const alternativeName = document.createElement('h3');
        alternativeName.textContent = 'Alternative: ' + product.alternative.name;
        productDiv.appendChild(alternativeName);
    
        const alternativeDescription = document.createElement('p');
        alternativeDescription.textContent = product.alternative.description;
        productDiv.appendChild(alternativeDescription);
    
        // Append the alternative image below the alternative name/description
        if (product.alternative && product.alternative.urls && product.alternative.urls.regular) {
          const altImg = document.createElement('img');
          altImg.src = product.alternative.urls.regular;
          altImg.alt = product.alternative.name;
          altImg.className = 'product-image';
          productDiv.appendChild(altImg);
        }
    
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
    document.body.insertBefore(searchInput, productList);
  }
  
  // Handle user submissions of new products via the form (on either page)
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Gather form data into a new product object
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
  
      // If the product list exists, update it immediately
      if (typeof products !== 'undefined') {
        products.push(newProduct);
        renderProducts(products);
      }
  
      // Optionally reset the form
      productForm.reset();
    });
  }
});
