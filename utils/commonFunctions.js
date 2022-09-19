import { LONG_MONTHS, MONTHS } from "./constants";

export function getLongMonth() {
  let monthDay = new Date().getMonth();
  return LONG_MONTHS[monthDay];
}

export function getShortMonth() {
  let monthDay = new Date().getMonth();
  return MONTHS[monthDay];
}

export function getDayOfYear(date = new Date()) {
  const timestamp1 = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

  const differenceInMilliseconds = timestamp1 - timestamp2;

  const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

  return differenceInDays;
}

export function getMonthlySpent(exp) {
  let total = 0;

  if (exp) {
    exp.forEach((expense) => {
      let expenseDate = new Date(expense.date);
      if (expenseDate.getMonth() === new Date().getMonth()) {
        total += expense.amount;
      }
    });
  }

  return total.toFixed(2);
}

export function getYearlySpent(exp) {
  let total = 0;

  if (exp) {
    exp.forEach((expense) => {
      let expenseDate = new Date(expense.date);
      if (expenseDate.getFullYear() === new Date().getFullYear()) {
        total += expense.amount;
      }
    });
  }

  return total.toFixed(2);
}

export function getMaxAmount(exp) {
  let best = 0;

  if (exp) {
    exp.forEach((expense) => {
      let expenseDate = new Date(expense.date);
      if (
        expenseDate.getFullYear() === new Date().getFullYear() &&
        expense.amount > best
      ) {
        best = expense.amount;
      }
    });
  }

  return best.toFixed(2);
}

/* INFO: formats date in 12,Sep 2022 */
export function formatDate(date) {
  let formatedDate = "";
  let convertedDate = new Date(date);

  formatedDate =
    convertedDate.getDate() +
    ", " +
    MONTHS[convertedDate.getMonth()] +
    " " +
    convertedDate.getFullYear();

  return formatedDate;
}

/* INFO: slices text to fit in x characters */
export function sliceConcept(concept) {
  let words = concept.split(" ");
  if (words[0].length < 10) {
    return words[0];
  } else {
    return concept.slice(0, 7) + "...";
  }
}

export function getFullNameDate() {
  let date = new Date().toLocaleString("default", { month: "long" });
  let first = date.charAt(0).toUpperCase();
  let rest = date.slice(1, date.length);

  return first + rest + "-" + new Date().getFullYear();
}