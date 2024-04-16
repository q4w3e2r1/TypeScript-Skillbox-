import cardValidator from 'card-validator';


export function CheckCard(value:string):boolean
{   
    return cardValidator.number(value).isValid
}
