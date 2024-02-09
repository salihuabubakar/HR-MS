/**
 * useSearch Custom Hook
 *
 * This custom hook is designed to handle search functionality for a given dataset. It utilizes the 'useEffect' and 'useState' hooks to manage search-related states and debounce user input for better performance.
 *
 * @function useSearch
 * @param {Array} data - The dataset to be searched.
 * @returns {Object} - An object containing search-related states and functions.
 * @property {string} searchQuery - The current search query.
 * @property {Function} setSearchQuery - Function to set the search query.
 * @property {Array} filteredResults - The filtered results based on the search query.
 */
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useDataFetching, useResidentFetching, useHouseFetching } from "../employeeCustomFetchHook";

export const useSearch = (data) => {
  // Custom hooks for fetching employee, resident, and house data
  const { data: allEmployee } = useDataFetching();
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();

  // State variables for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Debounced search function for better performance
  const performSearch = debounce((query) => {
    const filteredData = data?.filter((item) => {
      // Extracting relevant fields from the dataset
      const {
        first_name,
        middle_name,
        last_name,
        employee,
        name,
        request,
        visitor,
        title: titleName,
        document_type,
        legal_status_name,
        borough_name,
        gp_type_name,
        resident,
        gp_practice_name,
        solicitor_name,
        school_name,
        organisation_name,
        house
      } = item;

      // Matching employee, resident, and house data based on IDs
      const matchedEmployee = allEmployee?.find((e) => e.id === employee);
      const matchedResident = residentData?.find((r) => r.id === resident);
      const matchedHouse = houseData?.find((h) => h.id === house);

      // Constructing full name and title strings for comparison
      const fullName = first_name?.toLocaleLowerCase() + " " + middle_name?.toLocaleLowerCase() + " " + last_name?.toLocaleLowerCase();
      const title = name?.toLocaleLowerCase();

      // Checking if any field includes the search query
      return (
        ((matchedEmployee && `${matchedEmployee.first_name} ${matchedEmployee.middle_name} ${matchedEmployee.last_name}`.toLocaleLowerCase().includes(query))) ||
        ((matchedResident && `${matchedResident.first_name} ${matchedResident.middle_name} ${matchedResident.last_name}`.toLocaleLowerCase().includes(query))) ||
        ((matchedHouse && `${matchedHouse.name}`.toLocaleLowerCase().includes(query))) ||
        fullName?.includes(query) ||
        title?.includes(query) ||
        request?.toLocaleLowerCase()?.includes(query) ||
        visitor?.toLocaleLowerCase()?.includes(query) ||
        titleName?.toLocaleLowerCase()?.includes(query) ||
        document_type?.toLocaleLowerCase()?.includes(query) ||
        legal_status_name?.toLocaleLowerCase()?.includes(query) ||
        gp_type_name?.toLocaleLowerCase()?.includes(query) ||
        borough_name?.toLocaleLowerCase()?.includes(query) ||
        gp_practice_name?.toLocaleLowerCase()?.includes(query) ||
        solicitor_name?.toLocaleLowerCase()?.includes(query) ||
        school_name?.toLocaleLowerCase()?.includes(query) ||
        organisation_name?.toLocaleLowerCase()?.includes(query)
      );
    });

    // Updating the state with the filtered results
    setFilteredResults(filteredData);
  }, 500); // Debounce time set to 500 milliseconds

  // Effect to trigger search when the searchQuery changes
  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  // Return the search-related states and functions
  return { searchQuery, setSearchQuery, filteredResults };
};
