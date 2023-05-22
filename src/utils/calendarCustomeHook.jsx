import React, { useState } from "react";

export const useDateWeeklyCalendarCounter = () => {
  const [dateCounter, setDateCounter] = useState(0);
  const recentDates = [];
  const dayMonthYear = [];
  const dayIndex = [];
  let isCurrentDateTrue;
  const activeCurrentDate = [];

  const today = new Date();

  const currentDate = new Date();
  currentDate.setDate(
    dateCounter === 0
      ? currentDate.getDate()
      : currentDate.getDate() + dateCounter * 7
  );

  const firstDayOfWeek = 1;

  const currentDayOfWeek = currentDate.getDay();

  const daysToBackUp = (currentDayOfWeek + 7 - firstDayOfWeek) % 7;

  const firstDateOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - daysToBackUp
  );

  const dates = [firstDateOfWeek];
  for (let i = 1; i < 7; i++) {
    const nextDate = new Date(
      firstDateOfWeek.getFullYear(),
      firstDateOfWeek.getMonth(),
      firstDateOfWeek.getDate() + i
    );
    dates.push(nextDate);
  }

  for (let i = 0; i < dates.length; i++) {
    const dayName = dates[i].toString().slice(0, 3);
    const dayFigure = dates[i].toString().slice(8, 10);
    const month = dates[i].toString().slice(4, 7);
    const year = dates[i].toString().slice(11, 15);
    if (
      dates[i].getDate() === today.getDate() &&
      dates[i].getMonth() === today.getMonth() &&
      dates[i].getFullYear() === today.getFullYear()
    ) {
      isCurrentDateTrue = true;
      activeCurrentDate.push(i);
    }
    recentDates.push(dayName + " " + dayFigure + " " + month);
    dayMonthYear.push(dayName + " " + dayFigure + " " + month + " " + year);
  }

  for (let i = 0; i < recentDates.length; i++) {
    dayIndex.push(i);
  }

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
    recentDates,
    dayMonthYear,
    dayIndex,
    isCurrentDateTrue,
    activeCurrentDate,
    handleNavigation,
  };
};

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
