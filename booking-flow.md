# 宠物医院预约挂号流程说明

本文档详细描述预约挂号功能从「选科室」到「提交预约」的完整业务流程、组件协作关系以及 Zustand 状态流转机制。

---

## 一、整体流程图

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Booking.tsx (页面容器)                         │
│  负责：步骤切换、表单验证、提交预约、成功弹窗                            │
└─────────────┬───────────────────────┬───────────────────────────────┘
              │                       │
              ▼                       ▼
    ┌─────────────────┐     ┌─────────────────────┐
    │ StepIndicator   │     │  步骤内容区 (5 个步骤)│
    │ (步骤进度条)    │     └─────────────────────┘
    └─────────────────┘                       │
                                              ▼
                    ┌───────────────────────────────────────────┐
                    │         5 个步骤组件依次渲染                  │
                    └─────────┬──────────┬──────────┬──────────┬─────────┘
                              │          │          │          │
                              ▼          ▼          ▼          ▼          ▼
                      StepDepartment StepDoctor  StepTime   StepPetInfo StepContact
                      (选科室)      (选医生)    (选时间)    (宠物信息)  (联系人)
                              │          │          │          │          │
                              └──────────┴──────────┴──────────┴──────────┘
                                                   │
                                                   ▼
                                    ┌────────────────────────┐
                                    │ useBookingStore (全局) │
                                    │  Zustand + localStorage │
                                    └────────────────────────┘
```

---

## 二、页面入口：Booking.tsx

文件位置：`src/pages/Booking.tsx`

Booking 页面是整个预约流程的**容器和调度中心**，自身不渲染具体业务内容，只负责：

| 职责 | 实现方式 |
|------|----------|
| 步骤状态管理 | `useState(0)` 维护 `currentStep`（0~4） |
| 步骤切换 | `handleNext()` / `handlePrev()` 控制 `currentStep` |
| 进入下一页判断 | `canProceed()` 根据当前步骤检查数据是否齐全 |
| 表单验证 | `validateStep3()` 验证宠物信息、`validateStep4()` 验证联系人 |
| 提交预约 | `handleNext()` 在最后一步调用 `addAppointment()` |
| 成功后跳转 | `handleSuccessClose()` 重置状态并跳转「我的预约」 |
| 局部状态 | `contactInfo`（联系人姓名/电话/备注）、`errors`（校验错误）、`showSuccess`（弹窗开关） |

### 核心代码片段

```typescript
const [currentStep, setCurrentStep] = useState(0);        // 当前步骤
const [contactInfo, setContactInfo] = useState({...});    // 联系人信息(局部)
const [errors, setErrors] = useState<Record<string,string>>({});
const [showSuccess, setShowSuccess] = useState(false);

// 根据步骤渲染对应组件
const renderStepContent = () => {
  switch (currentStep) {
    case 0: return <StepDepartment onNext={handleQuickNext} />;
    case 1: return <StepDoctor />;
    case 2: return <StepTime onNext={handleQuickNext} />;
    case 3: return <StepPetInfo errors={errors} onErrorsChange={setErrors} />;
    case 4: return <StepContact contactInfo={contactInfo} ... />;
  }
};
```

> 💡 组件通过 `onNext` 回调通知 Booking 切到下一步，这样选择权在父组件，子组件不耦合路由逻辑。

---

## 三、5 个步骤组件详解

所有步骤组件都放在 `src/components/` 目录下，命名以 `Step` 开头。

### 3.1 StepDepartment — 选择科室

文件：`src/components/StepDepartment.tsx`

```
用户点击科室卡片
       │
       ▼
StepDepartment.handleSelect(dept)
       │
       ├─ 1. setSelectedDepartment(dept)   // 写入 Zustand
       └─ 2. 如果是新选择 → setTimeout(onNext, 200)  // 通知父组件切下一步
```

- 渲染 8 个科室卡片网格（3 列）
- 科室卡片高亮选中状态（蓝色边框+浅蓝背景）
- 选择后自动进入下一步（给 200ms 视觉反馈延迟）

### 3.2 StepDoctor — 选择医生

文件：`src/components/StepDoctor.tsx`

```
用户点击医生卡片
       │
       ▼
StepDoctor.handleSelect(doctor)
       │
       ├─ 1. setSelectedDoctor(doctor)     // 写入 Zustand
       └─ 2. 如果是新选择 → setTimeout(onNext, 200)
