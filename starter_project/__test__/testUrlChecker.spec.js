import { isValidURL } from '../src/client/js/urlChecker';

describe("Testing the URL validation function", () => {
    test("isValidURL should be defined", () => {
        expect(isValidURL).toBeDefined();
    });

    test("isValidURL should return true for a valid URL", () => {
        expect(isValidURL("https://www.google.com")).toBe(true);
    });

    test("isValidURL should return false for an invalid URL", () => {
        expect(isValidURL("invalid-url")).toBe(false);
    });
});
