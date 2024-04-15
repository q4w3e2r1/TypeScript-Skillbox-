//5)
let test = 1991;
let temp = test.toString();
let result =temp.split('').map(num => Number(num) * Number(num)).join('')
console.log(Number(result))
