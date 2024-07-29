const socket = io();

const contenedor = document.querySelector('#container-products');
console.log(contenedor);

socket.on('products', (products) => {
  let card = '';
  products.forEach((product) => {
    console.log(product.title);
    card += `<h1> ${product.title} </h1>`;

    contenedor.innerHTML = card;
  });
});
