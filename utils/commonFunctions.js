import { LONG_MONTHS, MONTHS, COLORS, BOX_SHADOWS } from "./constants";

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

  return total;
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

  return total;
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

  return best;
}
