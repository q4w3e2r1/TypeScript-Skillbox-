//3

// Первая часть кода:
// Функция принимает некоторую информацию, после чего проходит по ней и происходит суммирование кол-во объектов с проверкой на возраст и пол
function someFunc(data) {
    return data.reduce((acc, current) => {
        acc + Number(current.age > 18 && current.isMale), 0});
    }


// Вторая часть кода: 
// Теперь понятно, что в функцию передаётся массив состоящий из элементов типа Human, определенны поля типа Human
// сама функция должна вернуть значение равное общему кол-ву всех Human муж. рода страше 18 лет
    type Human = {
        name: string,
        age: number,
        gender: 'male' | 'female',
    }
    function someFunc(data: Human[]): number {
      return data.reduce((acc: number, current: Human) => {
            acc + Number(current.age > 18 && current.gender === 'male')}, 0)
        };
