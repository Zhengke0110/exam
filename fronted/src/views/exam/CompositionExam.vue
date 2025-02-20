<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <div class="mx-auto max-w-md transform rounded-xl bg-white p-4 shadow-lg">
      <!-- 标题区域 -->
      <div class="mb-6 text-center">
        <h2 class="text-xl font-bold text-gray-800">在线组卷</h2>
        <p class="mt-1 text-sm text-gray-600">{{ examName }}</p>
      </div>

      <!-- 表单区域 -->
      <Form @submit="onSubmit" class="space-y-6">
        <CellGroup inset class="overflow-hidden rounded-lg">
          <Field
            v-model="formData.changeNumber"
            name="changeNumber"
            label="选择题"
            type="digit"
            placeholder="请输入数量"
            :rules="[{ required: true, message: '请输入选择题数量' }]"
            class="form-field"
          >
            <template #right-icon>
              <van-icon name="question-o" class="text-gray-400" />
            </template>
          </Field>
          <Field
            v-model="formData.judgeNumber"
            name="judgeNumber"
            label="判断题"
            type="digit"
            placeholder="请输入数量"
            :rules="[{ required: true, message: '请输入判断题数量' }]"
          >
            <template #right-icon>
              <van-icon name="balance-o" class="text-gray-400" />
            </template>
          </Field>
          <Field
            v-model="formData.fillNumber"
            name="fillNumber"
            label="填空题"
            type="digit"
            placeholder="请输入数量"
            :rules="[{ required: true, message: '请输入填空题数量' }]"
          >
            <template #right-icon>
              <van-icon name="edit" class="text-gray-400" />
            </template>
          </Field>
        </CellGroup>

        <!-- 提交按钮 -->
        <div class="mt-8 flex justify-center">
          <van-button
            type="primary"
            native-type="submit"
            size="large"
            class="submit-btn !h-11 !w-full !max-w-[280px] !rounded-full text-base font-medium"
            :loading="loading"
          >
            {{ loading ? "正在生成试卷..." : "开始生成" }}
          </van-button>
        </div>
      </Form>
    </div>

    <!-- 加载动画 -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showSuccess"
        class="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black"
      >
        <div
          class="rounded-lg bg-white p-6 text-center shadow-xl"
          @click="handleSuccessClick"
        >
          <van-icon name="success" class="mb-4 text-6xl text-green-500" />
          <p class="text-lg font-semibold text-gray-800">试卷生成成功！</p>
          <p class="mt-2 text-sm text-gray-600">点击任意处关闭</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  Form,
  Field,
  CellGroup,
  Button as vanButton,
  Icon as vanIcon,
  showToast,
} from "vant";
import { useRouter } from "vue-router";
import { SetExamAndAnswerApi } from "@/services";
import type { Item } from "@/services";

// 定义props
const { examCode, examName } = defineProps<{
  examCode: string;
  examName: string;
}>();

const router = useRouter();
const loading = ref(false);
const showSuccess = ref(false);

// 表单数据
const formData = reactive({
  changeNumber: "10",
  judgeNumber: "10",
  fillNumber: "10",
});

// 提交表单
const onSubmit = async () => {
  loading.value = true;
  try {
    const params: Item = {
      changeNumber: Number(formData.changeNumber),
      judgeNumber: Number(formData.judgeNumber),
      fillNumber: Number(formData.fillNumber),
      paperId: Number(examCode),
      subject: examName,
    };

    const { code } = await SetExamAndAnswerApi(params);
    if (code !== 200) throw new Error("生成失败");

    showSuccess.value = true;
    showToast({
      message: "试卷生成成功",
      type: "success",
    });
  } catch (error) {
    showToast({
      message: "生成失败，请重试",
      type: "fail",
    });
  } finally {
    loading.value = false;
  }
};

// 处理成功动画点击
const handleSuccessClick = () => {
  showSuccess.value = false;
  router.back();
};
</script>

<style scoped>
.submit-btn {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 表单字段样式优化 */
:deep(.van-cell) {
  background-color: #f8fafc;
  padding: 12px 16px;
  margin-bottom: 1px;
  align-items: center;
}

:deep(.van-cell:first-child) {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

:deep(.van-cell:last-child) {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-bottom: 0;
}

:deep(.van-field__label) {
  color: #475569;
  font-weight: 500;
  font-size: 0.9rem;
  width: 4rem !important;
  flex: none !important;
  white-space: nowrap;
}

:deep(.van-field__value) {
  flex: 1;
  min-width: 0;
}

:deep(.van-cell__value) {
  flex: 1;
  padding-left: 8px;
}

:deep(.van-field__control) {
  color: #1e293b;
  font-size: 0.9rem;
  height: 24px;
  padding: 0;
}

:deep(.van-field__right-icon) {
  margin: 0;
  font-size: 1.1rem;
  color: #94a3b8;
}

/* 输入框动画优化 */
:deep(.van-field__control) {
  transition: none;
}

:deep(.van-field__control:focus) {
  transform: none;
}

/* 表单组样式 */
:deep(.van-cell-group) {
  margin: 0 -1px;
  border: 1px solid #e2e8f0;
  background-color: white;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 提交按钮样式优化 */
.submit-btn {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 加载中状态样式 */
:deep(.van-button--loading) {
  opacity: 0.9;
}

/* 错误提示样式 */
:deep(.van-field__error-message) {
  font-size: 0.75rem;
  margin-top: 2px;
}

/* 动画过渡优化 */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
