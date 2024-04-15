//4
function capitalizeWords2(text:string):string{
    let words = text.split(' ');

    const index = words[0].length
    words.splice(index, 1);

    const capitalizeWord = words.map(word =>{
        return word[0].toUpperCase() + word.slice(1);
    })

    return capitalizeWord.join(' ');
}

console.log(capitalizeWords2('Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы уволили.'))
