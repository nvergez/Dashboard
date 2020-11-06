const hashPassword = require("../src/helpers/hashPassword");

test('Hashing my password', () => {
    expect(hashPassword("password")).not.toBe("password");
})