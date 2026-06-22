import { cn } from '@/lib/utils';
import { getNextDays, getWeekday, getTimeSlots } from '@/utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TimeSlotPickerProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: TimeSlotPickerProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const days = getNextDays(14);
  const visibleDays = days.slice(weekOffset * 7, weekOffset * 7 + 7);
  const timeSlots = getTimeSlots();

  const isTimeUnavailable = (date: string, time: string): boolean => {
    const now = new Date();
    const slotDateTime = new Date(`${date}T${time}`);
    return slotDateTime < now;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">选择日期</label>
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
            disabled={weekOffset === 0}
            className="p-2 rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-grow text-center text-sm font-medium text-gray-600">
            {weekOffset === 0 ? '本周' : '下周'}
          </div>
          <button
            type="button"
            onClick={() => setWeekOffset((prev) => Math.min(1, prev + 1))}
            disabled={weekOffset === 1}
            className="p-2 rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {visibleDays.map((date) => {
            const isToday = date === getNextDays(1)[0];
            const isSelected = selectedDate === date;
            return (
              <button
                key={date}
                type="button"
                onClick={() => onDateChange(date)}
                className={cn(
                  'flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 min-h-[60px]',
                  isSelected
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white hover:bg-primary-50 text-gray-700 border border-gray-100'
                )}
              >
                <span className="text-xs font-medium">{getWeekday(date)}</span>
                <span className="text-lg font-semibold">{new Date(date).getDate()}</span>
                {isToday && (
                  <span className={cn('text-xs', isSelected ? 'text-white/80' : 'text-primary-500')}>
                    今天
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">选择时间段</label>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
            {timeSlots.map((time) => {
              const isUnavailable = isTimeUnavailable(selectedDate, time);
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => !isUnavailable && onTimeChange(time)}
                  disabled={isUnavailable}
                  className={cn(
                    'py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]',
                    isSelected
                      ? 'bg-primary-500 text-white shadow-md'
                      : isUnavailable
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      : 'bg-white hover:bg-primary-50 text-gray-700 border border-gray-100'
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
