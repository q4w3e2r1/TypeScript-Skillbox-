//6)
let test = 1991;
while(true)
{
    test = test.toString().split('').map(Number).reduce((acc, curr)=> acc + curr, 0);
    if(test < 10){break}
}
console.log(test)
