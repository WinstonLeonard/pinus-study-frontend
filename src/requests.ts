import { USER_URL } from "./constants";
import { updateUser } from "./redux/features/users/userSlice";

export const getUserDetailsRequest = (userId: number, reduxDispatcher: any) => {
  console.log("here");
  fetch(`${USER_URL}/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "failure") {
        return;
      }
      reduxDispatcher(updateUser(data));
    });
};
