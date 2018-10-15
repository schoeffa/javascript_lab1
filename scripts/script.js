"use strict";

function start() {
    let play =  prompt("Do you want to play?");

    if (play.toLowerCase() == 'yes') {
        rpg();
    }
}

function rpg() {
   //Sets inital state of all variables
    let name = prompt("Enter your name");
    let grantHP = 10;
    let userHP = 40;
    let wins = 0;

    //loop to simulate battle, will run until user wins 3 times or dies
    while (wins < 3 && userHP > 0) {

        //generates random number for attack rolls
        let attackGrant = Math.floor((Math.random() * 2) + 1);
        let attackUser = Math.floor((Math.random() * 2) + 1);

        //updates each player's HP according to attack roll
        grantHP -= attackGrant;
        userHP -= attackUser;

        //displays each player's health
        console.log(`${name} has ${userHP} health left.`);
        console.log(`Grant the Mighty Chicken has ${grantHP} health left.`);

        //checks to see if Grant is out of health and updates win count
        if (grantHP <= 0) {
            wins += 1;
            grantHP = 10;
            
            //Displays user win total and sets up next round
            if (wins < 3) {
                console.log(`${name} has won battle number ${wins}.`);
                console.log("Grant the Mighty Chicken uses a phoenix down to revive himself and continue the battle.");
            }
        }

        //Displays defeat message
        if (userHP == 0) {
            console.log(`Grant the Mighty Chicken has defeated ${name}.`);
        }

        //Displays final victory message
        if (wins == 3) {
            console.log(`${name} has defeated Grant the Mighty Chicken ${wins} times and achieved total victory!`);
        }
    }
}