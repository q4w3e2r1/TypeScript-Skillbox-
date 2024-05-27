import cart from './cart';
import { Products } from '../server/products';

const app = document.querySelector('.app')!;
const temporaryContent = document.querySelector('.temporaryContent')!;

const loadTemplate = async () => {
  try {
    const response = await fetch('/template.html');
    const html = await response.text();

    app.innerHTML = html;
    const contentTab = document.querySelector('.contentTab')!;
    contentTab.innerHTML = temporaryContent.innerHTML;
    temporaryContent.innerHTML = '';

    cart();

    initApp();
  } catch (error) {
    console.error('Ошибка при загрузке шаблона:', error);
  }
};

loadTemplate();

const initApp = async () => {
  const idProduct = +(new URLSearchParams(window.location.search).get('id')!);

  try {
    const products = new Products();
    const product = await products.findProductByIdAll(idProduct);

    if (!product) {
      window.location.href = '/';
    }

    if (product === null) {
      throw new Error('Product not found');
    }

    document.querySelector('.active')?.classList.remove('active');

    document
      .querySelector(`[data-field="${product.category}"]`)
      ?.classList.add('active');

    const { image, name, price, description, id, category } = product;

    const detail: HTMLElement = document.querySelector('.detail')!;

    (detail.querySelector('.image img') as HTMLImageElement).src = image;

    (detail.querySelector('.name') as HTMLElement).innerText = name;
    (detail.querySelector('.price') as HTMLElement).innerText = `${price}₽`;
    (detail.querySelector('.description') as HTMLElement).innerText = description;
    (detail.querySelector('.addCart') as HTMLElement)!.dataset.id = `${id}`;
    (detail.querySelector('.category-link') as HTMLAnchorElement).href = `/index.html?category=${category}`;

    // similar products

    const listProduct: HTMLElement = document.querySelector('.listProduct')!;
    listProduct.innerHTML = '';

    const similarProducts = await products.filter(product.category);

    similarProducts!
      .filter((value) => value.id != product.id)
      .forEach((product) => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('item');

        // карточка товара
        newProduct.innerHTML = `
            <a href="/detail.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}"/>
            </a>
            <h2>${product.name}</h2>
            <div class="price">${product.price}₽</div>
            <button class="addCart"
                data-id="${product.id}">
                Добавить
            </button>
            `;
        listProduct.appendChild(newProduct);
      });

      const loader = document.querySelector('.loader-container')!;
      loader.classList.add('remove');  
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
  }
};