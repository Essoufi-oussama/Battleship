function Ship(length)
{
    if (!Number.isInteger(length) || length <= 0 || length > 4)
        throw Error("Ship length must be a positive integer less than 5")
    let ship_length = length
    let n_hits = 0;
    let sunk = false;

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
    return {hit, isSunk};
}

module.exports = Ship