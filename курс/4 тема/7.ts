//7
type User = {
    name: string;
    age: number;
    occupation: string;
}

type Admin = {
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin; // замените unknown на нужный тип

export const persons: Person[] /* замените User[] на Person[] */ = [
    {
        name: 'Roman Abramov',
        age: 25,
        occupation: 'Millionaire'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        name: 'Andrey Fox',
        age: 23,
        occupation: 'Developer'
    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    }
];

export function logPerson(user: Person) { // замените User на Person
    console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
