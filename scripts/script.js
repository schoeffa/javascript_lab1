"use strict";
{
    let wins = 0;

    const startGame = () => {
        if (prompt("Do you want to play?").toLowerCase() === 'yes') {
            startCombat(prompt("Enter your name."));
        }
        else {
            console.log("Enjoy not having fun.");
        }
    };

    const startCombat = (username) => {

        let userChar = genCharSheet(username, 40);
        let grantChar = genCharSheet("Grant the Mighty Chicken", 10);
        let battle = true;

        printChar(userChar);
        printChar(grantChar);


        while (battle) {
            let nextTurn = true;
            let status;
            switch (prompt("Do you want to attack, cast, or flee").toLowerCase()) {
                case "flee":
                    battle = false;
                    nextTurn = false;
                    console.log(`${userChar[0]} is intimidated by ${grantChar[0]}'s awesomeness and flees the battle.`);
                    break;

                case "attack":
                    attack("Fists of Rage", userChar, grantChar, 2);
                    status = checkVictory(userChar, grantChar, nextTurn);
                    if (status === "endGame") {
                        battle = false;
                        nextTurn = false;
                    } else if (status === "endBattle") {
                        nextTurn = false;
                    }
                    break;

                case "cast":
                    attack("Growl", userChar, grantChar, 3);
                    status = checkVictory(userChar, grantChar);
                    if (status === "endGame") {
                        battle = false;
                        nextTurn = false;
                    } else if (status === "endBattle") {
                        nextTurn = false;
                    }
                    break;
                default:
                    console.log("Action not allowed");
            }

            if (nextTurn) {
                switch (Math.floor((Math.random() * 2) + 1)) {
                    case 1:
                        attack("Mega Chirp", grantChar, userChar, 2);
                        status = checkVictory(userChar, grantChar);
                        break;
                    case 2:
                        attack("CHIRP!", grantChar, userChar, 3);
                        status = checkVictory(userChar, grantChar);
                        break;
                    default:
                        console.log("Grant is confused!");
                        status = checkVictory(userChar, grantChar);
                        break;
                }
            }

            if (status === "endGame") {
                battle = false;
            }
        }
    }


    const getDamage = () => { return Math.floor((Math.random() * 5) + 1) };

    const genCharSheet = (charName, charHP) => { return [charName, charHP, Math.floor((Math.random() * 2) + 1), Math.floor((Math.random() * 2) + 1)] };

    const printChar = (user) => {
        console.log(`${user[0]}
HP: ${user[1]}
Strength: ${user[2]}
Magic: ${user[3]}`)
    };

    const attack = (atkName, charActive, charDefend, type) => {
        let charAttack = (getDamage() * charActive[type]);
        charDefend[1] -= charAttack;
        console.log(`${charActive[0]} uses ${atkName} and deals ${charAttack} damage.`);
        console.log(`${charDefend[0]} has ${charDefend[1]} health left.`);
    };

    const checkVictory = (userChar, grantChar) => {
        if (userChar[1] <= 0) {
            console.log(`${grantChar[0]} has defeated ${userChar[0]}.`);
            return "endGame";
        } else if (grantChar[1] <= 0) {
            wins++;
            if (wins < 3) {
                console.log(`${userChar[0]} has won battle number ${wins}.`);
                console.log(`${grantChar[0]} uses a phoenix down to revive himself and continue the battle.`);
                grantChar[1] = 10;
                return "endBattle";
            } else if (wins === 3) {
                console.log(`${userChar[0]} has defeated Grant the Mighty Chicken ${wins} times and achieved total victory!`);
                return "endGame";
            }
        } else {
            return;
        }
    };

    startGame();
}