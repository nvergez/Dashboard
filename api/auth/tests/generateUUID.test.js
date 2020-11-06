const generateUUID = require("../src/helpers/generateUUID");

test('generate two differents UUID', () => {
    expect(generateUUID()).not.toBe(generateUUID);
})