import { validate } from "email-validator";

export function CheckEmail(email: string): boolean{
    if(!isNaN(Number(email))){
        return false
    }
    return validate(email)
}