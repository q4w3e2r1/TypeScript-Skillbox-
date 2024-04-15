
type Person = {
    name: string,
    age: number,

}

type Bridge = {
    city: string,
    age: number,


}


type Wine = {
    manufacturer: string,
    age: number,
    grade: string,
}

function getOldest<T extends { age: number;}>(items: T[]): T{
    return items.sort((a,b) => b.age - a.age)[0];
}


// function getOldestPerson(items: Person[]): Person {
//     return items.sort((a, b) => b.age - a.age)[0];
// }


// function getOldestWine(items: Wine[]): Wine {
//     return items.sort((a, b) => b.age - a.age)[0];
// }


// function getOldestBridge(items: Bridge[]): Bridge {
//     return items.sort((a, b) => b.age - a.age)[0];
// }

const people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
  ];
  
const bridges: Bridge[] = [
    { city: 'New York', age: 100 },
    { city: 'Los Angeles', age: 80 },
    { city: 'Chicago', age: 120 },
  ];
  
const wines: Wine[] = [
    { manufacturer: 'Winery A', age: 5, grade: 'A' },
    { manufacturer: 'Winery B', age: 10, grade: 'B' },
    { manufacturer: 'Winery C', age: 15, grade: 'A+' },
  ];


console.log(getOldest(people))
console.log(getOldest(bridges))
console.log(getOldest(wines))
  
