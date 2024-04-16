import {el, mount} from 'redom';
import Cleave from 'cleave.js';
import cardValidator from 'card-validator';
import { CheckCard } from './checkCard';
import { CheckCVV } from './checkCVV';
import { CheckEmail } from './checkEmail';


// поле заполненно правильно
function setValid(input: HTMLElement){
    input.style.borderColor = 'green'
    input.classList.add('valid')
}
// поле заполненно неправильно
function setInvalid(input: HTMLElement){
    input.style.borderColor = 'red'
    input.classList.remove('valid')
}
// создаём и добавляем на станицу тег "name"
function createElment(name:string, placeholder:string, type:string): HTMLElement
{
    let element = el(name, {type, placeholder});
    mount(document.body, element);
    mount(document.body, el('br'));
    mount(document.body, el('br'));

    return element
}


//создаём input для номера карты
const inputCard = createElment('input.input-card', 'Enter card number', 'text') as HTMLInputElement
//библиотекой проверям правильный ввод символов
new Cleave('.input-card', {
    creditCard: true,
});


//библиотекой проверяем номер карты
inputCard.addEventListener('blur', function() {
    if (CheckCard(inputCard.value)) {
        setValid(inputCard);
    } else {
        setInvalid(inputCard);
    }
});


//аналагично дата
const inputDate = createElment('input.input-date', 'Enter card date', 'text') as HTMLInputElement

new Cleave('.input-date', {
    date: true,
    datePattern: ['m', 'y']
});

inputDate.addEventListener('blur', function() {
    const dateInfo = cardValidator.expirationDate(inputDate.value) // max год: текущий + 19
    if (dateInfo.isValid) {
        setValid(inputDate);
    } else {
        setInvalid(inputDate);
    }
});


// CVS/CVV
const inputCVV  = createElment('input.input-CVV', 'Enter card CVS/CVV', 'number') as HTMLInputElement

new Cleave('.input-CVV', {
    blocks:[3]
});

inputCVV.addEventListener('blur', function() {
    const value = inputCVV.value
    if(CheckCVV(value)){
        setValid(inputCVV);
    } else {
        setInvalid(inputCVV);
    }
});


// email
const inputEmail = createElment('input.inputEmail', 'Enter email', 'text') as HTMLInputElement

inputEmail.addEventListener('blur', function() {

    if (CheckEmail(inputEmail.value)) {
        setValid(inputEmail);
    } else {
        setInvalid(inputEmail);
    }
});


// кнопка оплатить
const button = el('input#submitButton.valid', {type:'submit', value:'Оплатить', style:"height:75px; width:200px", disabled: 'true'})
mount(document.body, button)



const inputs = document.querySelectorAll('input');
const submitButton = document.getElementById('submitButton') as HTMLButtonElement

// проверка всех полей ввода на корректность
function checkInputs() {
    let isValid = true;
    inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
        isValid = false;
        }
    });

   submitButton!.disabled = !isValid
}


inputs.forEach(input => {
    input.addEventListener('blur', checkInputs);
    input.addEventListener('focus', () => submitButton!.disabled = true);
  });



