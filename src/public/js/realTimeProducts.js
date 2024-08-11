let vista = document.getElementById('otro');

let productsList;
let currentPage = 1;

const getProductsList = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/?limit=2&sort=desc&page=${page}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    page = data.page;
    renderCards(data);
    //renderPagination({ ...data });
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === data.totalPages;
  } catch (error) {
    console.log(error);
  }
};

const renderCards = ({ ...data }) => {
  const contenedor = document.querySelector('#cards-container');

  let htmlFragment = '';
  data.payload.forEach((product) => {
    console.log(product);
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

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    getProductsList(currentPage - 1);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  currentPage = currentPage + 1;
  getProductsList(currentPage + 1);
});

// const renderPagination = (info) => {
//   console.log(info);
//   const contenedor = document.querySelector('#pagination');
//   let htmlFragment = '';
//   htmlFragment += `<button id='prev-page' onclick='{() => ${getProducts(
//     page - 1,
//   )}}'>Anterior</button>
//     <button id='next-page' onclick='{changePage()}'>Siguiente</button>`;

//   contenedor.innerHTML = htmlFragment;
// };

getProductsList(currentPage);

// const changePage = () => {
//   console.log('NEXT');
// };
