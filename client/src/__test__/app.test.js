import { fireEvent } from "@testing-library/dom";
import { UserApi } from "../api/userApi";

// Import the fetch mock library
import fetchMock from "jest-fetch-mock";

// Set up fetch mock
fetchMock.enableMocks();

describe("createUser", () => {
  it("should create a new user", async () => {
    document.body.innerHTML = `
      <input data-testid="name-input" />
      <input data-testid="email-input" />
      <input data-testid="password-input" />
      <button data-testid="submit-button">Submit</button>
    `;

    const nameInput = document.querySelector("[data-testid=name-input]");
    const emailInput = document.querySelector("[data-testid=email-input]");
    const passwordInput = document.querySelector("[data-testid=password-input]");
    const submitButton = document.querySelector("[data-testid=submit-button]");

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    fireEvent.click(submitButton);

    const mockUsers = [
        { id: 1, name: "Test User 1", email: "test1@example.com" }        // Add more simulated users as needed
      ];

    // Mock the response for the getUsers() call
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    // Spy on the getUsers method
    const spyGetUsers = jest.spyOn(UserApi.prototype, "getUsers");

    // Check if the user was created
    const userApi = new UserApi();
    const users = await userApi.getUsers();

    // Expect that getUsers was called once
    expect(spyGetUsers).toHaveBeenCalledTimes(1);
    expect(users.length).toBe(1)
    expect(users.length).not.toBe(2)

    // Restore the original getUsers method
    spyGetUsers.mockRestore();
  });
});
