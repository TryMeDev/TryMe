import { status } from "../slices/adsSlice";

export const addDays = (
  days: number,
  date: Date = new Date(),
  isNoon = true
): Date => {
  const copyDate = new Date(date);
  copyDate.setDate(copyDate.getDate() + days);
  if (isNoon) {
    copyDate.setHours(0);
    copyDate.setMinutes(0);
    copyDate.setSeconds(0);
    copyDate.setMilliseconds(0);
  }
  return copyDate;
};

export function sortByDate<T>(arr: Array<T>, key: keyof T, asc = true) {
  const cloned = Array.from(arr);
  return cloned.sort((a, b) => {
    const aDate = new Date(a[key] as string);
    const bDate = new Date(b[key] as string);
    return asc
      ? aDate.getTime() - bDate.getTime()
      : bDate.getTime() - aDate.getTime();
  });
}

export function statusMatrix(status: status): status[] {
  if (status === "unpaid") {
    return ["unpaid", "rejected"];
  }
  if (status === "paid") {
    return ["paid", "approved", "rejected"]; // approved: capture; rejected: cancel
  }
  if (status === "approved") {
    return ["approved", "canceled"];
  }
  if (status === "rejected") {
    return ["rejected"];
  }
  if (status === "canceled") {
    return ["canceled"];
  }
  return [];
}
