interface StepContactProps {
  contactInfo: {
    ownerName: string;
    phone: string;
    notes: string;
  };
  onContactChange: (info: Partial<StepContactProps['contactInfo']>) => void;
  errors?: Record<string, string>;
  onErrorsChange?: (errors: Record<string, string>) => void;
  showSummary?: boolean;
  summary?: React.ReactNode;
}

const StepContact = ({
  contactInfo,
  onContactChange,
  errors = {},
  onErrorsChange,
  showSummary,
  summary,
}: StepContactProps) => {
  const handleChange = (field: keyof StepContactProps['contactInfo'], value: string) => {
    onContactChange({ [field]: value });
    if (errors[field] && onErrorsChange) {
      const newErrors = { ...errors };
      delete newErrors[field];
      onErrorsChange(newErrors);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">填写联系人信息</h2>
      <p className="text-gray-500 mb-6">请填写您的联系方式，方便我们与您沟通</p>
      {showSummary && summary}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            联系人姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={contactInfo.ownerName}
            onChange={(e) => handleChange('ownerName', e.target.value)}
            placeholder="请输入您的姓名"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
              errors.ownerName
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-primary-400'
            }`}
          />
          {errors.ownerName && <p className="mt-1 text-sm text-red-500">{errors.ownerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            联系电话 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="请输入您的手机号"
            maxLength={11}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
              errors.phone
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-primary-400'
            }`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">备注信息</label>
          <textarea
            value={contactInfo.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="其他需要说明的信息（选填）"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 transition-colors focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default StepContact;
