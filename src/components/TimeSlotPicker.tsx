import { Clock } from 'lucide-react';
import type { TimeSlot } from '../types';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelect: (time: string) => void;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelect }: TimeSlotPickerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700 mb-4">
        <Clock className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold">选择时间段</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {slots.map((slot, index) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
            style={{ animationDelay: `${index * 30}ms` }}
            className={`relative px-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              !slot.available
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                : selectedSlot === slot.time
                ? 'bg-primary-500 text-white shadow-lg ring-2 ring-primary-300 transform scale-105'
                : 'bg-white text-gray-700 border-2 border-primary-100 hover:border-primary-400 hover:bg-primary-50 animate-slide-up'
            }`}
          >
            {slot.time}
            {!slot.available && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                ×
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
