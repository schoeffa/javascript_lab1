"use strict";
{
    // Wins declared globally so it can be altered by functions
    let wins = 0;

    // Prompt to give user choice to play or not
    const startGame = () => {
        if (prompt("Do you want to play?").toLowerCase() === 'yes') {
            startCombat(prompt("Enter your name."));
        }
        else {
            console.log("Enjoy not having fun.");
        }
    };

    // Function to simulate combat
    const startCombat = (username) => {

        // Initializes user and Grant characters, loop condition, and potion inventory
        let userChar = genCharSheet(username, 40);
        let grantChar = genCharSheet("Grant the Mighty Chicken", 10);
        let battle = true;
        let potions = 3;

        // Displays initial stats for each character
        printChar(userChar);
        printChar(grantChar);

        // Loop to run battle
        while (battle) {

            // Initializes flags used to determine if character 2 gets his turn and whether we are at the end of battle or end of game
            let nextTurn = true;
            let status;

            // Switch statement allowing user choice of action
            switch (prompt("Do you want to attack, cast, heal, check stats, or flee?").toLowerCase()) {

                // Allows user to flee battle
                case "flee":
                    battle = false;
                    nextTurn = false;
                    console.log(`${userChar[0]} is intimidated by ${grantChar[0]}'s awesomeness and flees the battle.`);
                    break;

                // Allows user to attack using Strength stat
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
                
                // Allows user to attack using Magic stat
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
                
                // Allows user to consume a potion, if available, to heal HP
                case "heal":
                    if (potions > 0) {
                        potions--;
                        heal(userChar);
                    }
                    else {
                        console.log(`${userChar[0]} is out of potions.`)
                        nextTurn = false;
                    }
                    break;

                // Allows user to check current stats
                case "check stats":
                    printChar(userChar);
                    nextTurn = false;
                    break;
                
                // Displays if user types an invalid command 
                default:
                    console.log("Action not allowed");
                    nextTurn = false;
            }

            // Conditional and switch statement to simulate Grant's turn
            // Math in switch statement randomizes whether Grant uses physical attack or magic
            if (nextTurn) {
                switch (Math.floor((Math.random() * 2) + 1)) {
                    case 1:
                        attack("Mega Peck", grantChar, userChar, 2);
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

            // Conditional to see if Grant has defeated user
            if (status === "endGame") {
                battle = false;
            }
        }
    }

    // Function used to assign randomized damage for attacks
    const getDamage = () => { return Math.floor((Math.random() * 5) + 1) };

    // Function used to generate a character and corresponding stats
    const genCharSheet = (charName, charHP) => { return [charName, charHP, Math.floor((Math.random() * 2) + 1), Math.floor((Math.random() * 2) + 1), Math.floor((Math.random() * 2) + 1)] };

    // Function used to print character stats
    const printChar = (user) => {
        console.log(`${user[0]}
HP: ${user[1]}
Strength: ${user[2]}
Magic: ${user[3]}
Med: ${user[4]}`)
    };

    // Function used to execute attack and update character HP
    const attack = (atkName, charActive, charDefend, type) => {
        let charAttack = (getDamage() * charActive[type]);
        charDefend[1] -= charAttack;
        console.log(`${charActive[0]} uses ${atkName} and deals ${charAttack} damage.`);
        if (charDefend[1] < 0) { charDefend[1] = 0};
        console.log(`${charDefend[0]} has ${charDefend[1]} health left.`);
    };

    // Function ussed to check for battle and game victory conditions
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

    // Function used to consume potion and heal character
    const heal = (userChar) => {
        let potionVal = (Math.floor((Math.random() * 10) + 1) * userChar[4]);
        userChar[1] += potionVal;
        if (userChar[1] > 40) {
            console.log(`${userChar[0]} drinks a potion and heals ${userChar[1] - 40}HP`);
            userChar[1] = 40;
        } else {
            console.log(`${userChar[0]} drinks a potion and heals ${potionVal}HP`);
        }
    };

    startGame();
}