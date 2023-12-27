async function productData() {
    try {
        const resp = await fetch('data.json');
        if (!resp.ok) {
            throw new Error("Получена ошибка при обработке data.json");
        }
        const data = await resp.json();
        const containerBox = document.querySelector('.container');
        data.forEach(({ photo, product_name, product_description, product_price }) => {
            const productCard = `
            <div class="card">
             <div class="container_image">
              <img class="product_img" src="${photo}" alt="${product_name}">
              <img class="overlay" src="img/Add\ to\ cart\ \(1\).png" />
             </div>
             <h2 class="product_name">${product_name}</h2>
             <p class="product_description">${product_description}</p>
             <p class="product_price">$${product_price}</p>
            </div>   
        `
            containerBox.insertAdjacentHTML("beforeend", productCard);
        });
    }
    catch (error) {
        console.error(error);
    }
}
productData();