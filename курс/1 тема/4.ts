//4)
let text ='Это пример!';
let result = text.split(' ').map(word =>
    word.split('').reverse().join('')
).join(' ')
console.log(result)
