class MyArray<T>{

    elements: T[];

    constructor(value: T[] = []){
        this.elements = value
    }

    areElementsEqual(index1:number, index2:number): boolean{

        if (index1 >= this.elements.length || index1 < 0 ||
            index2 >= this.elements.length || index2 < 0)
            return false

        const element1 = this.elements[index1]
        const element2 = this.elements[index2]

        if (typeof element1 !== 'object' || element1 === null) 
            return element1 === element2

        const keys1 = Object.keys(element1);
        const keys2 = Object.keys(element2!);

        if (keys1.length !== keys2.length)
            return false

    
        for(const key of keys1){
            if (element1[key] !== element2[key]){
                return false
            }
        }    

        return true
    }

    myPush(array: T[], element: T): number {
        array[array.length] = element;
        return array.length;
      }

    flatten(): T[] {
        const result: T[] = [];

        const flattenArray = (array: T[]): void => {
            for (const element of array) {
                if (Array.isArray(element)) {
                    flattenArray(element);
                } else {
                    this.myPush(result, element);
                }
            }
        };

        flattenArray(this.elements);

        return result;
    }


}

const arr = new MyArray<number>([1, 2, 3])
const arr1 = new MyArray()

console.log(arr.elements)

type User = {
    name:string,
    age:number
}

const arr2:MyArray<User> = new MyArray<User>([{name:'Alex', age:4},
    {name:'Alex', age:4}])

console.log(arr2.areElementsEqual(0, 1))


const arr3 = new MyArray<Array<number>>([[1, 2, 3], [1, 4, 2,]])
console.log(arr3.flatten())