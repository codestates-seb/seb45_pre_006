import { differenceInDays, parseISO } from "date-fns";

export default function calculateDateDifference(targetDate) {
  const currentDate = new Date();
  const parsedTargetDate = parseISO(targetDate);
  const daysDifference = differenceInDays(currentDate, parsedTargetDate);

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference <= 6) {
    return `${daysDifference} days`;
  } else if (daysDifference <= 30) {
    const weeksDifference = Math.floor(daysDifference / 7);
    return `${weeksDifference} weeks`;
  } else if (daysDifference <= 365) {
    const monthsDifference = Math.floor(daysDifference / 30);
    return `${monthsDifference} months`;
  } else {
    const yearsDifference = Math.floor(daysDifference / 365);
    const remainingMonths = Math.floor((daysDifference % 365) / 30);
    return remainingMonths
      ? `${yearsDifference} years, ${remainingMonths} months`
      : `${yearsDifference} years`;
  }
}
