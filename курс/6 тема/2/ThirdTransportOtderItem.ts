import { OrderItem } from "./OrderItem"
import { Product } from "./product"
import { FirstDiscountOtderItem } from "./FirstDiscountOtderItem";
import { SecondDiscountOtderItem } from "./SecondDiscountOtderItem";
//5
export class ThirdTransportOtderItem extends OrderItem{

    transportPrice:number;

    constructor(product:Product, count:number, transportPrice:number){
        super(product, count)
        this.product.productPrice += transportPrice * count
        this.transportPrice = transportPrice
    }

    override getCost() {
        return this.product.productPrice * this.count
    }
}

//6
let items:OrderItem[] = [
    new FirstDiscountOtderItem(new Product('Апельсины', 1500), 10, 50),
    new FirstDiscountOtderItem(new Product('Апельсины', 1500), 10, 100),
    new SecondDiscountOtderItem(new Product('Мандарины', 1500), 15, 50),
    new SecondDiscountOtderItem(new Product('Мандарины', 1500), 14, 100),
    new ThirdTransportOtderItem(new Product('Кокосы', 1500), 10, 100),
    new ThirdTransportOtderItem(new Product('Кокосы', 1500), 10, 1)
]




items.forEach(item => item.log())
console.log()

for(let i = 0; i < items.length-1; i++){
    for(let j = i+1; j <items.length; j++){
        if(items[i].compare(items[j]) == -1){
            let temp = items[i]
            items[i] = items[j]
            items[j] = temp
        }
    }
}

items.forEach(item => item.log())