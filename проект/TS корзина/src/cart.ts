import { Products } from '../server/products1.ts';

const cart = () => {
    const iconCart = document.querySelector('.icon-cart')!;
    const closeBtn = document.querySelector('.cartTab .close')!;
    const checkOutBtn:HTMLElement = document.querySelector('.cartTab .checkOut')!;
    const body = document.querySelector('body')!;
    let cart:[{product_id:number, quantity:number}];// товары в корзине

    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    });

    closeBtn.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    });

 // обработка состяния объекта перед действием в корзине
    const setProductInCart = (idProduct:number, quantity:number, position:number) => {
        
        if (quantity > 0) {
            if (position < 0) {
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });
            } else {
                cart[position].quantity = quantity;
            }
        }else{
            cart.splice(position, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCartHTML();
    }
// добавление товара в корзину
    const refreshCartHTML = () => {
        const listHTML = document.querySelector('.listCart')!;
        const buylistHTML = document.querySelector('.buyCart')!;
        const totalHTML: HTMLElement = document.querySelector('.icon-cart span')!;
        let totalQuantity:number = 0;
        let totalPrice:number = 0;
        listHTML.innerHTML = '';
        buylistHTML.innerHTML = '';

        if(cart.length <= 0){
            totalHTML.innerText = `${totalQuantity}`;
            checkOutBtn.innerText = `$${totalPrice}`;
        }

        cart.forEach(item => {

            totalQuantity += item.quantity;


            async function fetchProduct() {
                const products1 = new Products();
                const product = await products1.findProductByIdAll(item.product_id);
                
                return product;
              }
            
            fetchProduct()
                .then((product) => {
                    
                    if(product == null){
                        throw new Error('Product not found');
                    }

                    
                    totalPrice += product.price * item.quantity;
                    
                    const newItem = document.createElement('div');
                    newItem.classList.add('item');

                    newItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class"totalPrice">$${product.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${product.id}">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${product.id}">+</span>
                    </div>
                    `
                    listHTML.appendChild(newItem);

                    const newBuyItem = document.createElement('div');
                    newBuyItem.classList.add('item');

                    newBuyItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="description">${product.description}</div>
                    <div class"totalPrice">$${product.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${product.id}">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${product.id}">+</span>
                    </div>
                    `

                    buylistHTML.appendChild(newBuyItem)
                    totalHTML.innerText = `${totalQuantity}`;
                    checkOutBtn.innerText = `$${totalPrice}`;
                    
        
                })
                })
              

    };

    //event click
    document.addEventListener('click', (e) => {
        const buttonClick= e.target as HTMLElement;
        if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus') || buttonClick.classList.contains('minus')){
            const idProduct = Number(buttonClick.dataset.id!);
            const position = cart.findIndex((value) => value.product_id == idProduct);
            let quantity = position < 0 ? 0 : cart[position].quantity;

        if (buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')) {
            quantity++;
            setProductInCart(idProduct, quantity, position);
        }else{
            quantity--;
            setProductInCart(idProduct, quantity, position);
        }
        }
    });




    const initApp = () => {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart')!);        
        }
        refreshCartHTML();
    }

    initApp();

    const openModalBtn = document.querySelector(".openModalWindow") as HTMLButtonElement;
    const closeModal = document.querySelector('.closeModalWindow') as HTMLButtonElement
    const modal = document.querySelector(".modal") as HTMLDivElement;

    openModalBtn.addEventListener("click", () => {
        if(openModalBtn.textContent != '$0')
            modal.style.display = "flex";
        
        
        });

    closeModal.addEventListener("click", () => {
            modal.style.display = "none";
          });  


    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        });

};
export default cart;