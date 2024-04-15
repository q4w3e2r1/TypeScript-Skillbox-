//1 Ошибка заключается в неправильном значении/типе-значения поля age
// благодаря типизации в ts тип поля age был заранее указан, и компилятор подсвечивает ошибочное значение, не давая запустить код с ошибкой
const actor: {
    name: string;
    firstName: string;
    country: string;
    city: string;
    hasOskar: boolean;
    filmsCount: number;
    age: number;
    languages: string[];
  } = {
      name: 'Michael',
      firstName: 'Ivanov',
      country: 'Russia',
      city: 'Makhachkala',
      hasOskar: false,
      filmsCount: 10,
      age: 14,
      languages: ['RU-ru', 'EN-us', 'TR-tr'],
  };
  const howOldWillBeActorAfterTwentyYears = (actor) => {
      return actor.age + 20;
  }
  console.log(howOldWillBeActorAfterTwentyYears(actor));
