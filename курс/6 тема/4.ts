class Job{

    #role:string
    #salary:number

    constructor(role:string, salary:number){
        this.#role = role
        this.#salary = salary
    }

    get salary(){
        return this.#salary
    }

    work(personName:string):void{
        console.log(`${personName} сейчас работате как ${this.#role}`)
    }

}

class Person{

    #job:Job
    #name:string

    constructor(name:string){
        this.#name = name
    }

    set job(value:Job){
        this.#job = value
    }

    getSalary():number{
        return this.#job.salary
    }

    work():void{
        this.job.work(this.#name)
    }
}

let Alex = new Person('Alex')
let Sheldon = new Person('Sheldon')

let taxi = new Job('Таксист', 10000)
let tutor = new Job('Репетитор', 15000)

Alex.job = taxi
Sheldon.job = tutor

Alex.work
Sheldon.work

Alex.job = tutor
Sheldon.job = taxi