```

- 根据 `selectedDepartment.id` 过滤出对应科室的医生
- 医生卡片展示：头像、姓名、职称、经验年数、擅长领域
- 右侧圆形勾选标识选中状态

### 3.3 StepTime — 选择时间

文件：`src/components/StepTime.tsx`（内部使用 TimeSlotPicker）

```
TimeSlotPicker 包含两个子区域：
┌──────────────────────────────────┐
│  日期选择（横向滚动，7 天）         │  → 点击 → setSelectedDate(date)
├──────────────────────────────────┤
│  时间段选择（上午/下午分组）        │  → 点击可用时段 → setSelectedTimeSlot(slot)
└──────────────────────────────────┘
       │
       ▼
用户选好后点击「确认并继续」→ onNext()
```

- 日期：展示未来 7 天（今天/周几/日期/月份）
- 时段：按上午/下午分组，3~6 列网格，已约满显示灰色+删除线
- 选中后展示「已选择：2026-06-23 09:00-09:30」提示并出现确认按钮

### 3.4 StepPetInfo — 填写宠物信息

文件：`src/components/StepPetInfo.tsx`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| petName | string | ✅ | 宠物名字 |
| petType | string | ✅ | 宠物类型（狗狗/猫咪/兔子/鸟类/鱼类/其他，6个图标按钮） |
| petBreed | string | ✅ | 宠物品种（如金毛、布偶猫） |
| petAge | number | ✅ | 宠物年龄（岁，支持小数） |
| petSymptoms | string | ❌ | 症状描述（多行文本） |

- 数据直接写入 Zustand：`setPetInfo({ [field]: value })`
- 错误信息由父组件 Booking 传入并展示

### 3.5 StepContact — 填写联系人信息

文件：`src/components/StepContact.tsx`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ownerName | string | ✅ | 联系人姓名 |
| phone | string | ✅ | 手机号（正则校验：1[3-9]\d{9}） |
| notes | string | ❌ | 备注信息 |

- 数据保存在 Booking 的局部 `contactInfo` state（通过 props 双向传递）
- 顶部展示预约摘要卡片（科室/医生/时间/宠物信息回顾）

---

## 四、Zustand 状态流转详解

### 4.1 Store 结构

文件：`src/store/useBookingStore.ts`

```typescript
interface BookingState {
  // ===== 选择流程中的中间状态（不持久化）=====
  selectedDepartment: Department | null;   // 步骤1
  selectedDoctor: Doctor | null;           // 步骤2
  selectedDate: string | null;             // 步骤3
  selectedTimeSlot: TimeSlot | null;       // 步骤3
  petInfo: PetInfo;                        // 步骤4

  // ===== 最终结果（持久化到 localStorage）=====
  appointments: Appointment[];             // 提交后存入

  // ===== 操作方法 =====
  setSelectedDepartment / setSelectedDoctor / setSelectedDate
  setSelectedTimeSlot / setPetInfo
  addAppointment / cancelAppointment
  resetSelection
}
```

> ⚠️ 只有 `appointments` 数组通过 Zustand persist 中间件持久化到 `localStorage`，流程中间状态刷新页面会重置（符合用户预期）。

### 4.2 状态流转链路

```
Step 0: StepDepartment
   │  user clicks "内科"
   ▼
selectedDepartment = { id: "dept-001", name: "内科", ... }
   │
   ▼ 自动进入 Step 1

Step 1: StepDoctor
   │  user clicks "张医生"
   ▼
selectedDoctor = { id: "doc-001", name: "张医生", deptId: "dept-001", ... }
   │
   ▼ 自动进入 Step 2

Step 2: StepTime
   │  user picks date "2026-06-24"
   ▼
selectedDate = "2026-06-24"
   │  user picks time "09:00-09:30"
   ▼
selectedTimeSlot = { id: "...", date: "2026-06-24", time: "09:00-09:30", available: true }
   │
   ▼ 手动点击「确认并继续」进入 Step 3

Step 3: StepPetInfo
   │  user fills form
   ▼
petInfo = { petName: "小白", petType: "狗狗", petBreed: "金毛", petAge: 3, petSymptoms: "呕吐" }
   │
   ▼ 点击「下一步」→ Booking.validateStep3() 通过 → Step 4

Step 4: StepContact
   │  user fills form (数据存在 Booking 局部 state)
   │  contactInfo = { ownerName: "李女士", phone: "13800138000", notes: "" }
   │
   ▼ 点击「提交预约」→ Booking.validateStep4() 通过
   │
   ▼
