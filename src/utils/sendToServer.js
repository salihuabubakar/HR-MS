import axios from "axios";

export const add_update_delete_employee = async (state, { type, payload }) => {
  console.log("payload...outside", payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          "https://www.jakago.com.ng/employee/list/",
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          // Update state or perform any other necessary actions based on the response
          return [...state, responseData];
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.patch(
          `https://www.jakago.com.ng/employee/detail/${payload.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          }
        );

        // Check the response status
        if (response.status === 200) {
          const updatedUser = response.data;
          const updatedState = state.map((employee) =>
            employee.id === updatedUser.id ? updatedUser : employee
          );
          // Update state or perform any other necessary actions based on the response
          return updatedState;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `https://www.jakago.com.ng/employee/detail/${payload.id}`
        );

        // Check the response status
        if (response.status === 200) {
          // Filter out the deleted user from state
          const updatedState = state.filter((employee) => employee.id !== payload.id);
          // Update state or perform any other necessary actions based on the response
          return updatedState;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};
