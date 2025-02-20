<template>
  <div class="edit-exam-page min-h-screen bg-gray-100 p-4">
    <VanForm @submit="onSubmit" class="space-y-4">
      <!-- 基本信息卡片 -->
      <div
        class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300"
      >
        <h2 class="mb-4 text-lg font-bold text-gray-800">基本信息</h2>
        <div class="space-y-4">
          <VanField
            v-model="formData.description"
            name="description"
            label="考试名称"
            placeholder="请输入考试名称"
            :rules="[{ required: true, message: '请填写考试名称' }]"
          />

          <VanField
            v-model="formData.source"
            name="source"
            label="考试来源"
            placeholder="请输入考试来源"
          />

          <VanField
            v-model="formData.examDate"
            name="examDate"
            label="考试时间"
            placeholder="请选择考试时间"
            readonly
            @click="showDatePicker = true"
          />
        </div>
      </div>

      <!-- 考试详情卡片 -->
      <div
        class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300"
      >
        <h2 class="mb-4 text-lg font-bold text-gray-800">考试详情</h2>
        <div class="space-y-4">
          <VanField
            v-model="formData.totalTime"
            type="digit"
            name="totalTime"
            label="考试时长"
            placeholder="请输入考试时长（分钟）"
            :rules="[{ required: true, message: '请填写考试时长' }]"
          >
            <template #right-icon>
              <span class="text-gray-500">分钟</span>
            </template>
          </VanField>

          <VanField
            v-model="formData.totalScore"
            type="digit"
            name="totalScore"
            label="总分"
            placeholder="请输入考试总分"
            :rules="[{ required: true, message: '请填写考试总分' }]"
          >
            <template #right-icon>
              <span class="text-gray-500">分</span>
            </template>
          </VanField>

          <VanField
            v-model="formData.type"
            name="type"
            label="考试类型"
            placeholder="请选择考试类型"
            readonly
            @click="showTypePopup = true"
          />
        </div>
      </div>

      <!-- 学院专业信息卡片 -->
      <div
        class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300"
      >
        <h2 class="mb-4 text-lg font-bold text-gray-800">院系信息</h2>
        <div class="space-y-4">
          <VanField
            v-model="formData.institute"
            name="institute"
            label="学院"
            placeholder="请输入学院名称"
          />

          <VanField
            v-model="formData.major"
            name="major"
            label="专业"
            placeholder="请输入专业名称"
          />

          <VanField
            v-model="formData.grade"
            name="grade"
            label="年级"
            placeholder="请输入年级"
          />

          <VanField
            v-model="formData.term"
            name="term"
            label="学期"
            placeholder="请输入学期"
          />
        </div>
      </div>

      <!-- 其他信息卡片 -->
      <div
        class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300"
      >
        <h2 class="mb-4 text-lg font-bold text-gray-800">其他信息</h2>
        <VanField
          v-model="formData.tips"
          name="tips"
          label="考试提示"
          type="textarea"
          rows="3"
          placeholder="请输入考试提示信息"
        />
      </div>

      <!-- 操作按钮 -->
      <div
        class="fixed inset-x-0 bottom-0 z-10 flex space-x-6 bg-white px-6 py-4 shadow-lg"
      >
        <VanButton
          block
          type="primary"
          native-type="submit"
          :loading="isSubmitting"
          class="flex-1 !rounded-lg text-base font-medium"
        >
          保存修改
        </VanButton>
        <VanButton
          block
          type="default"
          @click="handleCancel"
          class="flex-1 !rounded-lg text-base font-medium"
        >
          取消编辑
        </VanButton>
      </div>
    </VanForm>
    <VanPopup v-model:show="showDatePicker" position="bottom">
      <DatePicker
        v-model="currentDate"
        :title="'选择日期'"
        :columns-type="['year', 'month', 'day']"
        :min-date="new Date(2020, 0, 1)"
        :max-date="new Date(2025, 11, 31)"
        @confirm="onConfirmDate"
        @cancel="showDatePicker = false"
      />
    </VanPopup>

    <VanPopup v-model:show="showTypePopup" position="bottom">
      <VanPicker
        :columns="examTypes"
        @confirm="onConfirmType"
        @cancel="showTypePopup = false"
      />
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast } from "vant";
import { GetExamInfoByExamCode, UpdateExamInfoApi } from "@/services";
import type { ExamManage } from "@/services";
import {
  Form as VanForm,
  Field as VanField,
  Button as VanButton,
  Popup as VanPopup,
  DatePicker,
  Picker as VanPicker,
} from "vant";

