const socket = io();
let vista = document.getElementById('otro');

socket.on('productos', (data) => {
  console.log(data);
  const contenedor = document.querySelector('#container-products');

  let concatenador = '';
  data.forEach((product) => {
    console.log(product);
    const button = document.createElement('button');
    contenedor.appendChild(button);

    concatenador += `<h1>${product.title}</h1>`;

    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>`;

    contenedor.appendChild(div);
    console.log(concatenador);
  });
  vista.innerHTML(concatenador);
});

const formulario = document.getElementById('form');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  const product = Object.fromEntries(new FormData(event.target));
  socket.emit('new-product', product);
});
