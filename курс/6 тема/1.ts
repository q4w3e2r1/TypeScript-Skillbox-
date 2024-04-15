//1
class User{ // класс для всех юзеров

    constructor(public readonly numberOfMessage:number, public readonly numberOfWarnings:number, public readonly registrationDate: Date){}
}


class TrustedUser{ // 1 класс доверенный с днями регистрации и методом рассчёта коеф доверенности

    numberOfMessage:number
    numberOfWarnings:number
    daysRegistered:number

    constructor(user:User){
        this.numberOfMessage = user.numberOfMessage
        this.numberOfWarnings = user.numberOfWarnings

        const now = new Date()
        const registrationDate = user.registrationDate
        this.daysRegistered = Math.floor((now.getTime() - registrationDate.getTime()) / (1000 * 3600 * 24))
    }

    getConfidenceRatio():number{
        return this.numberOfMessage * 2 - this.numberOfWarnings * 100 + this.daysRegistered
    }
}

class ConfidenceHelper{ //2  класс-хелпер
    
    static checkConfidenceRatio(ratio:number): boolean{
        return ratio >= 0
    }
}
// 3 проврека юзеров
function getUntrustedUsers(users: User[]): User[] {
    const untrustedUsers: User[] = [];
    for (const user of users) {
        const trustedUser = new TrustedUser(user);
        const confidenceRatio = trustedUser.getConfidenceRatio();
        if (!ConfidenceHelper.checkConfidenceRatio(confidenceRatio)) {
            untrustedUsers.push(user);
        }
    }
    return untrustedUsers;
}

const user1 = new User(100, 10, new Date(2024, 0, 1));
const user2 = new User(10, 5, new Date(2024, 11, 1));
const user3 = new User(1500, 10, new Date(2023, 2, 1));

const users: User[] = [user1, user2, user3];

const untrustedUsers = getUntrustedUsers(users);
console.log(untrustedUsers)
