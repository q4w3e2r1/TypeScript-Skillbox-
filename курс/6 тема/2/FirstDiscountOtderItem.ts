import { OrderItem } from "./OrderItem"
import { Product } from "./product"
//3
export class FirstDiscountOtderItem extends OrderItem{

    discount:number

    constructor(product:Product, count:number, discount:number){
        super(product, count)
        this.discount = discount
        this.product.productPrice -= discount
    }

    override getCost(): number {
        return this.product.productPrice * this.count
    }


}