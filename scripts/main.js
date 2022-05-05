import { Therapy } from "./therapy.js";


let lastTherapy;
let nextTherapy;
let button;
let infoParagraph;


function updateStorage() {
    let therapies = {};
    therapies["last"] = lastTherapy;
    therapies["next"] = nextTherapy;
    localStorage.setItem("therapy", JSON.stringify(therapies));
}


function updateUI() {
    let div = document.querySelector(".therapy-old");
    div.querySelector(".primary").innerHTML = lastTherapy.getFormatedDate();
    div.querySelector(".secondary").innerHTML = lastTherapy.getSide();

    div = document.querySelector(".therapy-new");
    div.querySelector(".primary").innerHTML = nextTherapy.getFormatedDate();
    div.querySelector(".secondary").innerHTML = nextTherapy.getSide();
}


function updateInfo(show) {
    infoParagraph.hidden = !show;
}


function checkDay() {
    let today = new Date();
    if (today.getMonth() == nextTherapy.getDate().getMonth() && today.getDate() == nextTherapy.getDate().getDate())
        return true;
    return false;
}


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


function main() {
    let data = localStorage.getItem("therapy");

    if (data) {
        data = JSON.parse(data);
        lastTherapy = new Therapy(new Date(data["last"].date), data["last"].side);
        nextTherapy = new Therapy(new Date(data["next"].date), data["next"].side);
    } else {
        lastTherapy = new Therapy(new Date(2022, 3, 20), 'D');  //hardcoded, enough for now!
        nextTherapy = lastTherapy.calculateNextTherapy();
        updateStorage();
    }

    updateUI();

    button = document.querySelector(".button");
    button.addEventListener("click", doTherapy);
    infoParagraph = document.getElementById("info");
}


main();