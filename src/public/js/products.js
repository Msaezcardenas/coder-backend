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

getProducts();
