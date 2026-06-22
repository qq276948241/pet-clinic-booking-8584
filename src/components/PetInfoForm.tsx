import { PawPrint, Dog, CalendarDays, FileText } from 'lucide-react';

export interface PetInfoFormData {
  petName: string;
  petType: string;
  petBreed: string;
  petAge: string;
  symptoms: string;
}

interface PetInfoFormProps {
  data: PetInfoFormData;
  onChange: (data: PetInfoFormData) => void;
}

const petTypes = ['狗狗', '猫咪', '兔子', '仓鼠', '鸟类', '其他'];

export default function PetInfoForm({ data, onChange }: PetInfoFormProps) {
  const update = (field: keyof PetInfoFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">填写宠物信息</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <PawPrint className="w-4 h-4 inline mr-1" />
            宠物名称 *
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="请输入宠物名称"
            value={data.petName}
            onChange={(e) => update('petName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Dog className="w-4 h-4 inline mr-1" />
            宠物类型 *
          </label>
          <select
            className="input-field"
            value={data.petType}
            onChange={(e) => update('petType', e.target.value)}
          >
            {petTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            品种 *
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="如：金毛、英短、荷兰猪..."
            value={data.petBreed}
            onChange={(e) => update('petBreed', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CalendarDays className="w-4 h-4 inline mr-1" />
            年龄 *
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="如：2岁、6个月"
            value={data.petAge}
            onChange={(e) => update('petAge', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 inline mr-1" />
          症状描述 *
        </label>
        <textarea
          className="input-field min-h-[120px] resize-y"
          placeholder="请详细描述宠物的症状或就诊原因，以便医生提前了解情况..."
          value={data.symptoms}
          onChange={(e) => update('symptoms', e.target.value)}
        />
      </div>
    </div>
  );
}
