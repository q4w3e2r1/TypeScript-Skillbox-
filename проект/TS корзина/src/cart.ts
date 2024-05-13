import products from '../products/products.ts';

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
        const totalHTML: HTMLElement = document.querySelector('.icon-cart span')!;
        let totalQuantity:number = 0;
        let totalPrice:number = 0;
        listHTML.innerHTML = '';
        cart.forEach(item => {

            totalQuantity += item.quantity;


            const position = products.findIndex((value) => value.id == item.product_id);
            const info = products[position];
            totalPrice += info.price * item.quantity;
            const newItem = document.createElement('div');
            newItem.classList.add('item');

            newItem.innerHTML = `
            <div class="img">
                <img src= "${info.image}" />
            </div>
            <div class="name">${info.name}</div>
            <div class"totalPrice">$${info.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus" data-id="${info.id}">-</span>
                <span>${item.quantity}</span>
                <span class="plus" data-id="${info.id}">+</span>
            </div>
            `
            listHTML.appendChild(newItem);
        })
        totalHTML.innerText = `${totalQuantity}`;
        checkOutBtn.innerText = `$${totalPrice}`;
        //console.log(cart);
    };

    //event click
    document.addEventListener('click', (e) => {
        const buttonClick= e.target as HTMLElement;
        const idProduct = Number(buttonClick.dataset.id!);
        const position = cart.findIndex((value) => value.product_id == idProduct);
        let quantity = position < 0 ? 0 : cart[position].quantity;

        if (buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')) {
            quantity++;
            setProductInCart(idProduct, quantity, position);
        }else if(buttonClick.classList.contains('minus')) {
            quantity--;
            setProductInCart(idProduct, quantity, position);
        }
    });

    const initApp = () => {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart')!);        
        }
        refreshCartHTML();
    }

    initApp();
};
export default cart;