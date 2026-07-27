import { expect } from  '@jest/globals';
import { Ship as ship } from "./Ship.js";



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
        expect(() => ship(6)).toThrow();
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

describe('length tests', () =>
{   
    test("valid length",() =>
    {
    const ship1 = ship(2);
    expect(ship1.getLength()).toBe(2)
    })
    test("length 3",() =>
    {
    const ship1 = ship(3);
    expect(ship1.getLength()).toBe(3)
    })
})

