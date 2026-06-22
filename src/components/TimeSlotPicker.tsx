import { useMemo } from 'react';
import { Clock, CalendarDays } from 'lucide-react';
import { getNext7Days, getTimeSlots } from '@/data/mockData';
import { useBookingStore } from '@/store/useBookingStore';

const TimeSlotPicker = () => {
  const { selectedDate, selectedTimeSlot, setSelectedDate, setSelectedTimeSlot } = useBookingStore();
  const days = useMemo(() => getNext7Days(), []);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getTimeSlots(selectedDate);
  }, [selectedDate]);

  const morningSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour < 12;
  });

  const afternoonSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour >= 12;
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
          <CalendarDays className="w-5 h-5 text-primary-500" />
          选择日期
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all duration-200 ${
                selectedDate === day.date
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              <div className="text-xs mb-1">
                {day.isToday ? '今天' : day.weekDay}
              </div>
              <div className="text-lg font-semibold">{day.day}</div>
              <div className="text-xs opacity-80">{day.month}月</div>
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <Clock className="w-5 h-5 text-primary-500" />
            选择时间段
          </label>

          {morningSlots.length > 0 && (
            <div>
              <div className="text-sm text-gray-500 mb-2">上午</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {morningSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedTimeSlot(slot)}
                    disabled={!slot.available}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedTimeSlot?.id === slot.id
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                        : slot.available
                        ? 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                    }`}
                  >
                    {slot.time}
                    {!slot.available && <div className="text-xs mt-0.5">约满</div>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {afternoonSlots.length > 0 && (
            <div>
              <div className="text-sm text-gray-500 mb-2">下午</div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {afternoonSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedTimeSlot(slot)}
                    disabled={!slot.available}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedTimeSlot?.id === slot.id
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                        : slot.available
                        ? 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                    }`}
                  >
                    {slot.time}
                    {!slot.available && <div className="text-xs mt-0.5">约满</div>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
