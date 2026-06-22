import { Cat, Dog, Bird, Fish, Rabbit, User, PawPrint, FileText } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import type { PetInfo } from '@/types';

interface StepPetInfoProps {
  errors?: Record<string, string>;
  onErrorsChange?: (errors: Record<string, string>) => void;
}

const petTypes = [
  { value: '狗狗', icon: Dog },
  { value: '猫咪', icon: Cat },
  { value: '兔子', icon: Rabbit },
  { value: '鸟类', icon: Bird },
  { value: '鱼类', icon: Fish },
  { value: '其他', icon: User },
];

const StepPetInfo = ({ errors = {}, onErrorsChange }: StepPetInfoProps) => {
  const { petInfo, setPetInfo } = useBookingStore();

  const handleChange = (field: keyof PetInfo, value: string | number) => {
    setPetInfo({ [field]: value });
    if (errors[field] && onErrorsChange) {
      const newErrors = { ...errors };
      delete newErrors[field];
      onErrorsChange(newErrors);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <PawPrint className="w-6 h-6 text-primary-500" />
        填写宠物信息
      </h2>
      <p className="text-gray-500 mb-6">请填写爱宠的详细信息，帮助医生更好地诊断</p>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            宠物名字 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={petInfo.petName}
            onChange={(e) => handleChange('petName', e.target.value)}
            placeholder="请输入宠物名字"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
              errors.petName
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-primary-400'
            }`}
          />
          {errors.petName && <p className="mt-1 text-sm text-red-500">{errors.petName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            宠物类型 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {petTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => handleChange('petType', type.value)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all ${
                    petInfo.petType === type.value
                      ? 'border-primary-400 bg-primary-50 text-primary-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{type.value}</span>
                </button>
              );
            })}
          </div>
          {errors.petType && <p className="mt-1 text-sm text-red-500">{errors.petType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            宠物品种 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={petInfo.petBreed}
            onChange={(e) => handleChange('petBreed', e.target.value)}
            placeholder="如：金毛、布偶猫、中华田园犬等"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
              errors.petBreed
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-primary-400'
            }`}
          />
          {errors.petBreed && <p className="mt-1 text-sm text-red-500">{errors.petBreed}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            宠物年龄（岁） <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            max="50"
            step="0.1"
            value={petInfo.petAge || ''}
            onChange={(e) => handleChange('petAge', parseFloat(e.target.value) || 0)}
            placeholder="请输入宠物年龄"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
              errors.petAge
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-primary-400'
            }`}
          />
          {errors.petAge && <p className="mt-1 text-sm text-red-500">{errors.petAge}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary-500" />
            症状描述
          </label>
          <textarea
            value={petInfo.petSymptoms}
            onChange={(e) => handleChange('petSymptoms', e.target.value)}
            placeholder="请详细描述宠物的症状，如：食欲不振、呕吐、精神萎靡、皮肤瘙痒等（选填）"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 transition-colors focus:outline-none resize-none"
          />
          <p className="mt-1 text-xs text-gray-400">详细的症状描述有助于医生提前了解病情</p>
        </div>
      </div>
    </div>
  );
};

export default StepPetInfo;
