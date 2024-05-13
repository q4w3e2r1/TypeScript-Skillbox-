import cart from './cart.ts';
import products from '../products/products.ts';
import { Products } from '../server/products1.ts';

const app = document.getElementById('app')!;
const temporaryContent = document.getElementById('temporaryContent')!;

const loadTemplate = () => {
  fetch('/template.html')
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      const contentTab = document.getElementById('contentTab')!;
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = '';

      cart();

      initApp();
    });
};

loadTemplate();

const initApp = () => {
  const idProduct = Number(
    new URLSearchParams(window.location.search).get('id')!
  );

  const info = products.find((value) => value.id == idProduct);
  console.log(info);

  async function fetchProduct() {
    const products1 = new Products();
    const product = await products1.findProductByIdAll(idProduct);
    return product;
  }

  fetchProduct()
    .then((product) => {
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

      const detail = document.querySelector('.detail')!;
      (detail.querySelector('.image img') as HTMLImageElement).src =product.image;
      (detail.querySelector('.name') as HTMLElement).innerText = product.name;
      (detail.querySelector('.price') as HTMLElement).innerText = `$${product.price}`;
      (detail.querySelector('.description') as HTMLElement).innerText =product.description;
      (detail.querySelector('.addCart') as HTMLElement)!.dataset.id = product.id;
      (detail.querySelector('.category-link') as HTMLAnchorElement).href = `/index.html?category=${product.category}`;

      const loader = document.querySelector('.loader-container')!;
      loader.classList.add('remove');
      
      return product;
    })
    .then((product) => {
      console.log(product);
      //similar products

      const listProduct: HTMLElement = document.querySelector('.listProduct')!;
      listProduct.innerHTML = '';

      async function getSimilarProducts() {
        const products = new Products();
        const data = await products.filterAll(product.category);
        return data!;
      }

      getSimilarProducts().then((products) => {
        products
          .filter((value) => value.id != product.id)
          .forEach((product) => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');

            // карточка товара
            newProduct.innerHTML = `
                <a href="/detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}"/>
                </a>
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart"
                    data-id="${product.id}">
                    Add to Cart
                </button>
                `;
            listProduct.appendChild(newProduct);
          });
      });

    });
};
