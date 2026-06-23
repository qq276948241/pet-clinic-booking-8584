import { Check } from 'lucide-react';
import type { BookingStep } from '@/types';

interface StepIndicatorProps {
  currentStep: BookingStep;
}

const steps: { key: BookingStep; label: string }[] = [
  { key: 'department', label: '选择科室' },
  { key: 'doctor', label: '选择医生' },
  { key: 'time', label: '选择时间' },
  { key: 'info', label: '填写信息' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  const getStepStatus = (index: number) => {
    if (index < currentIndex) return 'done';
    if (index === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all duration-300 ${
                  status === 'done'
                    ? 'step-done'
                    : status === 'active'
                    ? 'step-active'
                    : 'step-pending'
                }`}
              >
                {status === 'done' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`hidden md:block mt-2 text-xs font-medium ${
                  status === 'done'
                    ? 'text-primary-600'
                    : status === 'active'
                    ? 'text-primary-600'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                  index < currentIndex ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
