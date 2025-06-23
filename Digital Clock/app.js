let is24HourFormat = false;

function updateClock() {
  const now = new Date();

  // Get time components
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Get date components
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
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const month = monthNames[now.getMonth()];
  const dayName = dayNames[now.getDay()];
  const dayNumber = now.getDate();
  const year = now.getFullYear();

  // Handle 12/24 hour format
  let period = "";
  let displayHours = hours;

  if (!is24HourFormat) {
    // 12-hour format
    period = hours >= 12 ? "PM" : "AM";
    displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
  }

  // Format time with leading zeros
  const formattedHours = displayHours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Update DOM elements
  document.querySelector(".hour").textContent = formattedHours;
  document.querySelector(".minutes").textContent = formattedMinutes;
  document.querySelector(".seconds").textContent = formattedSeconds;

  // Update period visibility and text
  const periodElement = document.querySelector(".period");
  if (is24HourFormat) {
    periodElement.classList.add("hidden");
  } else {
    periodElement.classList.remove("hidden");
    periodElement.textContent = period;
  }

  // Update calendar
  document.querySelector(".month-name").textContent = month;
  document.querySelector(".day-name").textContent = dayName;
  document.querySelector(".day-number").textContent = dayNumber;
  document.querySelector(".year").textContent = year;
}

function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
  const button = document.querySelector(".format-toggle");

  if (is24HourFormat) {
    button.textContent = "Switch to 12H";
  } else {
    button.textContent = "Switch to 24H";
  }

  updateClock(); // Immediately update the display
}

// Initialize clock
updateClock();

// Update every second
setInterval(updateClock, 1000);
