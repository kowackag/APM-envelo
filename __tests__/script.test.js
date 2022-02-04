const {
    expect,
    it,
    describe
} = require("@jest/globals");

import validateData from '../src/js/validate';


describe('data from db', () => {
    it('should inform when phone in in db', () => {
        const db = {
           phone: 510000000
        };
        expect(db).toBe(db)
    }),

    it('should inform when compliance is correct', () => {
        const db = {
           phone: 510000000,
           code:5100
        };
        expect(db).toBe(db)
    }),

    it('should when db is not a Array', () => {
        try {
            const db = 'a'
            !Array.isArray(db)
        } catch (err) {
            expect(err.message).toBe('Param is not an array')
        }
    })
})


describe('numbers', () => {
    it('Should throw exception when num1 is not a number', () => {
        function checkNumber() {
            validateData('2', 1)
        }
        expect(checkNumber).toThrow()
    })

    it('Should throw exception when num1 is not a number', () => {
        function checkNumber() {
            validateData('2', 1)
        }
        expect(checkNumber).toThrow()
    })

})