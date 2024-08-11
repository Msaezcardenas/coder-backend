let vista = document.getElementById('otro');

let productsList;
const getProductsList = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/products/?limit=2&sort=desc');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    renderCards(data);
    renderPagination({ ...data });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const renderCards = ({ ...data }) => {
  const contenedor = document.querySelector('#cards-container');

  let htmlFragment = '';
  data.docs.forEach((product) => {
    htmlFragment += `
              <div class='card'>
                <h2>${product.title}</h2>
                <div class='code'>${product.code} </div>
                <div class='description'>${product.description}</div>
                <div class='price'>Precio: $${product.price} </div>
                <div class='class-section'> 
                  <div>Stock: ${product.stock} </div>
                  <div>Categoría: ${product.category} </div>
                </div>
                
                <button id=${product.id} onclick='deleteProduct(${product.id})' class='btn-delete' > Eliminar </button>
               </div>`;

    contenedor.innerHTML = htmlFragment;
  });
};

const renderPagination = (info) => {
  console.log(info);
  const contenedor = document.querySelector('#pagination');
  let htmlFragment = '';
  info.totalPages.forEach((page) => {
    htmlFragment += ` `;
  });
};

getProductsList();
