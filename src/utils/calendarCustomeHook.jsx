import { useState } from "react";

/**
 * useDateWeeklyCalendarCounter Custom Hook
 *
 * This custom hook is designed to handle date calculations and state management for a weekly calendar view.
 *
 * @function useDateWeeklyCalendarCounter
 * @returns {Object} - An object containing state variables and functions for handling weekly calendar operations.
 * @property {number} dateCounter - Counter for navigating weeks in the calendar.
 * @property {Array} recentDates - Array containing recent dates in the calendar.
 * @property {Array} dayMonthYear - Array containing date strings in the format "day figure month year".
 * @property {Array} dayIndex - Array containing indices of days in the week.
 * @property {boolean} isCurrentDateTrue - Boolean indicating if the current date is included in the displayed week.
 * @property {Array} activeCurrentDate - Array containing indices of the active current date in the week.
 * @property {Function} handleNavigation - Function to handle navigation (previous, next, reset) in the calendar.
 */

export const useDateWeeklyCalendarCounter = () => {
  // State variable to track the counter for navigating weeks in the calendar
  const [dateCounter, setDateCounter] = useState(0);

  // Arrays to store date-related information
  const recentDates = [];
  const dayMonthYear = [];
  const dayIndex = [];
  let isCurrentDateTrue;
  const activeCurrentDate = [];

  // Get the current date
  const today = new Date();

  // Create a new date object for the current week, adjusted based on the dateCounter
  const currentDate = new Date();
  currentDate.setDate(
    dateCounter === 0
      ? currentDate.getDate()
      : currentDate.getDate() + dateCounter * 7
  );

  // Constants for calculating the first day of the week
  const firstDayOfWeek = 1;
  const currentDayOfWeek = currentDate.getDay();
  const daysToBackUp = (currentDayOfWeek + 7 - firstDayOfWeek) % 7;
  const firstDateOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - daysToBackUp
  );

  // Generate an array of dates for the current week
  const dates = [firstDateOfWeek];
  for (let i = 1; i < 7; i++) {
    const nextDate = new Date(
      firstDateOfWeek.getFullYear(),
      firstDateOfWeek.getMonth(),
      firstDateOfWeek.getDate() + i
    );
    dates.push(nextDate);
  }

  // Populate arrays with date-related information
  for (let i = 0; i < dates.length; i++) {
    //Get the value of the date E.g Mon Aug 01 2022
    //Value: Mon
    const dayName = dates[i].toString().slice(0, 3);
    const dayFigure = dates[i].toString().slice(8, 10);
    const month = dates[i].toString().slice(4, 7);
    const year = dates[i].toString().slice(11, 15);

    // Check if the date is the current date
    if (
      dates[i].getDate() === today.getDate() &&
      dates[i].getMonth() === today.getMonth() &&
      dates[i].getFullYear() === today.getFullYear()
    ) {
      isCurrentDateTrue = true;
      activeCurrentDate.push(i);
    }

    // Push data to arrays
    recentDates.push(dayName + " " + dayFigure + " " + month);
    dayMonthYear.push(dayName + " " + dayFigure + " " + month + " " + year);
  }

  // Populate the dayIndex array
  for (let i = 0; i < recentDates.length; i++) {
    dayIndex.push(i);
  }

  // Function to handle navigation in the calendar
  const handleNavigation = (direction) => {
    if (direction === "prev") {
      setDateCounter((prevCounter) => prevCounter - 1);
    } else if (direction === "next") {
      setDateCounter((prevCounter) => prevCounter + 1);
    } else {
      setDateCounter(0);
    }
  };

  // Return an object with the state variables and functions
  return {
    dateCounter,
    recentDates,
    dayMonthYear,
    dayIndex,
    isCurrentDateTrue,
    activeCurrentDate,
    handleNavigation,
  };
};



/**
 * useDateMonthlyCalendarCounter Custom Hook
 *
 * This custom hook is designed to handle date calculations and state management for a monthly calendar view.
 *
 * @function useDateMonthlyCalendarCounter
 * @returns {Object} - An object containing state variables and functions for handling monthly calendar operations.
 * @property {number} dateCounter - Counter for navigating months in the calendar.
 * @property {Array} dayNames - Array containing abbreviated day names.
 * @property {string} currentMonthName - Name of the current month.
 * @property {number} currentYear - Year of the current month.
 * @property {Array} tableData - Array containing data for rendering the monthly calendar table.
 * @property {Function} handleNavigation - Function to handle navigation (previous, next, reset) in the calendar.
 */

export const useDateMonthlyCalendarCounter = () => {
  const [dateCounter, setDateCounter] = useState(0);
  let currentDate = new Date();
  let isCurrentDateTrue;
  currentDate.setMonth(currentDate.getMonth() + dateCounter);

  let numDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  let firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  let firstDayOfWeek = firstDayOfMonth.getDay();

  let daysToBackUp = (firstDayOfWeek + 6) % 7;

  let firstDateOfMonth = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth(),
    firstDayOfMonth.getDate() - daysToBackUp
  );

  let dates = [];
  for (var i = 0; i < 42; i++) {
    var nextDate = new Date(
      firstDateOfMonth.getFullYear(),
      firstDateOfMonth.getMonth(),
      firstDateOfMonth.getDate() + i
    );
    dates.push(nextDate);
  }

  let tableData = [];
  let weekData = [];
  for (var i = 0; i < dates.length; i++) {
    let dayName = dates[i].toString().slice(0, 3);
    let dayFigure = dates[i].toString().slice(8, 10);
    const month = dates[i].toString().slice(4, 7);
    const year = dates[i].toString().slice(11, 15);
    let isCurrentMonth = dates[i].getMonth() === currentDate.getMonth();
    isCurrentDateTrue =
      dates[i].getDate() === new Date().getDate() &&
      dates[i].getMonth() === new Date().getMonth() &&
      dates[i].getFullYear() === new Date().getFullYear();

    weekData.push({
      dayName,
      dayFigure,
      isCurrentMonth,
      month,
      year,
      isCurrentDateTrue,
    });

    if ((i + 1) % 7 === 0) {
      tableData.push(weekData);
      weekData = [];
    }
  }

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get the current month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Function to handle the navigation buttons
  const handleNavigation = (direction) => {
    if (direction === "prev") {
      setDateCounter((prevCounter) => prevCounter - 1);
    } else if (direction === "next") {
      setDateCounter((prevCounter) => prevCounter + 1);
    } else {
      setDateCounter(0);
    }
  };
  return {
    dateCounter,
    dayNames,
    currentMonthName,
    currentYear,
    tableData,
    handleNavigation,
  };
}
