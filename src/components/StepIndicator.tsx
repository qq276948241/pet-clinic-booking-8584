import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-primary-500 text-white shadow-md'
                  : index === currentStep
                  ? 'bg-primary-500 text-white shadow-lg ring-4 ring-primary-200'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                index <= currentStep ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-1 mx-2 rounded-full transition-all duration-500 ${
                index < currentStep ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
