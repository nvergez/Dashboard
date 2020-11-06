const pCompare = require("../src/helpers/passwordCompareSync");
const hashPassword = require("../src/helpers/hashPassword");


test('Compare identics passwords', () => {
    hashed = hashPassword("password");

    expect(pCompare("password", hashed)).toBe(true);
})

test('Compare differents passwords', () => {
    hashed = hashPassword("passwor");

    expect(pCompare("password", hashed)).toBe(false);
})