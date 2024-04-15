//3
function capitalizeWords(text:string):string{
    const words = text.split(' ');
    const capitalizeWord = words.map(word =>{
        return word[0].toUpperCase() + word.slice(1);
    })

    return capitalizeWord.join(' ');
}

console.log(capitalizeWords('Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы уволили.'))
