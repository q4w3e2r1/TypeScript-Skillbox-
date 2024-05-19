import { Products } from '../server/products1.ts';

const cart = () => {
    const iconCart = document.querySelector('.icon-cart')!;
    const closeBtn = document.querySelector('.cartTab .close')!;
    const totalPriceCart:HTMLElement = document.querySelector('.cartTab .cartPrice')!;
    const buyCartPrice = document.querySelector('.buyCart-Info .buyCartPrice')!;
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
        let action = 0
        if (quantity > 0) {
            if (position < 0) {
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });        
            } else {
                action = cart[position].quantity > quantity ? -1 : 1;
                cart[position].quantity = quantity;
            }
        }else{
            cart.splice(position, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        
        refreshProductCartHTML(idProduct, quantity, action)
        //refreshCartHTML();
    }

    const refreshProductCartHTML = (id:number, quantity:number, action:number) =>{
        const listHTML = document.querySelector('.listCart')!;
        const buylistHTML = document.querySelector('.buyCart')!;
        const totalHTML: HTMLElement = document.querySelector('.icon-cart span')!;

        if(quantity == 1 && action == 0){
            totalHTML.textContent! = `${+totalHTML.textContent! + 1}`
            async function fetchProduct() {
                const products = new Products();
                const product = await products.findProductByIdAll(id);
                
                return product;
              }
            
            fetchProduct().then((product)=>{
                if(product == null){
                    throw new Error('Product not found');
                }

                const newItem = document.createElement('div');
                    newItem.classList.add('item');
                    newItem.setAttribute('data-id', product.id)

                    newItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">$${product.price}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${product.id}">-</span>
                        <span class="totalquantity">${quantity}</span>
                        <span class="plus" data-id="${product.id}">+</span>
                    </div>
                    `
                    listHTML.appendChild(newItem);

                    const totalPrice = Number(totalPriceCart.textContent!.replace('$', '')) + product.price
                    totalPriceCart.textContent = `$${totalPrice}`

                    const newBuyItem = document.createElement('div');
                    newBuyItem.classList.add('item');
                    newBuyItem.setAttribute('data-id', product.id)


                    newBuyItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="description">${product.description}</div>
                    <div class="totalPrice">$${product.price}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${product.id}">-</span>
                        <span class="totalquantity">${quantity}</span>
                        <span class="plus" data-id="${product.id}">+</span>
                    </div>
                    `

                    buylistHTML.appendChild(newBuyItem)
                
            })
            

        }

        else if(quantity >= 1){
            const item = listHTML.querySelector(`[data-id="${id}"]`)!;
            const buyItem = buylistHTML.querySelector(`[data-id="${id}"]`)!;
            
            let price = item?.querySelector('.totalPrice')!;
            let productPrice:number = 0
            let newPrice:number = 0
            let totalPrice:number = 0
            if(action == 1){
                productPrice = Number(price.textContent!.replace('$', '')) / (quantity -1)
                newPrice = productPrice * quantity
                totalPrice = Number(totalPriceCart.textContent!.replace('$', '')) + (productPrice)
                totalHTML.textContent! = `${+totalHTML.textContent! + 1}` 
            }
            else{    
                productPrice = Number(price.textContent!.replace('$', '')) / (quantity +1)
                newPrice = productPrice * quantity
                totalPrice = Number(totalPriceCart.textContent!.replace('$', '')) + (productPrice * -1)
                totalHTML.textContent! = `${+totalHTML.textContent! - 1}` 
            }
            
            const productQuantity = item?.querySelector('.totalquantity')!;
            totalPriceCart.textContent = `$${totalPrice}` // цена на кнопке
            productQuantity.textContent = `${quantity}` // кол-во товара на корзине
            price.textContent = `$${newPrice}` // общая цена за n товара
            buyItem.querySelector('.totalquantity')!.textContent = `${quantity}`
            buyItem.querySelector('.totalPrice')!.textContent =  `$${newPrice}`
        }
        else if (quantity <= 0){
            const item = listHTML.querySelector(`[data-id="${id}"]`)!;
            const buyItem = buylistHTML.querySelector(`[data-id="${id}"]`)!;

            let price = item?.querySelector('.totalPrice')!;
            item.remove()
            buyItem.remove()
            totalHTML.textContent! = `${+totalHTML.textContent! - 1}` // общее кол-во товара
            const productPrice = Number(price.textContent!.replace('$', '')) / (quantity +1)
            const totalPrice = Number(totalPriceCart.textContent!.replace('$', '')) + (productPrice * -1)
            totalPriceCart.textContent = `$${totalPrice}` //общая цена всех товаров

        }
        
        buyCartPrice.textContent = totalPriceCart.textContent

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

        cart.forEach(item => {

            totalQuantity += item.quantity;


            async function fetchProduct() {
                const products = new Products();
                const product = await products.findProductByIdAll(item.product_id);
                
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
                    newItem.setAttribute('data-id', product.id)
                    

                    newItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">$${product.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${product.id}">-</span>
                        <span class="totalquantity">${item.quantity}</span>
                        <span class="plus" data-id="${product.id}">+</span>
                    </div>
                    `
                    listHTML.appendChild(newItem);

                    const newBuyItem = document.createElement('div');
                    newBuyItem.classList.add('item');
                    newBuyItem.setAttribute('data-id', product.id)

                    newBuyItem.innerHTML = `
                    <div class="img">
                        <img src= "${product.image}" />
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="description">${product.description}</div>
                    <div class="totalPrice">$${product.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${product.id}"> -</span>
                        <span class="totalquantity">${item.quantity}</span>
                        <span class="plus" data-id="${product.id}"> +</span>
                    </div>
                    `

                    buylistHTML.appendChild(newBuyItem)
                    totalHTML.innerText = `${totalQuantity}`;
                    totalPriceCart.innerText = `$${totalPrice}`;
                    buyCartPrice.textContent = totalPriceCart.textContent
        
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
        if(totalPriceCart.textContent != '$0')
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