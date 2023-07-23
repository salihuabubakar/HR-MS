import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useDataFetching, useResidentFetching } from "../employeeCustomFetchHook";

export const useSearch = (data) => {
  const { data: allEmployee } = useDataFetching();
  const { residentData } = useResidentFetching();
  const [searchQuery, setSearchQuery] = useState("");
  const [clearQuery, setClearQuery] = useState("");
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
        resident,
        gp_practice_name,
        solicitor_name
      } = item;
      const matchedEmployee = allEmployee?.find((e) => e.id === employee);
      const matchedResident = residentData?.find((r) => r.id === resident);
      const fullName = first_name?.toLocaleLowerCase() + " " + middle_name?.toLocaleLowerCase() + " " + last_name?.toLocaleLowerCase();
      const title = name?.toLocaleLowerCase();
      if(matchedEmployee) {
        const employeefullName =
          `${matchedEmployee.first_name} ${matchedEmployee.middle_name} ${matchedEmployee.last_name}`.toLocaleLowerCase();
        return employeefullName.includes(query);

      } else if(matchedResident) {
        const residentfullName =
          `${matchedResident.first_name} ${matchedResident.middle_name} ${matchedResident.last_name}`.toLocaleLowerCase();
        return residentfullName.includes(query);

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
          borough_name?.toLocaleLowerCase()?.includes(query) ||
          resident?.toLocaleLowerCase()?.includes(query) ||
          gp_practice_name?.toLocaleLowerCase()?.includes(query) ||
          solicitor_name?.toLocaleLowerCase()?.includes(query)
        );
      }
    });

    setFilteredResults(filteredData);
  }, 500);

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, handleSearch, filteredResults };
};
