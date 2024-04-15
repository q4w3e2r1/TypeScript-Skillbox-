//2 Ошибка заключается в попытке обращения к несуществующим свойствам ивента мыши 
// компилятор видит эту ошибку, понимает что это событие мыши и подсказывает какие свойтсва доступны
document.addEventListener('click', (e) => {
    const coords = [e.clientX, e.clientY];
    console.log(`Point is ${coords[0]}, ${coords[1]}`);
});
