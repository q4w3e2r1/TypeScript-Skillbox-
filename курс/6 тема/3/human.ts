interface CanRun{
    run():void
}

interface CanSwim{
    swim():void
}
interface CanFly {
    fly():void
}

abstract class Human implements CanRun, CanFly, CanSwim{

    run(): void {
        console.log('Я хорошо бегаю')
    }

    swim(): void {
        console.log('Я хорошо плаваю')
    }

    fly(): void {
        console.log('Я хорошо летаю')
    }
}

class Kryptonian extends Human{}

class Earthling extends Human{
    fly(): void {
        throw new Error('Earthling не умеет летать')
    }
}

class NibiruAthlete extends Human{
    fly(): void {
        throw new Error('NibiruAthlete не умеет летать')
    }

    swim(): void {
        throw new Error("Nibiru не умеет плавать");
    }

}

const athlete = new NibiruAthlete();
const earthling = new Earthling();
const kryptonian = new Kryptonian();

athlete.run()
earthling.swim();
kryptonian.fly();