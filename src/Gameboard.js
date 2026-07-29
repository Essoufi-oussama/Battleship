import { Ship } from "./Ship.js";

export function Gameboard()
{
    const board = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({
            ship: null,
            hit: false
        }))
    );
    const Ships = []

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
        if (coordinate.x >=  board.length || coordinate.y >= board.length)
            return false;
        const  x = coordinate.x;
        const y = coordinate.y;
        if (board[x][y].ship === null)
        {
            if (board[x][y].hit)
                return false; 
            else
                board[x][y].hit = true
        }
        else
        {
            if (board[x][y].hit)
                return false
            board[x][y].ship.hit();
            board[x][y].hit = true;
        }
        return true;
    }

    function gameDone()
    {
        return Ships.every(ship => ship.isSunk())
    }

    return {board, place_ship, receiveAttack, gameDone}
}
