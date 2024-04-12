import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isPartner(userId: string) {
  const member = await db.member.findFirst({ where: { userId } });
  return member?.isPartner;
}

export function generateTimeRanges() {
  const timeRanges = [];
  for (let hour = 9; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const hourStr = hour.toString().padStart(2, "0");
      const minuteStr = minute.toString().padStart(2, "0");
      const timeRange = `${hourStr}:${minuteStr} ~ ${
        hour === 16 && minute === 45
          ? "17:00"
          : `${hourStr}:${(minute + 15).toString().padStart(2, "0")}`
      }`;
      timeRanges.push({
        label: timeRange,
        start: hourStr + ":" + minuteStr,
      });
    }
  }
  return timeRanges;
}

export function getHourAndMinute(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
