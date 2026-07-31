import Destroyer from "./asset/big_one.svg"
import Carrier from "./asset/middle_biggest.svg"
import Submarine from "./asset/middle_smallest.svg"
import Battleship from "./asset/smallest.svg"


export function get_ship_image(len)
{
    switch(len)
    {
        case 5:
            return Destroyer;
        case 4:
            return Carrier;
        case 3:
            return Submarine;
        case 2:
            return Battleship
    }
}

export function display_board(board, selector) {
    const board_div = document.querySelector(selector);
    board_div.innerHTML = "";

    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.x = x;
            div.dataset.y = y;
            board_div.appendChild(div);
        });
    });
}

export function paint_board(board) {
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.querySelector(
                `.cell[data-x="${x}"][data-y="${y}"]`
            );

            if (cell.hit) {
                div.style.backgroundColor = "red";
            } else {
                div.style.backgroundColor = "";
            }
        });
    });
}

export const playerMessages = {
  hit: [
    "🎯 Direct hit!",
    "💥 Target confirmed!",
    "🔥 Nice shot!",
    "⚡ Enemy ship damaged!",
    "🚢 That's a hit!",
    "💣 Bullseye!",
    "🎉 You hit an enemy ship!",
    "🌊 Hit confirmed!"
  ],

  miss: [
    "🌊 Splash! Nothing there.",
    "❌ Missed.",
    "💨 The shot went wide.",
    "🧭 No enemy at those coordinates.",
    "🌫️ Empty waters.",
    "⚓ Just ocean.",
    "😅 Better luck next shot.",
    "🎯 Keep searching!"
  ],

  sunk: [
    "☠️ You sank an enemy ship!",
    "💥 Enemy vessel destroyed!",
    "⚓ Ship sent to the bottom!",
    "🔥 Target eliminated!",
    "🚢 Another enemy ship is down!",
    "🎯 Enemy battleship destroyed!",
    "🏴 One less ship to worry about!",
    "💣 Fleet weakened!"
  ],

  win: [
    "🏆 Victory! Enemy fleet destroyed!",
    "🎉 You win!",
    "⚓ The seas are yours!",
    "💥 Mission accomplished!",
    "🚢 All enemy ships have been sunk!",
    "🥇 Admiral, you've won the battle!"
  ],

  lose: [
    "💀 Your fleet has been destroyed.",
    "⚓ Defeat... better luck next time.",
    "🚢 All your ships have been sunk.",
    "🌊 The enemy controls the seas.",
    "🎯 Mission failed.",
    "☠️ You'll get them next time!"
  ]
};

export const aiMessages = {
  hit: [
    "🤖 Target acquired. Direct hit.",
    "🤖 Impact confirmed.",
    "🤖 Enemy vessel damaged.",
    "🤖 Calculating next strike...",
    "🤖 Resistance is ineffective.",
    "🤖 Successful attack.",
    "🤖 Your fleet is exposed.",
    "🤖 Hit confirmed."
  ],

  miss: [
    "🤖 Target lost. Recalculating.",
    "🤖 Missed. Adjusting trajectory.",
    "🤖 No contact detected.",
    "🤖 Searching new coordinates.",
    "🤖 Attack unsuccessful.",
    "🤖 Updating firing solution.",
    "🤖 Scanning the area...",
    "🤖 You were fortunate."
  ],

  sunk: [
    "🤖 Enemy vessel eliminated.",
    "🤖 Ship destroyed.",
    "🤖 Target neutralized.",
    "🤖 Fleet integrity compromised.",
    "🤖 Another ship sent below.",
    "🤖 Vessel sunk.",
    "🤖 Destruction confirmed.",
    "🤖 One less threat remains."
  ]
};
