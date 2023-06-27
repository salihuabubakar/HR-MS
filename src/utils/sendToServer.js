import axios from "axios";
import { BaseUrl } from "./baseUrl";
import { toast } from "react-toastify";
import { setGlobalState } from "../context/GlobalState";

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
        setGlobalState(
          "employeeError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "employeeError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "employeeError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "roleError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "roleError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "roleError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "departmentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "departmentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "departmentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "isHouseError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "isHouseError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "isHouseError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "roomError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "roomError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "roomError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseEmployeeError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseEmployeeError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseEmployeeError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseResidentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseResidentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseResidentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseImageError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseImageError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseImageError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseDocumentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseDocumentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseDocumentError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseBillError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseBillError",
          JSON.stringify(error.response.data)
        );
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
        setGlobalState(
          "houseBillError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Maintenance state
export const add_update_delete_maintenance = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/maintenances/`,
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
        setGlobalState(
          "maintenanceError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/maintenances/${payload.id}/`,
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
        setGlobalState(
          "maintenanceError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/house/maintenances/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "maintenanceError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};


// Add - Update - Delete House Organisation state
export const add_update_delete_organisation = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/organisations/`,
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
        setGlobalState(
          "organisationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/organisations/${payload.id}/`,
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
        setGlobalState(
          "organisationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/organisations/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "organisationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete  Status state
export const add_update_delete_status = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/status/`,
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
        setGlobalState(
          "statusError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/status/${payload.id}/`,
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
        setGlobalState(
          "statusError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/status/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "statusError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Address  state
export const add_update_delete_employee_address = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/addresses/`,
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
        setGlobalState(
          "employeeAddressError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/addresses/${payload.id}/`,
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
        setGlobalState(
          "employeeAddressError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/addresses/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeAddressError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Emergency state
export const add_update_delete_employee_emergency = async (state, { type, payload }) => {
  // const { id, formData } = payload;
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/emergency/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState(
          "employeeEmergencyError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/emergency/${payload.id}/`,
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
        setGlobalState(
          "employeeEmergencyError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/emergency/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeEmergencyError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Qualification state
export const add_update_delete_employee_qualification = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/qualifications/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState(
          "employeeQualificationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/qualifications/${id}/`,
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
        setGlobalState(
          "employeeQualificationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/qualifications/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeQualificationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Experience state
export const add_update_delete_employee_experience = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/workexperience/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState(
          "employeeExperiencError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/workexperience/${id}/`,
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
        setGlobalState(
          "employeeExperiencError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/workexperience/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeExperiencError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Documents state
export const add_update_delete_employee_document = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/employee/documents/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState(
          "employeeDocumentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/documents/${id}/`,
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
        setGlobalState(
          "employeeDocumentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/documents/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeDocumentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Bank state
export const add_update_delete_employee_bank = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/bank/`, payload);

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState(
          "employeeBankError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/bank/${id}/`,
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
        setGlobalState(
          "employeeBankError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/bank/${id}/`);

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeBankError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Review state
export const add_update_delete_employee_review = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/reviews/`, payload);

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState(
          "employeeReviewError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/employee/reviews/${id}/`,
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
        setGlobalState(
          "employeeReviewError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/employee/reviews/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "employeeReviewError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Notice state
export const add_update_delete_notice = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/notices/`,
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
        setGlobalState(
          "houseNoticeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/notices/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "houseNoticeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/house/notices/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "houseNoticeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Item state
export const add_update_delete_item = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/items/`,
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
        setGlobalState(
          "houseItemError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/items/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "houseItemError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/house/items/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "houseItemError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Inspection state
export const add_update_delete_inspection = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/house/inspections/`,
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
        setGlobalState(
          "houseInspectionError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/house/inspections/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "houseInspectionError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/house/inspections/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "houseInspectionError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident  state
export const add_update_delete_resident = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/residents/`,
          payload
        );

        // Check the response status
        if (response.status === 201) {
          const responseData = response.data;
          if (Array.isArray(payload)) {
            return [...state, ...responseData];
          } else {
            // setGlobalState("collectServerResponseTextError", response);
            return [responseData];
          }
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("isResidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/residents/${id}/`,
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
        setGlobalState("isResidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/residents/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("isResidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident GP state
export const add_update_delete_resident_gp = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/residentgp/`,
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
        setGlobalState("gpError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/residentgp/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("gpError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/residentgp/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("gpError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Solicitor state
export const add_update_delete_resident_solicitor = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/solicitor/`,
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
        setGlobalState("solicitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/solicitor/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("solicitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/solicitor/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("solicitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

export const add_update_delete_resident_document = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  console.log(id);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/document/`,
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
        setGlobalState(
          "residentdocumentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/document/${id}/`,
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
        setGlobalState(
          "residentdocumentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/document/${id}/`
        );

        // Check the response status
        if (response.status === 200) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "residentdocumentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident school state
export const add_update_delete_resident_school = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/school/`,
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
        setGlobalState("schoolError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/school/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("schoolError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/school/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("schoolError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Education state
export const add_update_delete_resident_education = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/education/`,
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
        setGlobalState("educationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/education/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("educationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/education/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("educationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident School Report state
export const add_update_delete_resident_school_report = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/report/`,
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
        setGlobalState("schoolReportError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/report/${id}/`,
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
        setGlobalState(
          "schoolReportError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/report/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "schoolReportError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident School Timetable state
export const add_update_delete_resident_school_timetable = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/timetable/`,
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
        setGlobalState(
          "schoolTimetableError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/timetable/${id}/`,
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
        setGlobalState(
          "schoolTimetableError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/timetable/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "schoolTimetableError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Medical Condition state
export const add_update_delete_resident_medical_condition = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/medicalcondition/`,
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
        setGlobalState(
          "medicalConditionError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/medicalcondition/${id}/`,
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
        setGlobalState(
          "medicalConditionError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/medicalcondition/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "medicalConditionError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Medication state
export const add_update_delete_resident_medication = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/medication/`,
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
        setGlobalState(
          "medicationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/medication/${id}/`,
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
        setGlobalState(
          "medicationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/medication/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "medicationError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};


// Add - Update - Delete Resident Appointment state
export const add_update_delete_resident_appointment = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/appointment/`,
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
        setGlobalState("appointmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/appointment/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("appointmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/appointment/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("appointmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Social Worker state
export const add_update_delete_resident_social_worker = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/rsocialworker/`,
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
        setGlobalState("rSocialWorkerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/rsocialworker/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "rSocialWorkerError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/rsocialworker/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "rSocialWorkerError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Referral state
export const add_update_delete_resident_referral = async (
  state,
  { type, payload }
) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/referral/`,
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
        setGlobalState(
          "referralError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/referral/${id}/`,
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
        setGlobalState(
          "referralError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/referral/${id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "referralError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Borough state
export const add_update_delete_borough = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/borough/`,
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
        setGlobalState("boroughError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/borough/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("boroughError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/borough/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("boroughError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Social worker state
export const add_update_delete_social_worker = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/socialworker/`,
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
        setGlobalState(
          "socialWorkerError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/socialworker/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "socialWorkerError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/socialworker/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "socialWorkerError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Visitor state
export const add_update_delete_resident_visitor = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/visitor/`,
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
        setGlobalState(
          "residentVisitorError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/visitor/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "residentVisitorError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/visitor/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "residentVisitorError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Complaint state
export const add_update_delete_complaint = async (
  state,
  { type, payload }
) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/complaint/`,
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
        setGlobalState(
          "complaintError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/complaint/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState(
          "complaintError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/complaint/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState(
          "complaintError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Request state
export const add_update_delete_resident_request = async (
  state,
  { type, payload }
) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/request/`,
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
        console.error("Error occurred while posting resident request:", error);
        setGlobalState(
          "residentRequestError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting resident request");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/request/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident request:", error);
        setGlobalState(
          "residentRequestError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating resident request");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/request/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident request:", error);
        setGlobalState(
          "residentRequestError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting resident request");
      }
    default:
      throw new Error();
  }
};


// Add - Update - Delete Resident Incident state
export const add_update_delete_resident_incident = async (
  state,
  { type, payload }
) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/incident/`,
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
        console.error("Error occurred while posting resident incident:", error);
        setGlobalState(
          "residentIncidentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting resident incident");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/incident/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident incident:", error);
        setGlobalState(
          "residentIncidentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating resident incident");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/incident/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident incident:", error);
        setGlobalState(
          "residentIncidentError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting resident incident");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Misper state
export const add_update_delete_resident_misper = async (
  state,
  { type, payload }
) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/misper/`,
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
        console.error("Error occurred while posting resident misper:", error);
        setGlobalState(
          "residentMisperError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting resident misper");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/misper/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident misper:", error);
        setGlobalState(
          "residentMisperError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating resident misper");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/misper/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident misper:", error);
        setGlobalState(
          "residentMisperError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting resident misper");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident DocumentType state
export const add_update_delete_resident_document_type = async (
  state,
  { type, payload }
) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/documenttype/`,
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
        console.error(
          "Error occurred while posting resident documenttype:",
          error
        );
        setGlobalState(
          "residentDocumentTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting resident documenttype");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/documenttype/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error(
          "Error occurred while updating resident documenttype:",
          error
        );
        setGlobalState(
          "residentDocumentTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating resident documenttype");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/documenttype/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error(
          "Error occurred while deleting resident documenttype:",
          error
        );
        setGlobalState(
          "residentDocumentTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting resident documenttype");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Gp Type state
export const add_update_delete_resident_gp_type = async (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/gptype/`,
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
        console.error(
          "Error occurred while posting resident documenttype:",
          error
        );
        setGlobalState(
          "residentGpTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting resident documenttype");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/gptype/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error(
          "Error occurred while updating resident documenttype:",
          error
        );
        setGlobalState(
          "residentGpTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating resident documenttype");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/gptype/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error(
          "Error occurred while deleting resident documenttype:",
          error
        );
        setGlobalState(
          "residentGpTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting resident documenttype");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Legal Status Type state
export const add_update_delete_resident_legal_status_type = async (
  state,
  { type, payload }
) => {
  console.log(payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(
          `${BaseUrl}/resident/legalstatus/`,
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
        console.error(
          "Error occurred while posting resident documenttype:",
          error
        );
        setGlobalState(
          "residentLegalStatusTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while posting resident documenttype");
      }

    case "update":
      try {
        const response = await axios.put(
          `${BaseUrl}/resident/legalstatus/${payload.id}/`,
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
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error(
          "Error occurred while updating resident documenttype:",
          error
        );
        setGlobalState(
          "residentLegalStatusTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while updating resident documenttype");
      }

    case "delete":
      try {
        const response = await axios.delete(
          `${BaseUrl}/resident/legalstatus/${payload.id}/`
        );

        // Check the response status
        if (response.status === 204) {
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error(
          "Error occurred while deleting resident documenttype:",
          error
        );
        setGlobalState(
          "residentLegalStatusTypeError",
          JSON.stringify(error.response.data)
        );
        throw new Error("Error occurred while deleting resident documenttype");
      }
    default:
      throw new Error();
  }
};



