import { validate } from "email-validator";

export function CheckEmail(email: string): boolean{
    return validate(email)
}