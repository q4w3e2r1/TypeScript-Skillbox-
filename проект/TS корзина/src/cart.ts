import { Products } from '../server/products.ts';

const cart = () => {
  const totalPriceCart: HTMLElement = document.querySelector('.cartTab .cartPrice')!;
const buyCartPrice: HTMLElement = document.querySelector('.buyCart-Info .buyCartPrice')!;
const body: HTMLElement = document.querySelector('body')!;
let cart: [{ product_id: number; quantity: number }] = JSON.parse(localStorage.getItem('cart')!) || []; // товары в корзине

document.querySelector('.icon-cart')!.addEventListener('click', () => {
  body.classList.toggle('activeTabCart');
});

document.querySelector('.cartTab .close')!.addEventListener('click', () => {
  body.classList.toggle('activeTabCart');
});

// обработка состяния объекта перед действием в корзине
const setProductInCart = (idProduct: number, quantity: number, position: number = -1) => {
  let action: number = 0;
  if (quantity > 0) {
    if (position < 0) {
      cart.push({
        product_id: idProduct,
        quantity: quantity,
      });
    } else {
      action = cart[position].quantity > quantity ? -1 : 1;
      cart[position].quantity = quantity;
    }
  } else {
    cart.splice(position, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));

  refreshProductCartHTML(idProduct, quantity, action);
};

const refreshProductCartHTML = (id: number, quantity: number, action: number) => {
  const listHTML: HTMLElement = document.querySelector('.listCart')!;
  const buylistHTML: HTMLElement = document.querySelector('.buyCart')!;
  const totalProductsCount: HTMLElement = document.querySelector('.icon-cart span')!;

  if (quantity == 1 && action == 0) {
    //добавление в корзину первого данного продукта
    totalProductsCount.textContent = `${+totalProductsCount.textContent! + 1}`;

    async function fetchProduct() {
      const products = new Products();
      const product = await products.findProductByIdAll(id);
      return product;
    }

    fetchProduct().then((product) => {
      if (product == null) {
        throw new Error('Product not found');
      }

      const newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.setAttribute('data-id', `${product.id}`);

      newItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">${product.price}₽</div>
                    <div class="quantity">
                        <span class="minus noSelection" data-id="${product.id}">-</span>
                        <span class="totalquantity noSelection">${quantity}</span>
                        <span class="plus noSelection" data-id="${product.id}">+</span>
                    </div>
                    `;
      listHTML.appendChild(newItem);

      const totalPrice = +(totalPriceCart.textContent!.replace('₽', '')) + product.price;
      totalPriceCart.textContent = `${totalPrice}₽`;

      const newBuyItem = document.createElement('div');
      newBuyItem.classList.add('item');
      newBuyItem.setAttribute('data-id', `${product.id}`);

      newBuyItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="description">${product.description}</div>
                    <div class="totalPrice">${product.price}₽</div>
                    <div class="quantity">
                        <span class="minus noSelection" data-id="${product.id}">-</span>
                        <span class="totalquantity noSelection">${quantity}</span>
                        <span class="plus noSelection" data-id="${product.id}">+</span>
                    </div>
                    `;

      buylistHTML.appendChild(newBuyItem);
      buyCartPrice.textContent = totalPriceCart.textContent;
    });
  } else if (quantity >= 1) {
    const item: HTMLElement = listHTML.querySelector(`[data-id="${id}"]`)!;
    const buyItem: HTMLElement = buylistHTML.querySelector(`[data-id="${id}"]`)!;

    const price: HTMLElement = item.querySelector('.totalPrice')!;
    let productPrice: number = 0;
    let newPrice: number = 0;
    let totalPrice: number = 0;
    if (action == 1) {
      // товар +1
      productPrice = +(price.textContent!.replace('₽', '')) / (quantity - 1);
      newPrice = productPrice * quantity;
      totalPrice = +(totalPriceCart.textContent!.replace('₽', '')) + productPrice;
      totalProductsCount.textContent! = `${+totalProductsCount.textContent! + 1}`;
    } //товар -1
    else {
      productPrice = +(price.textContent!.replace('₽', '')) / (quantity + 1);
      newPrice = productPrice * quantity;
      totalPrice = +(totalPriceCart.textContent!.replace('₽', '')) + productPrice * -1;
      totalProductsCount.textContent! = `${+totalProductsCount.textContent! - 1}`;
    }

    const productQuantity: HTMLElement = item?.querySelector('.totalquantity')!;
    totalPriceCart.textContent = `${totalPrice}₽`; // сумма покупок
    productQuantity.textContent = `${quantity}`; // кол-во товара на корзине
    price.textContent = `${newPrice}₽`; // общая цена за n товара
    buyItem.querySelector('.totalquantity')!.textContent = `${quantity}`;
    buyItem.querySelector('.totalPrice')!.textContent = `${newPrice}₽`;
  } else if (quantity <= 0) {
    //удаление из корзины
    const item: HTMLElement = listHTML.querySelector(`[data-id="${id}"]`)!;
    const buyItem: HTMLElement = buylistHTML.querySelector(`[data-id="${id}"]`)!;

    const price: HTMLElement = item?.querySelector('.totalPrice')!;
    item.remove();
    buyItem.remove();
    totalProductsCount.textContent! = `${+totalProductsCount.textContent! - 1}`; // общее кол-во товара
    const productPrice: number = +(price.textContent!.replace('₽', '')) / (quantity + 1);
    const totalPrice: number = +(totalPriceCart.textContent!.replace('₽', '')) + productPrice * -1;
    totalPriceCart.textContent = `${totalPrice}₽`; //общая цена всех товаров
  }

  buyCartPrice.textContent = totalPriceCart.textContent;
};

const refreshCartFromLocalStorage = () => {
  const listHTML: HTMLElement = document.querySelector('.listCart')!;
  const buylistHTML: HTMLElement = document.querySelector('.buyCart')!;
  const totalHTML: HTMLElement = document.querySelector('.icon-cart span')!;
  let totalQuantity: number = 0;
  let totalPrice: number = 0;
  listHTML.innerHTML = '';
  buylistHTML.innerHTML = '';

  cart.forEach((item) => {
    totalQuantity += item.quantity;

    async function fetchProduct() {
      const products = new Products();
      const product = await products.findProductByIdAll(item.product_id);
      return product;
    }

    fetchProduct().then((product) => {
      if (product == null) {
        throw new Error('Product not found');
      }

      totalPrice += product.price * item.quantity;

      const newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.setAttribute('data-id', `${product.id}`);

      newItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">${product.price * item.quantity}₽</div>
                    <div class="quantity">
                        <span class="minus noSelection" data-id="${product.id}">-</span>
                        <span class="totalquantity noSelection">${item.quantity}</span>
                        <span class="plus noSelection" data-id="${product.id}">+</span>
                    </div>
                    `;
      listHTML.appendChild(newItem);

      const newBuyItem = document.createElement('div');
      newBuyItem.classList.add('item');
      newBuyItem.setAttribute('data-id', `${product.id}`);

      newBuyItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="description">${product.description}</div>
                    <div class="totalPrice">${product.price * item.quantity}₽</div>
                    <div class="quantity">
                        <span class="minus noSelection" data-id="${product.id}"> -</span>
                        <span class="totalquantity noSelection">${item.quantity}</span>
                        <span class="plus noSelection" data-id="${product.id}"> +</span>
                    </div>
                    `;

      buylistHTML.appendChild(newBuyItem);
      totalHTML.innerText = `${totalQuantity}`;
      totalPriceCart.innerText = `${totalPrice}₽`;
      buyCartPrice.textContent = totalPriceCart.textContent;
    });
  });
};

  const classNames = ['addCart', 'plus', 'minus'];
  //event click
  document.addEventListener('click', (e) => {
    const buttonClick = e.target as HTMLElement;
    if (classNames.some(className => buttonClick.classList.contains(className))) {
      const idProduct = +(buttonClick.dataset.id!);
      const position = cart.findIndex((value) => value.product_id === idProduct);
      let quantity: number = position < 0 ? 0 : cart[position].quantity;
      if (
        buttonClick.classList.contains('addCart') ||
        buttonClick.classList.contains('plus')
      ) {
        quantity++;
        setProductInCart(idProduct, quantity, position);
      } else {
        quantity--;
        setProductInCart(idProduct, quantity, position);
      }
    }
  });

  const initApp = () => {
   if(cart){
    refreshCartFromLocalStorage();
   }
  };

  initApp();

  
const openModalBtn = document.querySelector('.openModalWindow') as HTMLButtonElement;
const closeModal = document.querySelector('.closeModalWindow') as HTMLButtonElement;
const modal = document.querySelector('.modal') as HTMLDivElement;

openModalBtn.addEventListener('click', () => {
  if (totalPriceCart.textContent !== '0₽') {
    modal.style.display = 'flex';
  }
});

const closeModalHandler = () => {
  modal.style.display = 'none';
};

closeModal.addEventListener('click', closeModalHandler);

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModalHandler();
  }
});
};
export default cart;
