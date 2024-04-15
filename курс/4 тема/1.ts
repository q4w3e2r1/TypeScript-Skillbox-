// 1
let a:number[] = [1, 2, 56, 34, 3, 4,];
let b:number[] = [2, 3, 1];

//1 вариант
function arrayDiff(a:number[], b:number[]): number[]
{
    let result:number[] = [];
    b.sort((a, b) => a-b);
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if(binarySearch(b, element) == -1)
        {
            result.push(element);
        }
        
    }

    return result
}

function binarySearch(arr:number[], target:number):number{
    let left = 0;
    let right= arr.length - 1
    while(left <= right){
        let mid = Math.floor((left+right)/2);
        if(arr[mid] === target){
            return mid
        }
        if(arr[mid] < target){
            left = mid + 1;
        } else{
            right = mid - 1;
        }
    }


    return -1
}
//2 вариант
function arrayDiff2(a:number[], b:number[]):number[] {
    return a.filter(value => !b.includes(value));
}

let result = arrayDiff(a, b);
console.log(arrayDiff(a, b))
console.log(arrayDiff([1, 2], [1]))
console.log(arrayDiff([1, 2, 3, 4], [5, 6]))
console.log(arrayDiff([2, 2, 2, 2, 3], [2]))
console.log(arrayDiff2([2, 0, 2, 3, 2, 1, 2, 3], [2]))
