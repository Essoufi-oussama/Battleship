import { Game } from "./Game.js";
import { Ship } from "./Ship.js";
import { Player } from "./Player.js";


import Destroyer from "./asset/big_one.svg"
import Carrier from "./asset/middle_biggest.svg"
import Submarine from "./asset/middle_smallest.svg"
import Battleship from "./asset/smallest.svg"


function display_ships(board)
{
    let y = 0;
    const ships = [];
    const board_div = document.querySelector('.board');

    board_div.querySelectorAll('.ship').forEach(ship => ship.remove());


    function get_ship_image(len)
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

    board.forEach((row, x) => {
    row.forEach((cell, y) => {
        if (cell.ship && !ships.includes(cell.ship)) {
            ships.push(cell.ship);

            const ship = document.createElement("img");
            ship.classList.add("ship");
            ship.src = get_ship_image(cell.ship.getLength());

            ship.style.width = `${cell.ship.getLength() * 10}%`;
            ship.style.height = "10%";
            if (!cell.ship.vertical) {
                ship.style.left = `${y * 10}%`;
                ship.style.top = `${x * 10}%`;
                ship.style.transform = "";
                ship.style.transformOrigin = "";
            } else {
                ship.style.left = `${(y + 1) * 10}%`;
                ship.style.top = `${x * 10}%`;
                ship.style.transformOrigin = "top left";
                ship.style.transform = "rotate(90deg)";
            }

            board_div.appendChild(ship);
        }
        if (cell.ship)
        {
            const div = document.querySelector(
                `.cell[data-x="${x}"][data-y="${y}"]`
            );
            div.style.backgroundColor = "#3e4f67"
        }
    });
});
}


function display_board(board) {
    const board_div = document.querySelector(".board");
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

function paint_board(board) {
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

function initialize_arr()
{
    const arr = [
        {
            img : Destroyer,
            id : "destroyer",
            ship: Ship(5)
        },
        {
            img : Carrier,
            id : "carrier",
            ship: Ship(4)
        },
        {
            img : Submarine,
            id : "submarine1",
            ship: Ship(3)
        },
        {
            img : Submarine,
            id : "submarine2",
            ship: Ship(3)
        },
        {
            img : Battleship,
            id : "battleship",
            ship: Ship(2)
        }]
    return  arr;
}

function battleship_choice_page(name)
{
    const player = Player(name, "player");
    let ver = false;
    let curr_ships = initialize_arr();

    function display_ships_choice()
    {

        const container = document.querySelector(".battleships-container")
        container.innerHTML = "";
        curr_ships.forEach(ship =>
        {
            container.innerHTML += `
                <img class="battleship-img" id="${ship.id}" src="${ship.img}">
            `
        })
        const ships = document.querySelectorAll(".battleship-img");
        ships.forEach(ship => {
            ship.addEventListener("click", (e) => {
                    document.querySelector(".active")?.classList.remove("active")
                    ship.classList.add('active')

            });
        })
    }

    function add_cells_events()
    {
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell =>
        {
            cell.addEventListener("click", (e) => {
                const active = document.querySelector(".active") 
                if (active === null)
                    return ;
                const active_ship = curr_ships.find(ship => ship.id === active.id)
                
                if (!active_ship)
                    return;

                const coordinate = {x: Number(cell.dataset.x), y: Number(cell.dataset.y), vertical: ver}
                
                active_ship.ship.vertical = ver;
                if (player.insertShip(active_ship.ship, coordinate))
                {
                    curr_ships = curr_ships.filter(ship => ship.id !== active.id)
                    display_ships_choice()
                    paint_board(player.getBoard().board)
                    display_ships(player.getBoard().board)
                    if (!curr_ships.length)
                    {
                        const btn = document.querySelector(".start-btn");
                        btn.disabled = false;
                        btn.addEventListener("click", () => {
                            console.log("start game");
                        })
                    }
                } 
            })
        })
    }

    document.getElementById("content").innerHTML =
    `
        <div class="deployment-page">
                <div class="board-div">
                    <p>PHASE 1:  DEPLOYMENT</p>
                    <h1>Fleet Position</h1>
                    <p>strategically position your fleets</p>
                    <div class="board"></div>
                </div>
                <div class="battleships">
                    <div class="info-bcontainer">
                        <h1>${name} roster </h1>
                        <button class="vertical">🔁</button>
                    </div>
                    <div class="battleships-container">
                    </div>
                    <button class="reset-btn">reset</button>
                    <button class="start-btn" disabled>start</button>
                </div>
            </div>
        
    `

    display_ships_choice();

    display_board(player.getBoard().board);
    add_cells_events();
    display_ships(player.getBoard().board);

    document.querySelector('.reset-btn').addEventListener("click", () => {
        curr_ships = initialize_arr();
        player.clear();
        display_ships_choice();
        display_board(player.getBoard().board);
        add_cells_events();
        const btn = document.querySelector(".start-btn");
        btn.disabled = true;
    })

    document.querySelector('.vertical').addEventListener("click", () => {
        ver  = !ver;
    })

}

function display_main_page()
{
    document.getElementById("content").innerHTML = `
        <div class="main-page">
        <div class="form-container">
            <div class="sweep"></div>
            <p>IDENTITY VERIFICATION</p>
            <h1>Commander <br> Registration</h1>
            <form id="player-creation">
                <label for="name">Enter callsign</label>
                <input class="input" type="text" name="name" placeholder="GHOST_LEADER" maxlength="16" required>
                <button type="submit" class="submit-button">INITIALIZE FLEET</button>
            </form>
        </div>
        </div>
    `;
    const form = document.getElementById("player-creation");
    form.addEventListener("submit" , (e) => {
        e.preventDefault();
        const form_data = new FormData(form)
        battleship_choice_page(form_data.get("name"))
    })
}


export function dom_init()
{
    display_main_page()
    // battleship_choice_page('fff')
    
}