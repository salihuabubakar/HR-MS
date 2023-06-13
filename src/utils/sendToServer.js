import axios from "axios";
import { BaseUrl } from "./baseUrl";

// Add - Update - Delete Employee state
export const add_update_delete_employee = async (state, { type, payload }) => {
  const { id, formData } = payload;
  console.log(id);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/create/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/create/${id}/`, formData
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/employee/create/${id}/`
        );

        // Check the response status
        if (response.status === 200) {
          return;
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


// Add - Update - Delete Role state
export const add_update_delete_role = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/roles/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/roles/${payload.id}/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        // Check the response status
        if (response.status === 200) {
          const updatedUser = response.data;
          const updatedState = state.map((role) =>
            role.id === updatedUser.id ? updatedUser : role
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
          `${BaseUrl}/employee/roles/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          // Filter out the deleted user from state
          const updatedState = state.filter((role) => role.id !== payload.id);
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


// Add - Update - Delete Department state
export const add_update_delete_department = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/departments/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/departments/${payload.id}/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        // Check the response status
        if (response.status === 200) {
          const updatedUser = response.data;
          const updatedState = state.map((dept) =>
            dept.id === updatedUser.id ? updatedUser : dept
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
          `${BaseUrl}/employee/departments/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          // Filter out the deleted user from state
          const updatedState = state.filter((dept) => dept.id !== payload.id);
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


// Add - Update - Delete House state
export const add_update_delete_house = async (state, { type, payload }) => {
 const { id, formData } = payload;
 console.log(id);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/houses/`, payload);

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/houses/${id}/`, formData
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/house/houses/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
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


// Add - Update - Delete Room state
export const add_update_delete_room = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/rooms/`, payload);

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/rooms/${payload.id}/`, payload
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/house/rooms/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
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

// Add - Update - Delete House Employee state
export const add_update_delete_house_employee = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/employees/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/employees/${payload.id}/`, payload
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/house/employees/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
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

// Add - Update - Delete House Resident state
export const add_update_delete_house_resident = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/residents/`, payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/residents/${payload.id}/`,
          payload
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/house/residents/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
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


// Add - Update - Delete House Image state
export const add_update_delete_house_image = async (state, { type, payload }) => {
  const { id, formData } = payload;
  console.log(id);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/images/`, payload);

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/images/${id}/`,
          formData
        );

        // Check the response status
        if (response.status === 200) {
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/images/${id}/`);

        // Check the response status
        if (response.status === 200) {
          return;
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

// Add - Update - Delete House Document state
export const add_update_delete_house_document = async (state, { type, payload }) => {
  const { id, formData } = payload;
  console.log(id);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/documents/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/documents/${id}/`,
          formData
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/house/documents/${id}/`
        );

        // Check the response status
        if (response.status === 200) {
          return;
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

// Add - Update - Delete House Bill state
export const add_update_delete_bill = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/bills/`, payload);

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/bills/${payload.id}/`,
          payload
        );

        // Check the response status
        if (response.status === 200) {
          return;
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
          `${BaseUrl}/house/bills/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
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