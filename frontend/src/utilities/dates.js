function formatDateToDDMMYYYY(inputDate) {
  const date = new Date(inputDate);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
export function getPastWeek() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() - 7);

  const day = String(nextWeek.getDate()).padStart(2, "0");
  const month = String(nextWeek.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = nextWeek.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getDatelastMonthFromNow() {
  const today = new Date();
  const prevMonth = new Date(today);
  prevMonth.setMonth(today.getMonth() - 1);

  const day = String(prevMonth.getDate()).padStart(2, "0");
  const month = String(prevMonth.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = prevMonth.getFullYear();

  return `${day}/${month}/${year}`;
}
export function getFirstDayOfLastMonth() {
  const today = new Date();
  const firstDayPrevMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );

  const day = String(firstDayPrevMonth.getDate()).padStart(2, "0");
  const month = String(firstDayPrevMonth.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = firstDayPrevMonth.getFullYear();

  return `${day}/${month}/${year}`;
}
export function getLastDayOfLastMonth() {
  const today = new Date();
  const lastDayPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  const day = String(lastDayPrevMonth.getDate()).padStart(2, "0");
  const month = String(lastDayPrevMonth.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = lastDayPrevMonth.getFullYear();

  return `${day}/${month}/${year}`;
}

export function isDateInLastMonth(dateStr) {
  const date = new Date(dateStr);
  const firstDayLastMonth = new Date(
    getFirstDayOfLastMonth().split("/").reverse().join("-")
  );
  const lastDayLastMonth = new Date(
    getLastDayOfLastMonth().split("/").reverse().join("-")
  );

  return date >= firstDayLastMonth && date <= lastDayLastMonth;
}

export function formatDateToYYYYMMDD(dateStr) {
  const [day, month, year] = dateStr.split("/");

  // Ensure leading zeros for day and month
  const formattedDay = day.padStart(2, "0");
  const formattedMonth = month.padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function areSameMonthAndYear(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
  );
}

export function isDateWithinToday(dateStr) {
  const newdate = formatDateToDDMMYYYY(dateStr);

  const inputDate = new Date(newdate);
  const today = new Date();
  console.log(today);
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  return inputDate >= startOfDay && inputDate <= endOfDay;
}

function filterArrayByMonthYear(dateParam, dataArray) {
  const [month, year] = dateParam.split("/");

  // Filter the array based on the date field
  const filteredArray = dataArray.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getMonth() === parseInt(month) - 1 &&
      itemDate.getFullYear() === parseInt(year)
    );
  });

  return filteredArray;
}

export const getCurrentYear = () => {
  const today = new Date();

  return today.getFullYear();
};

export function getMonthNameAndYear(dateParam) {
  //the fdate format of the parameter tat will be passes is dd/mm/yyyy
  const valid = formatDateToDDMMYYYY(dateParam);
  const dateParamArr = valid.split("/");
  const month = dateParamArr[1];
  const year = dateParamArr[2];

  // Create an array of month names
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

  // Get the month name based on the month value (subtract 1 since months are zero-indexed)
  const monthName = monthNames[parseInt(month) - 1];

  return { month: monthName, year: year };
}

export function getMondayAndSunday() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the difference between today and the most recent Monday
  const daysUntilMonday = (currentDay + 6) % 7;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysUntilMonday);

  // Calculate the corresponding Sunday (6 days after the Monday)
  const nextSunday = new Date(lastMonday);
  nextSunday.setDate(lastMonday.getDate() + 6);

  // Format dates as yyyy-mm-dd
  const formattedLastMonday = lastMonday.toISOString().slice(0, 10);
  const formattedNextSunday = nextSunday.toISOString().slice(0, 10);

  return { lastMonday: formattedLastMonday, nextSunday: formattedNextSunday };
}

export function getDayOfWeek(dateStr) {
  try {
    // Parse the input date string
    const dateObj = new Date(dateStr);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    return dayOfWeek;
  } catch (error) {
    return "Invalid date format. Please provide a date in the format YYYY-MM-DD.";
  }
}

export function getMonthAndYear(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; // Adding 1 because months are zero-indexed
  const year = date.getFullYear();
  return { month, year };
}

// Function to format the current date as YYYY-MM
export const getCurrentMonth = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();
  return `${year}-${month}`;
};

export function getMonthNameFromDate(dateString) {
  const date = new Date(dateString);
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

  const monthIndex = date.getMonth(); // getMonth() returns a zero-based index
  return monthNames[monthIndex];
}

export const replaceDashWithHypen = (dateStr) => {
  //make sure the param si yyyy/mm/dd
  // Parse the input datetime string
  const dt = new Date(dateStr);

  // Format the datetime as yyyy-mm-dd
  const formattedDate = dt.toISOString().split("T")[0];

  return formattedDate;
};
