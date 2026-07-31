import { Game } from "./Game.js";
import { Ship } from "./Ship.js";
import { Player } from "./Player.js";
import {get_ship_image, display_board, paint_board, playerMessages, aiMessages} from "./utils.js";


function display_ships(board, selector)
{
    let y = 0;
    const ships = [];
    const board_div = document.querySelector(selector);

    board_div.querySelectorAll('.ship').forEach(ship => ship.remove());

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

function get_ship_origin(board, ship)
{
    let origin = null;

    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            if (cell.ship === ship)
            {
                if (origin === null || x < origin.x || y < origin.y)
                    origin = { x, y };
            }
        });
    });

    return origin;
}

function create_hit_div(cor)
{
    const {x, y} = cor
    const element = document.createElement("div");
    element.classList.add("circle")
    element.style.top = `${x * 10 + 5}%`
    element.style.left = `${y * 10 + 5}%`
    element.style.transform = "translate(-50%, -50%)";
    element.style.backgroundColor = 'gray';
    return element;
}


function display_end_page(message)
{
    document.getElementById("content").innerHTML = `
    <div class="end-msg-container">
    <div class="final-msg">
    </div>
    <button class="retry">retry</button>
    </div>
    `
    document.querySelector(".final-msg").textContent = message;
    document.querySelector(".retry").addEventListener("click", () => {
        display_main_page();
    });
}

function color_cpu_choice(coor, board)
{
    const parent = document.querySelector(`.player-board`)
    const element = create_hit_div(coor);
    const message = document.querySelector(".message");   
    if (board.containShip(coor))
        {
            element.style.backgroundColor = 'red'
            if (board.shipStatus(coor))
                {
                    message.textContent = aiMessages.sunk[Math.floor(Math.random() * aiMessages.sunk.length)];
                }
        else
            message.textContent = aiMessages.hit[Math.floor(Math.random() * aiMessages.hit.length)];
    }
    else
        message.innerHTML = aiMessages.miss[Math.floor(Math.random() * aiMessages.miss.length)]
    parent.appendChild(element);
    
}

function start_game(player)
{
    const game = Game(player);
    let player_turn = true;
    const sunk_cpu_ships = []
    
    function display_sunk_ships()
    {
        const board_div = document.querySelector(".cpu-board")
        document.querySelectorAll(".sunk-ship").forEach(ship => ship.remove())
        sunk_cpu_ships.forEach(ship =>
            {
                const {x, y, vertical} = ship.origin
                const ship_img = document.createElement("img")
                ship_img.classList.add("sunk-ship")
                ship_img.src = get_ship_image(ship.getLength());
                ship_img.style.width = `${ship.getLength() * 10}%`;
                ship_img.style.height = "10%";
                if (vertical)
                {
                    ship_img.style.top = `${x * 10}%`
                    ship_img.style.left = `${(y + 1) * 10}%`
                    ship_img.style.transformOrigin = "top left";
                    ship_img.style.transform = "rotate(90deg)";
                }
                else
                {
                    ship_img.style.top = `${x * 10}%`
                    ship_img.style.left = `${y * 10}%`
                    ship_img.style.transformOrigin = "";
                    ship_img.style.transform = "";
                }
                board_div.appendChild(ship_img)
            }
        )
    }


    function play_turn(cell, board)
    {
        const coor = 
        {
            x: Number(cell.dataset.x),
            y: Number(cell.dataset.y)
        }
        const message = document.querySelector(".message");   
        if (board.receiveAttack(coor))
        {
            const parent = document.querySelector(".cpu-board")
            const element = create_hit_div(coor);
            if (board.containShip(coor))
            {
                element.style.backgroundColor = 'red'
                if (board.shipStatus(coor))
                {
                    message.textContent = playerMessages.sunk[Math.floor(Math.random() * playerMessages.sunk.length)];
                    sunk_cpu_ships.push(board.getShip(coor))
                    display_sunk_ships();
                }
                else
                    message.textContent = playerMessages.hit[Math.floor(Math.random() * playerMessages.hit.length)];
            }
            else
            {
                message.innerHTML = playerMessages.miss[Math.floor(Math.random() * playerMessages.miss.length)];
            }
            parent.appendChild(element);
        }
    }
    
    
    document.getElementById("content").innerHTML =`
    <div class="boards-container">
    <div class="player-board"></div>
    <div class="cpu-board"></div>
        </div>
        <div class="messages-container">
            <div class="message"></div>
        </div>
    `
    const player_board = game.getPlayerBoard();
    const cpu_board = game.getCpuBoard();
    display_board(player_board.board, ".player-board")
    display_board(cpu_board.board, ".cpu-board")
    display_ships(player_board.board, ".player-board")
    const cpu_board_container = document.querySelector(".cpu-board")
    const player_board_container = document.querySelector(".player-board")
    cpu_board_container.classList.add("active")
    cpu_board_container.classList.remove("inactive")
    player_board_container.classList.remove("active")
    player_board_container.classList.add("inactive")

    cpu_board_container.querySelectorAll(".cell").forEach((cell) =>
    {
        cell.addEventListener("click", () => {
            if (!player_turn)
                return;
            play_turn(cell, cpu_board)
            if (cpu_board.gameDone())
            {
                display_end_page(playerMessages.win[Math.floor(Math.random() * playerMessages.win.length)])
                return;
            }
            player_turn = false;
            cpu_board_container.classList.add("waiting");
            setTimeout(() => {
                cpu_board_container.classList.add("active")
                cpu_board_container.classList.remove("inactive")
                player_board_container.classList.remove("active")
                player_board_container.classList.add("inactive")
            }, 1500)
                cpu_board_container.classList.remove("active")
                cpu_board_container.classList.add("inactive")
                player_board_container.classList.add("active")
                player_board_container.classList.remove("inactive")
            setTimeout(() => {
                
                const coor = game.play_cpu_turn();
                color_cpu_choice(coor, player_board);
                if (player_board.gameDone())
                    display_end_page(playerMessages.lose[Math.floor(Math.random() * playerMessages.lose.length)])
                player_turn = true;
                cpu_board_container.classList.remove("waiting");
            }, 1500);
        }, { once: true })
    })
}


function initialize_arr()
{
    const arr = [
        {
            img : get_ship_image(5),
            id : "destroyer",
            ship: Ship(5)
        },
        {
            img : get_ship_image(4),
            id : "carrier",
            ship: Ship(4)
        },
        {
            img : get_ship_image(3),
            id : "submarine1",
            ship: Ship(3)
        },
        {
            img : get_ship_image(3),
            id : "submarine2",
            ship: Ship(3)
        },
        {
            img : get_ship_image(2),
            id : "battleship",
            ship: Ship(2)
        }]
    return  arr;
}

function display_ships_choice(curr_ships)
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


function battleship_choice_page(name)
{
    const player = Player(name, "player");
    let ver = false;
    let curr_ships = initialize_arr();

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
                    display_ships_choice(curr_ships)
                    paint_board(player.getBoard().board)
                    display_ships(player.getBoard().board, '.board')
                    if (!curr_ships.length)
                    {
                        const btn = document.querySelector(".start-btn");
                        btn.disabled = false;
                        btn.addEventListener("click", () => {
                            if (!curr_ships.length)
                                start_game(player);
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

    display_ships_choice(curr_ships);
    display_board(player.getBoard().board, ".board");
    add_cells_events();
    display_ships(player.getBoard().board, ".board");

    document.querySelector('.reset-btn').addEventListener("click", () => {
        curr_ships = initialize_arr();
        player.clear();
        display_ships_choice(curr_ships);
        display_board(player.getBoard().board, ".board");
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
}