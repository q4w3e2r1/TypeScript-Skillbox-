import { Product } from "./product";

// 2
 export abstract class OrderItem{
    #_product:Product
    #_count:number

    constructor(product:Product, count:number){
        this.#_count = count
        this.#_product = product
    }

    get product(){
        return this.#_product
    }

    get count(){
        return this.#_count
    }

    set product(value:Product){
        this.#_product = value
    }

    set count(value:number){
        if(value <= 0){
            throw new Error('Out of range: count must be greater then zero')
        }

        this.#_count = value
    }

    log():void{

        console.log(this.product.productName + ';'+ this.product.productPrice + '; Кол-во ' + this.count + ';' + 'Общая цена:' + this.product.productPrice * this.count)
    }

    getCost():number{
        return this.product.productPrice * this.count
    }

    compare(other:OrderItem):number{
        if (this.getCost() === other.getCost())
            return 0

        return this.getCost() > other.getCost() ? 1: -1

    }
}
