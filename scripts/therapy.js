export class Therapy {
    #date;
    #side;
    #therapy_interval = 14; //days between two therapies

    constructor(date, side) {
        this.#date = date;
        this.#side = side;
    }

    getDate() {
        return this.#date;
    }

    getSide() {
        return this.#side;
    }

    toJSON() {
        return { date: this.#date, 
                 side: this.#side, 
                 therapy_interval: this.#therapy_interval };
    }

    getFormatedDate() {
        return this.#date.getDate() + "." + (this.#date.getMonth() < 9 ? "0" : "") + (this.#date.getMonth() + 1) + "." + this.#date.getFullYear() + ".";
    }

    calculateNextTherapy() {
        let newDate = new Date(this.#date);
        newDate.setDate(newDate.getDate() + this.#therapy_interval);
        return new Therapy(
            newDate, 
            this.#side == 'L' ? 'D' : 'L'
        );
    }

    toString() {
        return this.getFormatedDate() + " " + this.#side;
    }
}