//2


/*
const arr0 = [1, 2, 3] // number[]
*/
const arr1: (number | null)[] = [1, 2, 3, null]; 
const arr2: (string | boolean)[] = ['safety', '=', true]
const arr3: (number[] | string[])[] = [
  [1, 2, 3, 4, 5],
  ['1', '2', '3', '4', '5'],
]
const arr4: (string | number | boolean | undefined)[] = [
  1, 2, true, 'str', undefined
] 

type Person = {
    id: number;
    name:string;
}

const arr5:Person[] = [
  {
    id: 1,
    name: 'Студент',
  },
  {
    id: 2,
    name: 'Наставник',
  }
]
