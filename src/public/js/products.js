const getProducts = async (page) => {
  try {
    const result = await fetch(
      `http://localhost:8080/api/products/?limit=2&sort=desc&page=${page}`,
    );
    const data = await result.json();
    page = data.page;
  } catch (error) {
    console.log(error);
  }
};

// const deleteButton = document.querySelector('.btn-delete');

// deleteButton.addEventListener('click', async () => {
//   console.log(deleteButton.id);
//   await fetch(
//     `http://localhost:8080/api/carts/66ba83273118c9aa0ae29f3f/product/66bcb027d6693e7570ed14c4`,
//     {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   )
//     .then((res) => (res.ok ? res.json() : Promise.reject(res)))
//     .then((data) => {
//       return data.data;
//     });
// });

getProducts();
