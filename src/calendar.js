const locale = window.navigator.userLanguage || window.navigator.language;
const date = new Date();
const monthIndex = date.getMonth();
let count = monthIndex;
let currentYear = 0;

class Calendar {
  constructor() {
    this.dom = {
      calendarDaysList: document.querySelectorAll("#days-name li"),
      daysElement: document.querySelectorAll("#days-number div"),
      monthInnerText: document.querySelector("#month"),
      yearInnerText: document.querySelector("#year"),
      prev: document.querySelector("#prev"),
      next: document.querySelector("#next"),
    };
    this.monthsArr = [
      "January",
      "Febrauary",
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
    this.init();
  }

  init() {
    this.getYear();
    this.getMonth();
    this.eventListeners();
  }

  // get year
  getYear() {
    const date = new Date().getFullYear();
    let year = date + currentYear;
    this.dom.yearInnerText.textContent = year;
  }

  // get Month
  getMonth() {
    let month = this.monthsArr[count];
    this.dom.monthInnerText.textContent = month;
    this.getDate();
  }

  // get number of days of the specified month
  getDate() {
    const currYear = this.dom.yearInnerText.textContent;
    const currMonth = this.dom.monthInnerText.textContent;
    let monIndex;

    this.monthsArr.forEach((month, index) => {
      if (month === currMonth) {
        monIndex = index + 1;
      }
    });
    const daysInMonth = new Date(currYear, monIndex, 0).getDate();
    const emptyDays = this.getEmptyDays(monIndex, currYear);
    this.addDate(daysInMonth, emptyDays);
  }

  // get number of empty calendar from the list
  getEmptyDays(monIndex, currYear) {
    const date = new Date(currYear, monIndex - 1, 1);
    const options = { weekday: "short" };
    const firstDayName = Intl.DateTimeFormat(locale, options).format(date);

    let emptyDays;
    this.dom.calendarDaysList.forEach((day, index) => {
      if (firstDayName === day.textContent) {
        return (emptyDays = index);
      }
    });
    return emptyDays;
  }

  // add date of each day of the specified month in the calendar
  addDate(days, emptyDays) {
    this.dom.daysElement.forEach((elem) => {
      if (elem.textContent !== "") {
        elem.textContent = "";
      }
    });
    for (let day = 1; day <= days; day++) {
      let index = day + emptyDays - 1;
      this.dom.daysElement[index].textContent = day;
    }
    this.disableEmptyList();
    this.highlight();
  }

  // Disable All Empty Column in Calendar
  disableEmptyList() {
    this.dom.daysElement.forEach((elem) => {
      elem.classList.remove("empty");
      if (elem.textContent === "") {
        elem.classList.add("empty");
      }
    });
  }

  // highlight current date
  highlight() {
    let year = this.dom.yearInnerText.textContent;
    let month = this.dom.monthInnerText.textContent;

    let cuurentYear = new Date().getFullYear();
    let currentDate = new Date().getDate();
    let monthIndex = new Date().getMonth();
    let currentMonth = this.monthsArr[monthIndex];

    this.dom.daysElement.forEach((day) => {
      day.classList.remove("highlight");
    });

    if (year == cuurentYear && month === currentMonth) {
      this.dom.daysElement.forEach((day) => {
        day.classList.remove("highlight");
        if (day.textContent == currentDate) {
          day.classList.add("highlight");
        }
      });
    }
  }

  incrementMonth(index) {
    if (index > 11) {
      count = 0;
      currentYear++;
      this.getYear();
      this.getMonth(count);
    }
    this.getMonth(index);
  }

  decrementMonth(index) {
    if (index < 0) {
      count = 11;
      currentYear--;
      this.getYear();
      this.getMonth(count);
    }
    this.getMonth(index);
  }

  eventListeners() {
    this.dom.prev.addEventListener("click", () => {
      count--;
      this.decrementMonth(count);
    });
    this.dom.next.addEventListener("click", () => {
      count++;
      this.incrementMonth(count);
    });
  }
}

(function () {
  new Calendar();
})();