addAppointment({
  departmentId: "dept-001",
  doctorId: "doc-001",
  date: "2026-06-24",
  time: "09:00-09:30",
  petName: "小白", petType: "狗狗", petBreed: "金毛", petAge: 3, petSymptoms: "呕吐",
  ownerName: "李女士", phone: "13800138000", notes: "",
})
   │
   ▼
appointments.prepend({
  id: "1782152441000",       // Date.now()
  status: "pending",
  createdAt: "2026-06-23T10:00:00.000Z",
  ...上面的所有字段
})
   │
   ▼ persist → localStorage.setItem("pet-hospital-storage", ...)
   │
   ▼ 显示成功弹窗 → 点击「查看我的预约」
   │
   ▼ resetSelection() 清空所有中间状态 → navigate("/my-appointments")
```

### 4.3 级联清空规则（重要）

为了保证数据一致性，选择上游步骤时会自动清空下游依赖：

```
setSelectedDepartment(newDept)
  └─ 如果 dept 变了 → 清空 selectedDoctor, selectedDate, selectedTimeSlot

setSelectedDoctor(newDoctor)
  └─ 如果 doctor 变了 → 清空 selectedTimeSlot

setSelectedDate(newDate)
  └─ 如果 date 变了 → 清空 selectedTimeSlot
```

> 💡 所有 setter 都有**等值判断**：如果新值和旧值相同（比如用户重复点击已选中的科室），直接 `return {}` 跳过更新，**不会触发级联清空**，避免误操作丢数据。

---

## 五、组件协作关系总览

```
┌─────────────────────────────────────────────────────────────────┐
│                          Booking.tsx                             │
│  ┌──────────┐  currentStep  ┌──────────────┐                    │
│  │ useState │ ───────────►  │ renderStep   │                    │
│  └──────────┘               └──────┬───────┘                    │
│         ▲                          │                             │
│         │ handleNext/Prev          │ 渲染                        │
│  ┌──────┴──────────────────────────▼──────┐                     │
│  │    StepDepartment / StepDoctor / ...   │ ◄── onNext 回调 ───┐ │
│  └───────────────────┬───────────────────┘                     │ │
│                      │                                          │ │
│          读/写 Zustand 状态                                      │ │
│                      │                                          │ │
└──────────────────────┼──────────────────────────────────────────┘ │
                       ▼                                            │
           ┌──────────────────────────────┐                         │
           │      useBookingStore         │                         │
           │  selectedDepartment          │                         │
           │  selectedDoctor              │                         │
           │  selectedDate / TimeSlot     │                         │
           │  petInfo                     │                         │
           │  appointments ──► localStorage│ ── addAppointment() ───┘
           └──────────────────────────────┘
```

### 关键设计原则

1. **单向数据流**：子组件通过 `onNext` 等回调通知父组件，不直接控制步骤
2. **状态分层**：跨步骤共享的数据（科室/医生/时间/宠物）放 Zustand；只在最后一步用的联系人信息放 Booking 局部 state
3. **展示与逻辑分离**：DepartmentCard/DoctorCard 是纯展示组件（接收 isSelected + onClick），不直接操作 store
4. **防御性更新**：setter 方法先判断值是否变化，避免重复触发导致数据丢失

---

## 六、文件索引

| 文件 | 路径 | 职责 |
|------|------|------|
| Booking 页面 | `src/pages/Booking.tsx` | 步骤调度、验证、提交 |
| StepDepartment | `src/components/StepDepartment.tsx` | 选择科室 |
| StepDoctor | `src/components/StepDoctor.tsx` | 选择医生 |
| StepTime | `src/components/StepTime.tsx` | 选择时间（包裹 TimeSlotPicker） |
| StepPetInfo | `src/components/StepPetInfo.tsx` | 填写宠物信息 |
| StepContact | `src/components/StepContact.tsx` | 填写联系人信息 |
| StepIndicator | `src/components/StepIndicator.tsx` | 顶部步骤进度条 |
| DepartmentCard | `src/components/DepartmentCard.tsx` | 科室卡片（纯展示） |
| DoctorCard | `src/components/DoctorCard.tsx` | 医生卡片（纯展示） |
| TimeSlotPicker | `src/components/TimeSlotPicker.tsx` | 日期+时间段选择器 |
| Zustand Store | `src/store/useBookingStore.ts` | 全局状态管理 |
| 类型定义 | `src/types/index.ts` | Department / Doctor / TimeSlot / PetInfo / Appointment / BookingState |
| Mock 数据 | `src/data/mockData.ts` | 科室、医生、日期时段的模拟数据 |
