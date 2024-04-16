



export function CheckCVV(cvv:string):boolean{
    return cvv.length === 3 && Number(cvv) >= 0
}