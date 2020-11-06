const accessEnv = require("../src/helpers/accessEnv");

test('Test de defaultValue', () => {
    expect(accessEnv.accessEnv("DANIOWDE", 42)).toBe(42);
})

test('Basic environment variable', () => {
    process.env["BASIC_ENV_VAR"] = 42;
    
    expect(accessEnv.accessEnv("BASIC_ENV_VAR", 1)).toBe("42");
})

test('No environment variable and no default', done => {
    try {
        expect(accessEnv.accessEnv("DANIOWDE", null)).toBe(null);
    } catch (e) {
        done();
    }
})

test('Use of cache', () => {
    process.env["BASIC_ENV_VAR"] = 42;
    accessEnv.accessEnv("BASIC_ENV_VAR", 1);
    expect(accessEnv.accessEnv("BASIC_ENV_VAR", 1)).toBe("42");
})