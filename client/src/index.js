import { User } from "./classes/user.js";
import { mapUsersInList , createUser} from "./utils/userUtils.js";

const bindingEvents = () => {
  const button = document.querySelector(".submit-crear-usuario");
  button.addEventListener("click", createUser);
}

// init
window.addEventListener("load", () => {
  //first render of the users list
  mapUsersInList();
  bindingEvents();
});
