const utils = require('../../src/utils');

test('should throw exception (name is empty) if provided with an empty string',() => {
    expect(() => {
        utils.getShortName('');
    }).toThrow('name is empty');
})

test('should return a single uppercase letter of a given word',() => {
    expect(utils.getShortName('name')).toBe('N');
})

test('should return the first letters of the first and last words of a given string', () => {
    expect(utils.getShortName('this is a test string with multiple words')).toBe('TW');
})