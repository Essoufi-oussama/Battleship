import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

export function Player(_name, _type)
{
    const name = _name;
    const type = _type;
    const gameboard =  Gameboard();
    const ships = [];
    function getBoard()
    {
        return gameboard
    }
    function getShips()
    {
        return ships;
    }
    function insertShip(ship, coordinate)
    {
        if (gameboard.place_ship(ship, coordinate))
        {
            console.log("Ship placed successfully");
            ships.push(ship)
            return true;
        }
        return false;
    }
    return {getBoard, getShips, insertShip}
}