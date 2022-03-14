const Manager = require('../lib/Manager.js');

test('creates a manager object', () => {
    const manager = new Manager('Lenovo Lenny', '1237', 'lenovolenny@test.com', '456');

    expect(manager.getName()).toBe('Lenovo Lenny');
    expect(manager.getId()).toBe('1237');
    expect(manager.getEmail()).toBe('lenovolenny@test.com');
    expect(manager.getRole()).toBe('Manager');
    expect(manager.officeNumber).toBe('456');
})