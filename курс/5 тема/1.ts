//1
type House = {
    street: string,
    apartmentCount: number,
    buildInfo: {
        year: number,
        material: string,
    }
};
function getHouse(): House {

    //const house = {} as House;
    //из-за 'as House' при комментировании house.apartmentCount house.buildInfo компилятор не видит ошибку
    //она появлется только при обращении к несуществующим полям
    //из курса: Для избежания таких проблем не используйте оператор as и указывайте правильные типы для переменных.
    // Если правильный тип неизвестен, то можно возвращать готовый объект с помощью оператора return. 
    //Это позволит избежать проблем во время выполнения программы и обеспечить безопасность кода в TypeScript.
    return {
        street: 'Pushkina',
        apartmentCount: 76,
        buildInfo: {
            year: 1996,
            material: 'rocks',
        }
    }

}

function handleHouse(): void {
    const house: House = getHouse();

    console.log(`${house.street} st., ${house.apartmentCount} apartments total`);
    console.log(`build in ${house.buildInfo.year}, build from ${house.buildInfo.material} `);
}

handleHouse();
