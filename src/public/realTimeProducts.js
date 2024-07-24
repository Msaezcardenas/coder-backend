const socket = io();

let vista = document.getElementById('otro');

socket.on('realtime', (data) => {
  const contenedor = document.querySelector('#otro');

  console.log({ data });

  let htmlFragment = '';
  data.forEach((product) => {
    htmlFragment += `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <button id=${product.id} onclick='deleteProduct(${product.id})' class='btn-delete' > Eliminar </button>`;

    contenedor.innerHTML = htmlFragment;
  });
});

const formulario = document.getElementById('form');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  const product = Object.fromEntries(new FormData(event.target));
  socket.emit('new-product', product);
});

const deleteProduct = (id) => {
  socket.emit('delete-product', id);
};
