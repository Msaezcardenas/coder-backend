import { productsCards } from './productsCards.js';

let url = 'http://localhost:8080/api/products/?limit=2';
let currentPage = 1;
let totalPages = 1;

const getProducts = async (page) => {
  try {
    const result = await fetch(
      `http://localhost:8080/api/products/?limit=2&sort=desc&page=${page}`,
    );
    const data = await result.json();
    console.log(data);
    page = data.page;
    renderCards(data);
    updatePagination(data);
  } catch (error) {
    console.log(error);
  }
};

const renderCards = ({ ...data }) => {
  const contenedor = document.querySelector('#cards-container');

  let htmlFragment = '';
  data.payload.forEach((product) => {
    htmlFragment += productsCards(product);
    contenedor.innerHTML = htmlFragment;
  });
};

function updatePagination(data) {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const pageInfo = document.getElementById('page-info');

  prevButton.disabled = !data.hasPrevPage;
  nextButton.disabled = !data.hasNextPage;

  pageInfo.textContent = `Página ${data.page} de ${data.totalPages}`;
  totalPages = data.totalPages;
  currentPage = data.page;
}

function changePage(direction) {
  if (direction === 'next' && currentPage < totalPages) {
    getProducts(currentPage + 1);
  } else if (direction === 'prev' && currentPage > 1) {
    getProducts(currentPage - 1);
  }
}

getProducts();
