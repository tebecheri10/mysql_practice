import { UserApi } from "../api/userApi.js";
import { User } from "../classes/user.js";

export const createUser = async (event) => {
  event.preventDefault();

  const userApi = new UserApi();

  // get the user input
  const username = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // create a new user
  const user = new User(username, email, password);

  try {
    // Create a user
    await userApi.createUser(user);

    // Get the list of users again and update the view
    document.querySelector(".create-user-form").reset();
    mapUsersInList();

  } catch (error) {
    console.log("There was an error creating a new user: ", error);
    throw new Error(error);
  }
};

export const deleteUser = async (event) => {
  event.preventDefault();

  const userApi = new UserApi();

  // get the user id
  const id = event.target.parentNode.id;

  try {
    // Delete a user
    await userApi.deleteUser(id);

    //update the view
    mapUsersInList();
  } catch (error) {
    console.log("There was an error deleting the user: ", error);
    throw new Error(error);
  }
};

export const mapUsersInList = () => {
  const userApi = new UserApi();
  const userListContainer = document.querySelector(".users-list");

  try {
    userApi.getUsers().then((users) => {
      let usersListHTML = "";

      users.forEach((user) => {
        usersListHTML += `<li class="user-box" id=${user.id}><button class="delete-user">X</button><p>username: ${user.name}</p><p>Email: ${user.email}</p></li>`;
      });

      userListContainer.innerHTML = usersListHTML;

      // add event listener to the delete button
      const deleteButtons = document.querySelectorAll(".delete-user");
     
      deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteUser);
      });
    });
  } catch (error) {
    console.log("Error Maping users in the list: ", error);
    throw new Error(error);
  }
};
