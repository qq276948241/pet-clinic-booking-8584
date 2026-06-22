import TimeSlotPicker from '@/components/TimeSlotPicker';
import { useBookingStore } from '@/store/useBookingStore';

interface StepTimeProps {
  onNext?: () => void;
}

const StepTime = ({ onNext }: StepTimeProps) => {
  const { selectedTimeSlot } = useBookingStore();

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">选择就诊时间</h2>
      <p className="text-gray-500 mb-6">请选择方便的就诊日期和时间段</p>
      <TimeSlotPicker />
      {selectedTimeSlot && onNext && (
        <div className="mt-6 text-center">
          <p className="text-sm text-green-600 mb-3">
            已选择：{selectedTimeSlot.date} {selectedTimeSlot.time}
          </p>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
          >
            确认并继续
          </button>
        </div>
      )}
    </div>
  );
};

export default StepTime;
