//5

function areEqual(object1: object, object2: object): boolean{
    
    let keys1 = Object.keys(object1);
    let keys2 = Object.keys(object2);


    if(keys1.length != keys2.length){
        return false
    }

    for (const key of keys1) {
        if(keys2.indexOf(key) == -1 || object1[key] !== object2[key]){
            return false
        }
    }

    return true
}

let Ivan = {
    name:'Ivan',
    age: 12,
    sex: 'male'
}

let Ivan2 = {
    name:'Ivan',
    age: '12',
    sex: 'male',
    id:12
}
console.log(areEqual(Ivan, Ivan2))
