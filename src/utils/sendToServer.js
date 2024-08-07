import React from "react";
import axios from "axios";
import { BaseUrl, Base2Url } from "./baseUrl";
import { toast } from "react-toastify";
import { setGlobalState } from "../context/GlobalState";
import { axiosConfig } from "./getUserToken";

/**
 * This JavaScript function handles adding, updating, and deleting employee data using axios and toast
 * notifications.
 * @param state - The current state of the application. It contains information about the employees,
 * such as their names, IDs, and other details.
 * @returns The function does not return anything explicitly.
 */

// Add - Update - Delete Employee state
export const add_update_delete_employee = async (state, { type, payload }) => {
  const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/create/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Employee Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/create/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/create/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Role state
export const add_update_delete_role = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/roles/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Role Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("roleError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/roles/${payload.id}/`, payload, );

        // Check the response status
        if (response.status === 200) {
          toast.success("Role Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("roleError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/roles/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Role Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("roleError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Department state
export const add_update_delete_department = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/departments/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Department Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("departmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/departments/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Department Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("departmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/departments/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Department Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("departmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House state
export const add_update_delete_house = async (state, { type, payload }) => {
  const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/houses/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("isHouseError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/houses/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("isHouseError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/houses/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("isHouseError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Room state
export const add_update_delete_room = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/rooms/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Room Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("roomError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/rooms/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Room Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("roomError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/rooms/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Room Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("roomError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Employee state
export const add_update_delete_house_employee = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/employees/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Employee Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseEmployeeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/employees/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Employee Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseEmployeeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/employees/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Employee Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseEmployeeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Resident state
export const add_update_delete_house_resident = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/residents/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Resident Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseResidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/residents/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Resident Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseResidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/residents/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Resident Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseResidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Image state
export const add_update_delete_house_image = async (state, { type, payload }) => {
  const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/images/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Image Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseImageError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/images/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Image Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseImageError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/images/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Image Deleted", {
            autoClose: 15000,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseImageError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Document state
export const add_update_delete_house_document = async (state, { type, payload }) => {
  const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/documents/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Document Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/documents/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Document Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/documents/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Document Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Bill state
export const add_update_delete_bill = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/bills/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Bill Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseBillError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/bills/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Bill Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseBillError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/bills/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Bill Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseBillError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Maintenance state
export const add_update_delete_maintenance = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/maintenances/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Maintenance Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("maintenanceError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/maintenances/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Maintenance Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("maintenanceError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/maintenances/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Maintenance Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("maintenanceError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete House Organisation state
export const add_update_delete_organisation = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/organisations/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Organisation Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("organisationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/organisations/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Organisation Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("organisationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/organisations/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Organisation Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("organisationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete  Status state
export const add_update_delete_status = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/status/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Status Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("statusError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/status/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Status Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("statusError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/status/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Status Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("statusError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Address  state
export const add_update_delete_employee_address = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/addresses/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Employee Address Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeAddressError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/addresses/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee Address Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeAddressError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/addresses/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee Address Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeAddressError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Emergency state
export const add_update_delete_employee_emergency = async (state, { type, payload }) => {
  // const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/emergency/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Emergency contact Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeEmergencyError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/emergency/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Emergency contact Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeEmergencyError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/emergency/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Emergency contact Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeEmergencyError", JSON.stringify(error.response.data));
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
        const response = await axios.post(`${BaseUrl}/employee/qualifications/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Employee Qualification Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeQualificationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/qualifications/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee Qualification Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeQualificationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/qualifications/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee Qualification Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeQualificationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Experience state
export const add_update_delete_employee_experience = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/workexperience/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Employee Experience Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeExperiencError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/workexperience/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee Experience Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeExperiencError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/workexperience/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee Experience Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeExperiencError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Documents state
export const add_update_delete_employee_document = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/documents/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Employee Document Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/documents/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee Document Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/documents/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee Document Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Employee Document Type state
export const add_update_delete_employee_document_type = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/employee/documenttype/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Employee DocumentType Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeDocumentTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/documenttype/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee DocumentType Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeDocumentTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/documenttype/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee DocumentType Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeDocumentTypeError", JSON.stringify(error.response.data));
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
          toast.success("Employee Bank Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeBankError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/bank/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Employee Bank Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeBankError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/bank/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Employee Bank Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeBankError", JSON.stringify(error.response.data));
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
          toast.success("Review Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("employeeReviewError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/employee/reviews/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Review Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("employeeReviewError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/employee/reviews/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Review Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("employeeReviewError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Notice state
export const add_update_delete_notice = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/notices/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Notice Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseNoticeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/notices/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Notice Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseNoticeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/notices/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Notice Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseNoticeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Item state
export const add_update_delete_item = async (state, { type, payload }) => {
  console.log("type", type);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/items/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Item Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseItemError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/items/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Item Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseItemError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/items/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Item Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseItemError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Inspection state
export const add_update_delete_inspection = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/house/inspections/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("House Inspection Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("houseInspectionError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/house/inspections/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("House Inspection Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("houseInspectionError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/house/inspections/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("House Inspection Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("houseInspectionError", JSON.stringify(error.response.data));
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
        const response = await axios.post(`${BaseUrl}/resident/residents/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Added", {
            autoClose: 7000,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/residents/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Updated", {
            autoClose: 7000,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/residents/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Deleted", {
            autoClose: 1500,
          });
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
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/residentgp/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Gp Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/residentgp/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Gp Updated", {
            autoClose: 1500,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/residentgp/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Gp Deleted", {
            autoClose: 1500,
          });
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

// Add - Update - Delete Solicitor state
export const add_update_delete_solicitor = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/solicitor/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Solicitor Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/solicitor/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Solicitor Updated", {
            autoClose: 1500,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/solicitor/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Solicitor Deleted", {
            autoClose: 1500,
          });
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

// Add - Update - Delete RSolicitor state
export const add_update_delete_rsolicitor = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/rsolicitor/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Solicitor Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("residentSolicitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/rsolicitor/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Solicitor Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("residentSolicitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/rsolicitor/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Solicitor Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("residentSolicitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

export const add_update_delete_resident_document = async (state, { type, payload }) => {
  const { id, formData } = payload;

  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/document/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Document Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("residentdocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/document/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Document Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("residentdocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/document/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast.success("Resident Document Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("residentdocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete school state
export const add_update_delete_school = async (state, { type, payload }) => {
  
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/school/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("School Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/school/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("School Updated", {
            autoClose: 1500,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/school/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("School Deleted", {
            autoClose: 1500,
          });
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

// Add - Update - Delete Resident School state
export const add_update_delete_resident_school = async (state, { type, payload }) => {
  
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/rschool/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident School Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("residentSchoolError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/rschool/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident School Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("residentSchoolError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/rschool/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident School Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("residentSchoolError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Education state
export const add_update_delete_resident_education = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/education/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Education Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/education/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Education Updated", {
            autoClose: 1500,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/education/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Education Deleted", {
            autoClose: 1500,
          });
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
export const add_update_delete_resident_school_report = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/report/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Report Added", {
            autoClose: 7000,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/report/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Report Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("schoolReportError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/report/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Report Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("schoolReportError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident School Timetable state
export const add_update_delete_resident_school_timetable = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/timetable/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Timetable Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("schoolTimetableError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/timetable/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Timetable Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("schoolTimetableError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/timetable/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Timetable Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("schoolTimetableError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Medical Condition state
export const add_update_delete_resident_medical_condition = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/medicalcondition/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Medical Condition Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("medicalConditionError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/medicalcondition/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Medical Condition Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("medicalConditionError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/medicalcondition/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Medical Condition Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("medicalConditionError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Medication state
export const add_update_delete_resident_medication = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/medication/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Medication Added", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("medicationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/medication/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Medication Updated", {
            autoClose: 7000,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("medicationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/medication/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Medication Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("medicationError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Appointment state
export const add_update_delete_resident_appointment = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/appointment/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Appointment Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/appointment/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Appointment Updated", {
            autoClose: 1500,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/appointment/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Appointment Deleted", {
            autoClose: 1500,
          });
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
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/rsocialworker/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Social worker Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/rsocialworker/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Social worker Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("rSocialWorkerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/rsocialworker/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Social worker Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("rSocialWorkerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Referral state
export const add_update_delete_resident_referral = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/referral/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Resident Referral Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("referralError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/referral/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Resident Referral Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("referralError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/referral/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Resident Referral Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("referralError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Borough state
export const add_update_delete_borough = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/borough/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Borough Added", {
            autoClose: 1500,
          });
          return;
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
        const response = await axios.put(`${BaseUrl}/resident/borough/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Borough Updated", {
            autoClose: 1500,
          });
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
        const response = await axios.delete(`${BaseUrl}/resident/borough/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Borough Deleted", {
            autoClose: 1500,
          });
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
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/socialworker/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Social worker Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("socialWorkerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/socialworker/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Social worker Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("socialWorkerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/socialworker/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Social worker Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("socialWorkerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Visitor state
export const add_update_delete_resident_visitor = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/visitor/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Visitor Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("residentVisitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/visitor/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Visitor Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("residentVisitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/visitor/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Visitor Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("residentVisitorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Complaint state
export const add_update_delete_complaint = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/complaint/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Complaint Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("complaintError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/complaint/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Complaint Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("complaintError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/complaint/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Complaint Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("complaintError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Request state
export const add_update_delete_resident_request = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/request/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Request Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting resident request:", error);
        setGlobalState("residentRequestError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting resident request");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/request/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Request Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident request:", error);
        setGlobalState("residentRequestError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating resident request");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/request/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Request Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident request:", error);
        setGlobalState("residentRequestError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting resident request");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Incident state
export const add_update_delete_resident_incident = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/incident/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Incident Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting resident incident:", error);
        setGlobalState("residentIncidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting resident incident");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/incident/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Incident Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident incident:", error);
        setGlobalState("residentIncidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating resident incident");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/incident/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Incident Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident incident:", error);
        setGlobalState("residentIncidentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting resident incident");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Misper state
export const add_update_delete_resident_misper = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/misper/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Misper Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting resident misper:", error);
        setGlobalState("residentMisperError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting resident misper");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/misper/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Misper Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident misper:", error);
        setGlobalState("residentMisperError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating resident misper");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/misper/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Misper Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident misper:", error);
        setGlobalState("residentMisperError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting resident misper");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident DocumentType state
export const add_update_delete_resident_document_type = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/documenttype/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Document Type Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting resident documenttype:", error);
        setGlobalState("residentDocumentTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting resident documenttype");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/documenttype/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Document Type Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident documenttype:", error);
        setGlobalState("residentDocumentTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating resident documenttype");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/documenttype/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Document Type Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident documenttype:", error);
        setGlobalState("residentDocumentTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting resident documenttype");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Gp Type state
export const add_update_delete_resident_gp_type = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/gptype/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Gp Type Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting resident documenttype:", error);
        setGlobalState("residentGpTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting resident documenttype");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/gptype/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Gp Type Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident documenttype:", error);
        setGlobalState("residentGpTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating resident documenttype");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/gptype/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Gp Type Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident documenttype:", error);
        setGlobalState("residentGpTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting resident documenttype");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Resident Legal Status Type state
export const add_update_delete_resident_legal_status_type = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/legalstatus/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Legal Status Type Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting resident documenttype:", error);
        setGlobalState("residentLegalStatusTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting resident documenttype");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/legalstatus/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Legal Status Type Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating resident documenttype:", error);
        setGlobalState("residentLegalStatusTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating resident documenttype");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/legalstatus/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Legal Status Type Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting resident documenttype:", error);
        setGlobalState("residentLegalStatusTypeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting resident documenttype");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Shift state
export const add_update_delete_shift = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/shift/shifts/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Shift Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting shift:", error);
        setGlobalState("shiftError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting shift");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/shift/shifts/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Shift Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating shift:", error);
        setGlobalState("shiftError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating shift");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/shift/shifts/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Shift Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting shift", error);
        setGlobalState("shiftError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting shift");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete employeeshift state
export const add_update_delete_employee_shift = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        let response;
        if (Array.isArray(payload)) {
          for (const item of payload) {
            response = await axios.post(`${BaseUrl}/shift/employeeshifts/`, item);
          }
        } else {
          response = await axios.post(`${BaseUrl}/shift/employeeshifts/`, payload);
        }

        // Check the response status
        if (response.status === 201) {
          toast.success("Shift Schedule Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting employeeshift:", error);
        setGlobalState("employeeShiftError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting employeeshift");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/shift/employeeshifts/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Shift Schedule Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating employeeshift:", error);
        setGlobalState("employeeShiftError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating employeeshift");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/shift/employeeshifts/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Shift Schedule Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting employeeshift", error);
        setGlobalState("shiftemployeeShiftErrorError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting employeeshift");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Task state
export const add_update_delete_task = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/task/task/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Task Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting task:", error);
        setGlobalState("taskError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting task");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/task/task/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Task Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating task:", error);
        setGlobalState("taskError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating task");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/task/task/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Task Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting task", error);
        setGlobalState("taskError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting task");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Task Assignment state
export const add_update_delete_task_assignment = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/task/taskassignment/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Task Assignment Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting taskassignment:", error);
        setGlobalState("taskAssignmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting taskassignment");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/task/taskassignment/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Task Assignment Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating taskassignment:", error);
        setGlobalState("taskAssignmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating taskassignment");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/task/taskassignment/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Task Assignment Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting taskassignment", error);
        setGlobalState("taskAssignmentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting taskassignment");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Task Document state
export const add_update_delete_task_document = async (state, { type, payload }) => {
  const { id, formData } = payload;
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/task/taskdocument/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Task Document Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting task document:", error);
        setGlobalState("taskDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting task document");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/task/taskdocument/${id}/`, formData);

        // Check the response status
        if (response.status === 200) {
          toast.success("Task Document Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating task document:", error);
        setGlobalState("taskDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating task document");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/task/taskdocument/${id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Task Document Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting task document", error);
        setGlobalState("taskDocumentError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting task document");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Task Chat state
export const add_update_delete_task_chat = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/task/taskchat/`, payload);

        // Check the response status
        if (response.status === 201) {
          // toast.success("Task Chat Added", {
          //   autoClose: 1500,
          // });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting task chat:", error);
        setGlobalState("taskChatError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting task chat");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/task/taskchat/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          // toast.success("Task Chat Updated", {
          //   autoClose: 1500,
          // });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating task chat:", error);
        setGlobalState("taskChatError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating task chat");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/task/taskchat/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          // toast("Task Chat Deleted", {
          //   autoClose: 1500,
          // });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting task chat", error);
        setGlobalState("taskChatError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting task chat");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete GPractice state
export const add_update_delete_gPractice = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/resident/gpractice/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("GPractice Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        setGlobalState("gPracticeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting data");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/resident/gpractice/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("GPractice Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating data:", error);
        setGlobalState("gPracticeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating data");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/resident/gpractice/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("GPractice Deleted", {
            autoClose: 1500,
          })
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting data:", error);
        setGlobalState("gPracticeError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while deleting data");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete Shift state
export const add_update_delete_Career = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${BaseUrl}/careers/jobs/`, payload);

        // Check the response status
        if (response.status === 201) {
          toast.success("Career Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting career:", error);
        toast.error("Network error occured while posting career");
        setGlobalState("careerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while posting career");
      }

    case "update":
      try {
        const response = await axios.put(`${BaseUrl}/careers/jobs/${payload.id}/`, payload);

        // Check the response status
        if (response.status === 200) {
          toast.success("Career Updated", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error("Error occurred while updating career:", error);
        toast.error("Network error occured while updating career");
        setGlobalState("careerError", JSON.stringify(error.response.data));
        throw new Error("Error occurred while updating career");
      }

    case "delete":
      try {
        const response = await axios.delete(`${BaseUrl}/careers/jobs/${payload.id}/`);

        // Check the response status
        if (response.status === 204) {
          toast("Career Deleted", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error occurred while deleting career", error);
        toast.error("Network error occured while deleting career");
        setGlobalState("careerError", JSON.stringify(error?.response?.data));
        throw new Error("Error occurred while deleting career");
      }
    default:
      throw new Error();
  }
};

// Add - Update - Delete User state
export const add_update_delete_user = async (state, { type, payload }) => {
  console.log(payload)
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${Base2Url}/users/`, payload);
        // Check the response status
        if (response.status === 201) {
          toast.success("User Added", {
            autoClose: 1500,
          });
          return;
        } else {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error occurred while posting data:", error);
        toast.error(error.response.data.message);
        throw new Error("Error occurred while posting data");
      }
    default:
      throw new Error();
  }
};

// Login user state
export const login_user = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${Base2Url}/users/login`, payload);
        // Check the response status
        if (response.data) {
          setGlobalState("loadingState", false);
          localStorage.setItem("user", JSON.stringify(response.data));
          window.open('/app/main/dashboard');

          // Close the previous tab on successful login
          window.close();
          return;
        } else {
          throw new Error("Failed to log in");
        }
      } catch (error) {
        setGlobalState("loadingState", false);
        console.error("Error occurred while login user:", error);
        toast.error(error.response.data.message);
      }
    default:
      throw new Error();
  }
};

// Forgot Password state
export const forgot_password = async (state, { type, payload }) => {
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${Base2Url}/users/forgot-password`, payload);
        // Check the response status
        if (response.data) {
          setGlobalState("loadingState", false);
          toast.success("Reset link has been sent to your email!", {
            autoClose: 1500
          });
          window.location.replace("/login");
          return;
        } else {
          throw new Error("Failed to send link");
        }
      } catch (error) {
        setGlobalState("loadingState", false);
        console.error("Error occurred while sending link:", error);
        toast.error(error.response.data.message);
      }
    default:
      throw new Error();
  }
};

// Add - Update - Profile Image
export const add_update_profile_image = async (state, { type, payload }) => {

  console.log("payload--", payload);
  switch (type) {
    case "add":
      try {
        const response = await axios.post(`${Base2Url}/users/profile/profile_upload`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${axiosConfig?.headers?.Authorization}`
          },
        });

        console.log("response--", response);

        // Check the response status
        if (response.status === 201) {
          toast.success("Profile Image Added", {
            autoClose: 1500,
          });
          return;
        } 
      } catch (error) {
        console.error("Error occurred while posting Profile Image:", error);
        toast.error(JSON.stringify(error.response.data));
      }

    case "update":
      try {
        const response = await axios.put(`${Base2Url}/users/profile/profile_upload_update`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${axiosConfig?.headers?.Authorization}`
          },
        });

        // Check the response status
        if (response.status === 200) {
          toast.success("Profile Image Updated", {
            autoClose: 1500,
          });
          return;
        }
      } catch (error) {
        console.error("Error occurred while updating profile image:", error);
        toast.error(JSON.stringify(error.response.data));
      }
    default:
      throw new Error();
  }
};
