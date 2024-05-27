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

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';

    initApp(category);
    setCategory(category);
  } catch (error) {
    console.error('Ошибка при загрузке шаблона:', error);
  }
};

loadTemplate();

const initApp = async (category: string) => {
  // загрузка товаров
  const listProduct: HTMLElement = document.querySelector('.listProduct')!;
  listProduct.innerHTML = '';

  try {
    const products = new Products();
    const data = await products.filter(category);

    if (!data) {
      throw new Error('Нет данных о товаре');
    }

    data.forEach((product) => {
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


const setCategory = (curCategory: string) => {
  const categories = app.querySelector('.categories')!;

  categories.querySelectorAll('a').forEach((category) => {
    const field = category.dataset.field;

    if (field === curCategory) {
      category.classList.add('active');
    } else {
      category.classList.remove('active');
    }

    category.addEventListener('click', (e) => {
      e.preventDefault();

      const active = categories.querySelector('.active')!;
      active.classList.remove('active');
      category.classList.add('active');

      if (field) {
        window.history.replaceState(null, '', `/index.html?category=${field}`);
        initApp(field);
      }
    });
  });
};
