import { Ship } from "./Ship.js";

function Gameboard()
{
    const board = Array.from({length: 10}, () => Array(10).fill(null))
    const Ships = []

    function place_ship(ship, coordinate)
    {
        const hor = coordinate.horizontal;
        const x = coordinate.x
        const y = coordinate.y
        const ship_len = ship.getLength()
        if (x + (hor ? ship_len : 0) <= board.length && y + (hor ? 0 : ship_len) <= board[x].length)
        {
            if (hor)
            {
                for (const i = x; i < ship_len; i++)
                {
                    if (board[i][y] != null)
                        return false
                }
            }
            else
            {
                for (const i = y; i < ship_len; i++)
                {
                    if (board[x][i] != null)
                        return false
                }
            }
        }
        return false;
    }

}

Gameboard()
// module.exports = Gameboard