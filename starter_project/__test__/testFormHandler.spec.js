import { handleSubmit } from "../src/client/js/formHandler";

beforeEach(() => {
    // Set up the DOM structure in Jest before each test
    document.body.innerHTML = `
        <form id="urlForm">
            <input type="text" id="urlInput" value="https://example.com" />
            <button type="submit">Submit</button>
        </form>
        <div id="results"></div>
    `;
});

describe("Testing Event Listener", () => {
    test("should call addEventListener on the form", () => {
        // Create a spy for the addEventListener method
        const addEventListenerSpy = jest.spyOn(
            HTMLFormElement.prototype,
            "addEventListener"
        );

        // Trigger form submission
        const form = document.getElementById("urlForm");
        form.dispatchEvent(new Event("submit"));

        // Check if addEventListener was called with the 'submit' event
        expect(addEventListenerSpy).toHaveBeenCalledWith("submit", expect.any(Function));

        // Clean up the spy after the test
        addEventListenerSpy.mockRestore();
    });

    test("handleSubmit should be called when the form is submitted", () => {
        // Spy on handleSubmit function
        const handleSubmitSpy = jest.fn(handleSubmit);

        // Attach the spy to the form
        const form = document.getElementById("urlForm");
        form.addEventListener("submit", handleSubmitSpy);

        // Create a mock event
        const mockEvent = { preventDefault: jest.fn() };

        // Trigger form submission
        form.dispatchEvent(new Event("submit", mockEvent));

        // Check if handleSubmit was called
        expect(handleSubmitSpy).toHaveBeenCalled();

        // Check if preventDefault was called (to prevent actual form submission)
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
});
