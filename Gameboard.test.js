
import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

describe('Place ship',() => {
    test('ship placement 1', () =>{
        const gameboard1 = Gameboard()
        const ship1 = Ship(3)
        expect(gameboard1.place_ship(ship1, {x: 4, y: 5, horizontal: 1})).toBe(true)
    })
    test('ship placement 2', () =>{
        const gameboard1 = Gameboard()
        const ship1 = Ship(2)
        expect(gameboard1.place_ship(ship1, {x: 8, y: 5, horizontal: 1})).toBe(true)
    })
    test('ship placement 3', () =>{
        const gameboard1 = Gameboard()
        const ship1 = Ship(2)
        expect(gameboard1.place_ship(ship1, {x: 4, y: 8, horizontal: 0})).toBe(true)
    })
    test('ship placement 4', () =>
    {
        const gameboard1 = Gameboard()
        const ship1 = Ship(2)
        const ship2 = Ship(3)
        gameboard1.place_ship(ship1, {x: 4, y: 8, horizontal: 0})
        expect(gameboard1.place_ship(ship2, {x: 4, y: 7, horizontal: 0})).toBe(false)
    })
    test('ship placement 5', () =>{
        const gameboard1 = Gameboard()
        const ship1 = Ship(2)
        expect(gameboard1.place_ship(ship1, {x: 4, y: 9, horizontal: 0})).toBe(false)
    })
})

describe('receive attacks test', () =>
{
    test("attack test 1", () =>
    {
        const gameboard1 = Gameboard();
        const ship1 = Ship(3)
        gameboard1.place_ship(ship1, {x: 4, y: 5, horizontal: 1})
        expect(gameboard1.receiveAttack({x: 4, y: 5})).toBe(true); 
        expect(gameboard1.receiveAttack({x: 5, y: 5})).toBe(true); 
        expect(gameboard1.receiveAttack({x: 6, y: 5})).toBe(true); 
        expect(ship1.isSunk()).toBe(true)  
    })
    test("attack test 2", () =>
    {
        const gameboard1 = Gameboard();
        const ship1 = Ship(3)
        gameboard1.place_ship(ship1, {x: 4, y: 5, horizontal: 1})
        expect(gameboard1.receiveAttack({x: 4, y: 5})).toBe(true); 
        expect(gameboard1.receiveAttack({x: 4, y: 6})).toBe(true); 
        expect(ship1.isSunk()).toBe(false)  
    })
    test("attack test 3", () =>
    {
        const gameboard1 = Gameboard();
        expect(gameboard1.receiveAttack({x: 10, y: 10})).toBe(false);  
    })
})

describe('game Done  tests', () =>
{
    test("game done first test", () =>
    {
        const gameboard1 = Gameboard()
        const  ship1 = Ship(3);
        gameboard1.place_ship(ship1, {x: 4,  y: 5,  horizontal: 1})
        gameboard1.receiveAttack({x: 4, y: 5})
        gameboard1.receiveAttack({x: 5, y: 5}); 
        gameboard1.receiveAttack({x: 6, y: 5});
        expect(gameboard1.gameDone()).toBe(true)
    })
    test("game done second test", () =>
    {
        const gameboard1 = Gameboard()
        const  ship1 = Ship(3);
        gameboard1.place_ship(ship1, {x: 4,  y: 5,  horizontal: 1})
        gameboard1.receiveAttack({x: 4, y: 5})
        gameboard1.receiveAttack({x: 5, y: 5}); 
        expect(gameboard1.gameDone()).toBe(false)
    })
})