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
