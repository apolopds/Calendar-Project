
let monthYear = document.getElementById("month-year");
let calendarBody = document.getElementById("calendar-body");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Get the months
let months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Show calendar function
function showCalendar(month, year) {
  calendarBody.innerHTML = "";
  monthYear.textContent = months[month] + " " + year;

  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  let date = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        row.appendChild(document.createElement("td"));
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.textContent = date;

        // Highlight today
        if (
          date === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          cell.classList.add("today");
        }

        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

// Smooth transition when changing month
function changeMonth(next = true) {
  calendarBody.classList.add("hide"); // fade-out
  setTimeout(() => {
    currentMonth += next ? 1 : -1;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }

    showCalendar(currentMonth, currentYear);
    calendarBody.classList.remove("hide"); // fade-in
  }, 400); // wait for fade-out
}

// Buttons
prevBtn.onclick = () => changeMonth(false);
nextBtn.onclick = () => changeMonth(true);

// Load calendar
showCalendar(currentMonth, currentYear);
