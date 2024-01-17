let items = [];
let basketItems = [];


async function productData() {
    try {
        const resp = await fetch('data.json');
        if (!resp.ok) {
            throw new Error("Получена ошибка при обработке data.json");
        }
        items = await resp.json();
        const containerBox = document.querySelector('.container');
        items.forEach(({ id, photo, product_name, product_description, product_price }) => {
            const productCard = `
            <div class="card">
             <div class="container_image" onclick=\"addToBasket(${id})\">
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

function addToBasket(id) {
    basketItems.push(items.filter((el) => el.id === id)[0]);
    onchangebasket();
}

function removeFromBasket(id) {
    const idxRemoveEl = basketItems.map(el => el.id).indexOf(id);
    if (idxRemoveEl !== -1) {
        basketItems = [...basketItems.slice(0, idxRemoveEl), ...basketItems.slice(idxRemoveEl + 1, basketItems.length)];
    }
    onchangebasket();
}

function onchangebasket() {
    try {
        const containerBox = document.querySelector('.cartWrap');
        containerBox.innerHTML = "";
        basketItems.forEach(({ id, photo, product_name, product_description, product_price }) => {
        const productCard = `
        <div class="card">
         <div class="container_image">
         <button type="button" class='btn' onclick=\"removeFromBasket(${id})\"></button>
          <img class="product_img" src="${photo}" alt="${product_name}">
         </div>
         <h2 class="product_name">${product_name}</h2>
         <p class="product_description">${product_description}</p>
         <p class="product_price">$${product_price}</p>
        </div>   
    `
            containerBox.insertAdjacentHTML("beforeend", productCard);
        });
    } catch (error) {
        console.error(error);
    }
}

productData();