import { checkForName } from '../src/client/js/nameChecker';

describe("Testing the name checker function", () => {
    test("checkForName should be defined", () => {
        expect(checkForName).toBeDefined();
    });

    test("checkForName should alert 'Welcome, Captain!' for a valid name", () => {
        global.alert = jest.fn();
        checkForName("Picard");
        expect(global.alert).toHaveBeenCalledWith("Welcome, Captain!");
    });

    test("checkForName should alert 'Enter a valid captain name' for an invalid name", () => {
        global.alert = jest.fn();
        checkForName("Spock");
        expect(global.alert).toHaveBeenCalledWith("Enter a valid captain name");
    });
});
