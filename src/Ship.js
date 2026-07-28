export function Ship(length)
{
    if (!Number.isInteger(length) || length <= 0 || length > 5)
        throw Error("Ship length must be a positive integer between 0 and 5")
    let ship_length = length
    let n_hits = 0;
    let sunk = false;
    let is_placed = false;
    let horizontal = false;

    function hit()
    {
        if (n_hits < ship_length)
            n_hits++;
        sunk = (n_hits === ship_length)
            
    }
    function isSunk()
    {
        return sunk === true;
    }

    function getLength()
    {
        return ship_length;
    }

    return {hit, isSunk, getLength, is_placed, horizontal};
}
