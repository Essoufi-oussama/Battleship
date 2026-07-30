import { Ship } from "./Ship.js";

export function Gameboard()
{
    const board = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({
            ship: null,
            hit: false
        }))
    );
    let Ships = []

    function place_ship(ship, coordinate)
    {
        const ver = coordinate.vertical;
        const x = coordinate.x
        const y = coordinate.y
        const ship_len = ship.getLength();

        
        if (x + (ver ? ship_len : 0) <= board.length && y + (ver ? 0 : ship_len) <= board[x].length)
        {
            if (ver)
            {
                for (let i = x; i < x + ship_len; i++)
                {
                    if (board[i][y].ship != null)
                        return false
                    
                }
                for (let i = x; i < x + ship_len; i++)
                    board[i][y].ship = ship;
            }
            else
            {
                for (let i = y; i <  y + ship_len; i++)
                {
                    if (board[x][i].ship != null)
                        return false
                }
                for (let i = y; i < y + ship_len; i++)
                    board[x][i].ship = ship
            }
            Ships.push(ship);
            return true;
        }
        return false;
    }

    function receiveAttack(coordinate)
    {
        if (!valide_coordinate(coordinate))
            return false;
        const  x = coordinate.x;
        const y = coordinate.y;
        
        if (board[x][y].hit)
            return false;

        board[x][y].hit = true;

        if (board[x][y].ship)
            board[x][y].ship.hit();

        return true;
    }

    function gameDone()
    {
        return Ships.every(ship => ship.isSunk())
    }

    function clear()
    {
        board.forEach(row => {
            row.forEach(cell => {
                cell.ship = null;
                cell.hit = false;
            });
        });
        Ships = []
    }

    function valide_coordinate(coordinate)
    {
        if (!coordinate)
            return false;
        if (!Number.isInteger(coordinate.x) || ! Number.isInteger(coordinate.y))
            return false;
        if (coordinate.x < 0 || coordinate.x > board.length || coordinate.y < 0 || coordinate.y > board[0].length)
            return false;
        return true;
    }
    function containShip(coordinate)
    {
        if (!valide_coordinate(coordinate))
            return false;
        return board[coordinate.x][coordinate.y].ship !== null;
    }

    return {board, containShip, clear, place_ship, receiveAttack, gameDone}
}