// 转换数据类型的工具函数
const convertToExamManage = (data: any): ExamManage => {
  return {
    examCode: data.examCode ? Number(data.examCode) : undefined,
    description: data.description || "",
    source: data.source || "",
    paperId: data.paperId ? Number(data.paperId) : undefined,
    examDate: data.examDate || "",
    totalTime: data.totalTime ? Number(data.totalTime) : undefined,
    grade: data.grade || "",
    term: data.term || "",
    major: data.major || "",
    institute: data.institute || "",
    totalScore: data.totalScore ? Number(data.totalScore) : undefined,
    type: data.type || "",
    tips: data.tips || "",
  };
};

// 使用路由参数而不是 props
const route = useRoute();
const router = useRouter();
const examCode = route.params.examCode;

// 表单数据初始化（使用可选链和类型断言确保类型安全）
const formData = ref<ExamManage>({
  examCode: undefined,
  description: "",
  source: "",
  paperId: undefined,
  examDate: "",
  totalTime: undefined,
  grade: "",
  term: "",
  major: "",
  institute: "",
  totalScore: undefined,
  type: "",
  tips: "",
});

const isSubmitting = ref(false);

const showTypePopup = ref(false);

// 修改日期相关的状态管理
const currentDate = ref<[string, string, string]>([
  String(new Date().getFullYear()),
  String(new Date().getMonth() + 1),
  String(new Date().getDate()),
]);

const showDatePicker = ref(false);

// 日期选择器确认处理
const onConfirmDate = ({ selectedOptions }: any) => {
  const [year, month, day] = selectedOptions;
  const formattedDate = `${year.value}-${String(month.value).padStart(2, "0")}-${String(day.value).padStart(2, "0")}`;
  formData.value.examDate = formattedDate;
  showDatePicker.value = false;
};

// 修改初始化数据函数中的日期处理
const initData = async () => {
  try {
    const { data } = await GetExamInfoByExamCode(Number(examCode));
    if (data) {
      const convertedData = convertToExamManage(data);

      // 处理日期初始化
      if (convertedData.examDate) {
        const date = new Date(convertedData.examDate);
        currentDate.value = [
          String(date.getFullYear()),
          String(date.getMonth() + 1),
          String(date.getDate()),
        ];
      }

      formData.value = convertedData;
    }
  } catch (error) {
    showToast({
      message: "加载数据失败",
      type: "fail",
    });
    router.back();
  }
};

// 考试类型选项
const examTypes = [
  { text: "期中考试", value: "期中考试" },
  { text: "期末考试", value: "期末考试" },
  { text: "单元测试", value: "单元测试" },
  { text: "模拟考试", value: "模拟考试" },
];

// 考试类型选择器确认
const onConfirmType = ({ selectedValues }: any) => {
  formData.value.type = selectedValues[0];
  showTypePopup.value = false;
};

// 提交表单
const onSubmit = async () => {
  isSubmitting.value = true;
  try {
    // 验证必填字段
    const requiredFields = {
      description: "考试名称",
      examDate: "考试时间",
      totalTime: "考试时长",
      totalScore: "考试总分",
    } as const;

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData.value[field as keyof typeof requiredFields]) {
        throw new Error(`${label}不能为空`);
      }
    }

    // 确保数据类型正确
    const submitData = convertToExamManage(formData.value);

    const { code } = await UpdateExamInfoApi(submitData);
    if (code === 200) {
      showToast({
        message: "保存成功",
        type: "success",
      });
      router.back();
    } else throw new Error("保存失败");
  } catch (error) {
    showToast({
      message: error instanceof Error ? error.message : "保存失败",
      type: "fail",
    });
  } finally {
    isSubmitting.value = false;
  }
};

// 取消编辑
const handleCancel = () => {
  router.back();
};

onMounted(() => {
  if (!examCode) {
    showToast({
      message: "考试编号不能为空",
      type: "fail",
    });
    router.back();
    return;
  }
  initData();
});
</script>

<style scoped>
/* 卡片悬浮效果 */
.transform {
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.transform:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 表单字段样式 */
:deep(.VanField__label) {
  color: #374151;
  font-weight: 500;
}

:deep(.VanField__control) {
  color: #1f2937;
}

/* 底部按钮固定定位的补偿空间 */
.edit-exam-page {
  padding-bottom: 100px;
}

/* DatePicker 样式调整 */
:deep(.van-picker) {
  background-color: white;
}

:deep(.van-picker__toolbar) {
  padding: 12px 16px;
}

:deep(.van-picker__title) {
  font-weight: 600;
}

/* 按钮样式调整 */
:deep(.van-button) {
  height: 44px;
  transition: all 0.3s ease;
}

:deep(.van-button:active) {
  transform: scale(0.98);
}

:deep(.van-button--primary) {
  background: #1989fa;
  border: none;
}

:deep(.van-button--default) {
  border: 1px solid #dcdee0;
}
</style>
