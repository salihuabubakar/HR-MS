import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useDataFetching } from "../employeeCustomFetchHook";

export const useSearch = (data) => {
  const { data: allEmployee } = useDataFetching();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const performSearch = debounce((query) => {
    const filteredData = data?.filter((item) => {
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
      } = item;
      const matchedEmployee = allEmployee?.find((e) => e.id === employee);
      const fullName = first_name?.toLocaleLowerCase() + " " + middle_name?.toLocaleLowerCase() + " " + last_name?.toLocaleLowerCase();
      const title = name?.toLocaleLowerCase();
      if(matchedEmployee) {
        const employeefullName =
          `${matchedEmployee.first_name} ${matchedEmployee.middle_name} ${matchedEmployee.last_name}`.toLocaleLowerCase();
        return employeefullName.includes(query);
      } else {
        return (
          fullName?.includes(query) ||
          title?.includes(query) ||
          request?.toLocaleLowerCase()?.includes(query) ||
          visitor?.toLocaleLowerCase()?.includes(query) ||
          titleName?.toLocaleLowerCase()?.includes(query) ||
          document_type?.toLocaleLowerCase()?.includes(query) ||
          legal_status_name?.toLocaleLowerCase()?.includes(query) ||
          gp_type_name?.toLocaleLowerCase()?.includes(query) ||
          borough_name?.toLocaleLowerCase()?.includes(query)
        );
      } 
    });

    setFilteredResults(filteredData);
  }, 300); // Set the debounce delay (in milliseconds) according to your preference

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  return { searchQuery, handleSearch, filteredResults };
};
