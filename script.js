const monthElement = document.getElementById("month");
const yearElement = document.getElementById("year");
const daysElement = document.getElementById("days");
const todayElement = document.getElementById("today");
const timeElement = document.getElementById("time");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthElement.textContent = months[currentMonth];
    yearElement.textContent = currentYear;

    daysElement.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
        daysElement.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        const day = document.createElement("div");
        day.textContent = i;
        if (i === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
            day.classList.add("active");
        }
        daysElement.appendChild(day);
    }
}

function updateTime() {
    const timeNow = new Date();
    const hours = String(timeNow.getHours()).padStart(2, "0");
    const minutes = String(timeNow.getMinutes()).padStart(2, "0");
    const seconds = String(timeNow.getSeconds()).padStart(2, "0");

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    todayElement.textContent = `${timeNow.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })}`;
}

document.querySelector(".prev").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

renderCalendar();
updateTime();
setInterval(updateTime, 1000);
