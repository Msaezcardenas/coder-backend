export const productsCards = (product) => {
  return `<div class='card'>
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
};
