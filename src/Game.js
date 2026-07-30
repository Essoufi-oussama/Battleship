import {Player} from "./Player.js"
import { Ship } from "./Ship.js"

function initialize_cpu()
{
    const cpu = Player('cpu', 'cpu')
    const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    ships.forEach(ship => {
        let placed = false;
        while(!placed)
        {
            const coordinate = {
                x: Math.floor(Math.random() * 10),
                y: Math.floor(Math.random() * 10),
                vertical: Math.random() < 0.5
            };
            ship.vertical = coordinate.vertical;
            placed = cpu.insertShip(ship, coordinate)
        }
    })
    return cpu;
}


function initialize_board()
{
    const coordinates = [];
    for (let x = 0; x < 10; x++) 
    {
        for (let y = 0; y < 10; y++) 
        {
            coordinates.push({ x, y });
        }
    }
    return coordinates;
}


export function Game(player1)
{
    const Players = [player1, initialize_cpu()]
    let latest_cord = null;
    const cords = initialize_board();

    function getPlayerBoard()
    {
        return Players[0].getBoard()
    }

    function getCpuBoard()
    {
        return Players[1].getBoard();
    }

    function play_cpu_turn()
    {
        const player1 = getPlayerBoard()
        let index = -1;
        if (latest_cord !== null)
        {
            const {x, y} = latest_cord;
            const neighbors = [
                {x: x - 1, y: y},
                {x: x + 1, y: y},
                {x: x, y: y - 1},
                {x: x, y: y + 1}
            ]
            for (const neighbor of neighbors)
            {
                index = cords.findIndex(
                    c => c.x === neighbor.x && c.y === neighbor.y
                );
                if (index !== -1)
                    break;
            }
            if (index === -1)
                latest_cord = null;
        }
        if (latest_cord === null)
            index = Math.floor(Math.random() * cords.length)
           
        const coor = cords[index]
        player1.receiveAttack(coor)
        latest_cord = coor;
        cords.splice(index, 1);
        return coor;
    }

    return {getPlayerBoard, getCpuBoard, play_cpu_turn};
}