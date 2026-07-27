const ship = require('./Ship.js');
const gameboard = require('./Gameboard.js');
const { expect } = require('@jest/globals');

describe('Place ship',() => {
    test('valid_ship_placement', () =>{
        const gameboard1 = gameboard()
        const ship1 = ship(3)
        expect(gameboard1.place_ship(ship1, {x: 4, y: 5, horizontal: 1})).toBe(true)
    })
})