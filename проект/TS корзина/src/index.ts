import cart from './cart.ts';
import { Products } from '../server/products1.ts';
import { activeCategory } from './detail.ts';

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
        
        
        const category = (new URLSearchParams(window.location.search).get('category')!) || 'all';

        
        
        initApp(category);
        setCategory(category);
    });
};

loadTemplate();

const initApp = (category:string) => {
  // загрузка товаров
    const listProduct = document.querySelector('.listProduct')!;
    listProduct.innerHTML = '';

    async function fetchProducts(){
        const products = new Products();
        const data = await products.filter(category);
        return data!;
      }

      fetchProducts().then((data) => {
        //console.log(data);
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
      });
};

const setCategory = (curCategory:string) => {

    const categories = app.querySelector('.categories')!;
    const active = categories.querySelector('.active'); 
    active?.classList.remove('active');

    categories.querySelectorAll('a').forEach((category) => {
        const field = category.dataset.field;

        if(field == curCategory){
            category.classList.add('active');
        }

        category.addEventListener('click', (e) =>{
            e.preventDefault();
            
            window.history.replaceState(null, '', `/index.html?category=${category.dataset.field}`)
            const active = categories.querySelector('.active') ;  
            active?.classList.remove('active');
            category.classList.add('active');
            
            if(field){
                initApp(field);
            }
        } )
    });
    
}



