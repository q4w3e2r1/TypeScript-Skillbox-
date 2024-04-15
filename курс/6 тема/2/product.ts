//1
export class Product{
    #_productName:string;
    #_productPrice:number;


    constructor(name:string, price:number){
        this.#_productName = name
        this.#_productPrice = price
    }

    get productName():string{
        return this.#_productName
    }

    set productName(value:string){
        if (value.length <= 0){
            throw new Error('Out of range: name must contain at least one character')
        }
        this.#_productName = value
    }

    get productPrice():number{
        return this.#_productPrice
    }

    set productPrice(value:number){
        if (value <= 0){
            console.log(this.#_productName)
            throw new Error('Out of range: price must be greater then zero')
        }

        this.#_productPrice = value
    }

    log():void{
        console.log(this.#_productName+'; '+this.#_productPrice)
    }

}




