//проект на ts в 9 модуле
import {el, mount, text} from 'redom';
import Cleave from 'cleave.js';
import cardValidator from 'card-validator';
import { validate } from 'email-validator';


// поле заполненно правильно
function setValid(input){
    input.style.borderColor = 'green'
    input.classList.add('valid')
}
// поле заполненно неправильно
function setInvalid(input){
    input.style.borderColor = 'red'
    input.classList.remove('valid')
}
// создаём и добавляем на станицу тег "name"
function createElment(name, placeholder, type){
    element =  el(name, {type, placeholder});
    mount(document.body, element);
    mount(document.body, el('br'));
    mount(document.body, el('br'));

    return element
}


//создаём input для номера карты
const inputCard = createElment('input.input-card', 'Enter card number', 'text');
//библиотекой проверям правильный ввод символов
new Cleave('.input-card', {
    creditCard: true,
});
//библиотекой проверяем номер карты
inputCard.addEventListener('blur', function() {
    var cardInfo = cardValidator.number(inputCard.value);
    if (cardInfo.isValid) {
        setValid(inputCard);
    } else {
        setInvalid(inputCard);
    }
});


//аналагично дата
const inputDate = createElment('input.input-date', 'Enter card date', 'text')

new Cleave('.input-date', {
    date: true,
    datePattern: ['m', 'y']
});

inputDate.addEventListener('blur', function() {
    var dateInfo = cardValidator.expirationDate(inputDate.value) // max год: текущий + 19
    if (dateInfo.isValid) {
        setValid(inputDate);
    } else {
        setInvalid(inputDate);
    }
});


// CVS/CVV
const inputCVV  = createElment('input.input-CVV', 'Enter card CVS/CVV', 'number')

new Cleave('.input-CVV', {
    blocks:[3]
});

inputCVV.addEventListener('blur', function() {
    if (inputCVV.value.length == 3 && inputCVV.value >= 0) {
        setValid(inputCVV);
    } else {
        setInvalid(inputCVV);
    }
});


// email
const inputEmail = createElment('input.inputEmail', 'Enter email', 'text')

inputEmail.addEventListener('blur', function() {

    if (validate(inputEmail.value)) {
        setValid(inputEmail);
    } else {
        setInvalid(inputEmail);
    }
});


// кнопка оплатить
const button = el('input#submitButton.valid', {type:'submit', value:'Оплатить', style:"height:25px; width:100px", disabled: 'true'});
mount(document.body, button)



const inputs = document.querySelectorAll('input');
const submitButton = document.getElementById('submitButton');

// проверка всех полей ввода на корректность
function checkInputs() {
  let isValid = true;
  inputs.forEach(input => {
    if (!input.classList.contains('valid')) {
      isValid = false;
    }
  });

   submitButton.disabled = !isValid
}


inputs.forEach(input => {
    input.addEventListener('blur', checkInputs);
    input.addEventListener('focus', () => submitButton.disabled = true);
  });
