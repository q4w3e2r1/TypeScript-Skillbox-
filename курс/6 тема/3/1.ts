//1

interface Run {
    run():void
}

interface Fly{
    fly():void
}

interface Swim{
    swim():void
}

abstract class Human implements Run, Fly, Swim {
    run(): void {}
    fly(): void {}
    swim(): void {
        
    }
}