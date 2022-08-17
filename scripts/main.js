import { Therapy } from "./therapy.js";


let lastTherapy;
let nextTherapy;
let button;
let infoParagraph;


/* Function is used for saving the data into the local storage used by broswer. */
function updateStorage() {
    let therapies = {};
    therapies["last"] = lastTherapy;
    therapies["next"] = nextTherapy;
    localStorage.setItem("therapy", JSON.stringify(therapies));
}


/* Function updates the UI: 
    previous therapy date and next therapy date, respectively. */
function updateUI() {
    let div = document.querySelector(".therapy-old");
    div.querySelector(".primary").innerHTML = lastTherapy.getFormatedDate();
    div.querySelector(".secondary").innerHTML = lastTherapy.getSide();

    div = document.querySelector(".therapy-new");
    div.querySelector(".primary").innerHTML = nextTherapy.getFormatedDate();
    div.querySelector(".secondary").innerHTML = nextTherapy.getSide();
}


/* Value in infoParagraph is static.
So when we want to show the info to the client,
we simply unhide the html element. And vice versa! */
function updateInfo(show) {
    infoParagraph.hidden = !show;
}


/* Function checks if it is the time for therapy. 
It is possible that therapy was skipped, and in that case
app will allow client to use therapy aswell.
Returns boolean value. */
function checkDay() {

    function checkIfSkipped() {
        return currentMonth === nextTherapyMonth ? 
                currentDay >= nextTherapyDay :
                currentMonth >= nextTherapyMonth;
    }

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const nextTherapyMonth = nextTherapy.getDate().getMonth();
    const nextTherapyDay = nextTherapy.getDate().getDate();
    
    if (currentMonth === nextTherapyMonth && currentDay === nextTherapyDay)
        return true;
    return checkIfSkipped();
}


/* Function is called when a client presses the "Pikni se!" button.
If it is allowed to take the therapy, function updates UI aswell as 
a date for the next therapy. */
function doTherapy() { 
    if (checkDay()) {
        updateInfo(false);
        console.log("Therapy");
        lastTherapy = nextTherapy;
        nextTherapy = lastTherapy.calculateNextTherapy();
        updateUI();
        updateStorage();
    } else {
        updateInfo(true);
    }
}


/* Main function. 
Loads data from local storage (therapies, previous and the following one).
Updates the UI. Adds UI functionallity. */
function main() {
    let data = localStorage.getItem("therapy");

    if (data) {
        data = JSON.parse(data);
        lastTherapy = new Therapy(new Date(data["last"].date), data["last"].side);
        nextTherapy = new Therapy(new Date(data["next"].date), data["next"].side);
    } else {
        lastTherapy = new Therapy(new Date(2022, 3, 29), 'D');  //hardcoded, enough for now!
        nextTherapy = lastTherapy.calculateNextTherapy();
        updateStorage();
    }

    updateUI();

    button = document.querySelector(".button");
    button.addEventListener("click", doTherapy);
    infoParagraph = document.getElementById("info");
}


main();