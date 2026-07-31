import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

export function Player(_name, _type)
{
    const name = _name;
    const type = _type;
    const gameboard =  Gameboard();
    let ships = [];
    function getBoard()
    {
        return gameboard
    }

    function insertShip(ship, coordinate)
    {
        if (gameboard.place_ship(ship, coordinate))
        {
            ship.origin = coordinate;
            ships.push(ship);
            return true;
        }
        return false;
    }

    function containShip(coordinate)
    {
        return gameboard.containShip(coordinate);
    }
    
    function checkSunkShip(coordinate)
    {
        return gameboard.shipStatus();
    }
    
    function clear()
    {
        ships = []
        gameboard.clear()
    }


    return {clear, getBoard, insertShip}
}