const socket = io();

let vista = document.getElementById('otro');

socket.on('realtime', (data) => {
  const contenedor = document.querySelector('#cards-container');

  console.log({ data });

  let htmlFragment = '';
  data.forEach((product) => {
    htmlFragment += `
              <div class='card'>
                <h2>${product.title}</h2>
                <div class='code'>${product.code} </div>
                <div class='description'>${product.description}</div>
                <div class='price'>${product.price} </div>
                <div class='class-section'> 
                  <div>Stock: ${product.stock} </div>
                  <div>Categoría: ${product.category} </div>
                </div>
                
                <button id=${product.id} onclick='deleteProduct(${product.id})' class='btn-delete' > Eliminar </button>
               </div>`;

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
