//2
type Cat = {
    name: string,
    meow: () => string
}

type Dog = {
    name: string,
    bark: () => string
}

const cat: Cat = {
    name: 'Pushok',
    meow: () => 'meow!'
};

const dog: Dog = {
    name: 'Bobik',
    bark: () => 'bark!'
}


// 1. С использованием обычных тайпгардов
function whatDoesThePetSay1(pet: Dog | Cat): string {
    if ('meow' in pet) {
        return pet.meow();
    } else {
        return pet.bark();
    }
}

// 2. С использованием пользовательских тайпгардов
function isCat(pet: Dog | Cat): pet is Cat {
    return (pet as Cat).meow !== undefined;
}

function whatDoesThePetSay2(pet: Dog | Cat): string {
    if (isCat(pet)) {
        return pet.meow();
    } else {
        return pet.bark();
    }
}

// 3. С использованием тайпгардов через оператор in
function whatDoesThePetSay3(pet: Dog | Cat): string {
    if ('meow' in pet) {
        return pet.meow();
    } else {
        return pet.bark();
    }
}
