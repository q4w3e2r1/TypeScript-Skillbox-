import { OrderItem } from "./OrderItem"
import { Product } from "./product"
//4
export class SecondDiscountOtderItem extends OrderItem{

    discount:number;
    requiredQuantity:number = 15;

    constructor(product:Product, count:number, discount:number){
        super(product, count)
        if (count >= this.requiredQuantity)
            this.product.productPrice *= (1-discount/100)
        this.discount = discount
    }

    override getCost() {
        return this.product.productPrice * this.count
    }

}