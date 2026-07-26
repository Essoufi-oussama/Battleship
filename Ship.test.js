const { expect } = require('@jest/globals');
const ship = require('./Ship.js');



describe('Ship construction', () =>
{
    test("invalid construction with string", () => {
        expect(() => ship("hello")).toThrow();
    })
    test("invalid construction with negative number", () =>
    {
        expect(() => ship(-1)).toThrow();
    })
    test("invalid construction with big number", () =>
    {
        expect(() => ship(5)).toThrow();
    })
    test("invalid construction with negative number", () =>
    {
        expect(() => ship(-1)).toThrow();
    })
    test("invalid construction with 0 length", () =>
    {
        expect(() => ship(0)).toThrow();
    })
})

describe('Hit tests', () =>
{
    test("1 hit test", () =>
    {
        const ship1 = ship(2)
        ship1.hit()
        expect(ship1.isSunk()).toBe(false)
    })
    test("2 hit test", () =>
    {
        const ship1 = ship(2)
        ship1.hit()
        ship1.hit()
        expect(ship1.isSunk()).toBe(true)
    })
    test("3 hit test", () =>
    {
        const ship1 = ship(2)
        ship1.hit()
        ship1.hit()
        ship1.hit()
        expect(ship1.isSunk()).toBe(true)
    })
})

