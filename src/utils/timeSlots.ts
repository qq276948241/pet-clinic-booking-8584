import type { TimeSlot } from '@/types';

const timeRanges = [
  '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00',
];

export function generateTimeSlots(days: number = 7): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let dayOffset = 0; dayOffset < days; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = formatDate(date);

    timeRanges.forEach((time, index) => {
      const isAvailable = Math.random() > 0.3;
      slots.push({
        id: `${dayOffset}-${index}`,
        date: dateStr,
        time,
        available: isAvailable,
      });
    });
  }

  return slots;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(dateStr: string): string {
  const date = new Date(dateStr);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  return `${month}月${day}日 ${weekday}`;
}

export function getUpcomingDates(days: number = 7): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(formatDate(date));
  }

  return dates;
}
