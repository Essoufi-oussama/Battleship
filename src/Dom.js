import { Game } from "./Game.js";

function battleship_choice_page(name)
{
    const game = Game(name);
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
                    <p>${name} roster </p>
                    <div></div>
                </div>
            </div>
        
    `
    const  board  = document.querySelector('.board');
    for (let y = 0; y < 10; y++) 
    {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            board.appendChild(cell);
        }
    }
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
    // display_main_page()
    battleship_choice_page('fff')
    
    
}