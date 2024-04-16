import { CheckCard } from "./checkCard"
import { CheckCVV } from "./checkCVV"
import { CheckEmail } from "./checkEmail"


describe('Валидация номера карты', ()=>{
    it('корректный номер карты', ()=>{

        const card = "5200828282828210"

        expect(CheckCard(card)).toBeTruthy
    })

    it('произвольная строка, содержащая любые нецифровые символы', ()=>{

        const card = "5!00828282gh28210"

        expect(CheckCard(card)).toBeFalsy
    })

    it('номер карты с недостаточным кол-вом цифр', ()=>{

        const card = "52008282828210"

        expect(CheckCard(card)).toBeFalsy
    })

    it('номер карты  со слишком большим количеством цифр', ()=>{

        const card = "52008282828282104532"

        expect(CheckCard(card)).toBeFalsy

    })
})

describe('Валидация CVV/CVC', ()=>{
    it('строка с тремя цифровыми символами', ()=>{

        const cvv = "123"

        expect(CheckCVV(cvv)).toBeTruthy
    })

    it('строки с 1-2 цифровыми символами', ()=>{

        const cvv = "12"

        expect(CheckCVV(cvv)).toBeFalsy
    })

    it('строки с четырьмя и больше цифровыми символами', ()=>{

        const cvv = "1233"

        expect(CheckCVV(cvv)).toBeFalsy
    })

    it('строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания).', ()=>{

        const cvv = "!pй"

        expect(CheckCVV(cvv)).toBeFalsy
    })
})

describe('Валидация email', ()=>{
    it('строки, которые содержат корректный email в формате mailname@domen.ru', ()=>{

        const email = "mailname@domen.ru"

        expect(CheckEmail(email)).toBeTruthy
    })

    it('не пропускает строки, которые начинаются с @', ()=>{

        const email = "@mailname@domen.ru"

        expect(CheckEmail(email)).toBeFalsy
    })

    it('не пропускает строки, которые не содержат @.', ()=>{

        const email = "mailnamedomen.ru"

        expect(CheckEmail(email)).toBeFalsy
    })

    it('не пропускает строки, которые не содержат названия почтового ящика или домена', ()=>{

        const email = "mailname@"

        expect(CheckEmail(email)).toBeFalsy
    })

    it(' не пропускает строки, которые начинаются с цифр', ()=>{

        const email = "1mailname@domen.ru"

        expect(CheckEmail(email)).toBeFalsy
    })
})