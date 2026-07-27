import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

export function Player(_name, _type)
{
    const name = _name;
    const type = _type;
    const gameboard =  Gameboard();
    const ships = [Ship(2),  Ship(3), Ship(3),  Ship(4), Ship(5)];
    function getBoard()
    {
        return gameboard
    }
    function getShips()
    {
        return ships;
    }
    return {getBoard, getShips}
}