<template>
  <div class="mx-auto max-w-4xl p-4">
    <Form @submit="onSubmit" class="space-y-6">
      <!-- Question Header -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          v-model="formData.type"
          is-link
          readonly
          name="type"
          label="题目类型"
          placeholder="请选择题目类型"
          @click="showTypePicker = true"
          class="w-full"
        />
        <Field
          v-model="formData.subject"
          name="subject"
          label="科目"
          placeholder="请输入科目"
          :rules="[{ required: true, message: '请输入科目' }]"
          class="w-full"
        />
      </div>

      <!-- Question Content -->
      <div
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <Field
          v-model="formData.question"
          type="textarea"
          name="question"
          label="题目内容"
          placeholder="请输入题目内容"
          rows="3"
          class="mb-4 min-h-[100px]"
          :rules="[{ required: true, message: '请输入题目内容' }]"
        />

        <!-- Choice Question -->
        <transition-group
          v-if="formData.type === AnswerType.SINGLE"
          name="list"
          class="space-y-4"
          tag="div"
        >
          <div
            v-for="option in ['A', 'B', 'C', 'D']"
            :key="`option-${option}`"
            class="w-full"
          >
            <div
              :class="[
                'flex cursor-pointer items-start space-x-3 rounded-lg border p-3 transition-all',
                formData.rightAnswer === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300',
              ]"
              @click="handleOptionClick(option)"
            >
              <div
                :class="[
                  'mt-1 flex h-6 w-6 items-center justify-center rounded-full transition-colors',
                  formData.rightAnswer === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-100 text-blue-600',
                ]"
              >
                {{ option }}
              </div>
              <Field
                v-model="formData[`answer${option}` as keyof typeof formData]"
                :name="`answer${option}`"
                placeholder="请输入选项内容"
                :rules="[{ required: true, message: `请输入选项${option}` }]"
                class="flex-1"
                @click.stop
              />
            </div>
          </div>
          <div key="right-answer" class="mt-4 border-t border-gray-100 pt-4">
            <Field
              v-model="formData.rightAnswer"
              name="rightAnswer"
              label="正确答案"
              placeholder="请输入正确答案（A/B/C/D）"
              readonly
              class="w-full"
              :rules="[{ required: true, message: '请选择正确答案' }]"
            />
          </div>
        </transition-group>

        <!-- Judge Question -->
        <div v-if="formData.type === AnswerType.JUDGE" class="mt-4">
          <RadioGroup v-model="formData.answer" class="w-full">
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="option in [
                  { label: '正确', value: 'T' },
                  { label: '错误', value: 'F' },
                ]"
                :key="option.value"
              >
                <Radio
                  :name="option.value"
                  :value="option.value"
                  class="flex h-12 w-full items-center justify-center rounded-lg border transition-all hover:border-blue-400"
                >
                  {{ option.label }}
                </Radio>
              </div>
            </div>
          </RadioGroup>
        </div>

        <!-- Fill Question -->
        <div v-if="formData.type === AnswerType.FILL" class="mt-4">
          <Field
            v-model="formData.answer"
            type="textarea"
            name="answer"
            label="答案"
            placeholder="请输入答案"
            rows="3"
            class="min-h-[100px] w-full"
            :rules="[{ required: true, message: '请输入答案' }]"
          />
        </div>
      </div>

      <!-- Analysis Section -->
      <div
        class="rounded-lg border border-blue-100 bg-blue-50 transition-all duration-300 hover:shadow-md"
      >
        <div class="border-b border-blue-100 bg-blue-100 p-3">
          <span class="font-bold text-blue-800">答案解析</span>
        </div>
        <div class="p-4">
          <Field
            v-model="formData.analysis"
            type="textarea"
            name="analysis"
            placeholder="请输入答案解析"
            rows="3"
            class="min-h-[100px] w-full"
          />
        </div>
      </div>

      <!-- Additional Info -->
      <div class="rounded-lg bg-gray-50 p-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Field
            v-model="formData.level"
            name="level"
            label="难度"
            placeholder="请输入难度等级"
            class="w-full"
          />
          <Field
            v-model="formData.score"
            type="number"
            name="score"
            label="分值"
            placeholder="请输入分值"
            class="w-full"
            :rules="[{ required: true, message: '请输入分值' }]"
          />
          <Field
            v-model="formData.section"
            name="section"
            label="章节"
            placeholder="请输入所属章节"
            class="w-full"
          />
        </div>
      </div>

      <!-- 按钮组 -->
      <div
        class="sticky right-0 bottom-0 left-0 z-10 bg-white px-4 py-4 shadow-lg"
      >
        <div class="mx-auto max-w-4xl">
          <div class="flex items-center justify-end">
            <Button plain type="default" @click="onReset" class="reset-button">
              重置
            </Button>
            <Button type="primary" native-type="submit" class="submit-button">
              提交
            </Button>
          </div>
        </div>
      </div>
    </Form>

    <!-- Type Picker -->
    <Popup v-model:show="showTypePicker" position="bottom" round>
      <Picker
        :columns="
          Object.values(AnswerType).map((type) => ({ text: type, value: type }))
        "
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  Form,
  Field,
  Button,
  Radio,
  RadioGroup,
  Popup,
  Picker,
  showToast,
} from "vant";
import type { AnswerDetail } from "@/services";
import { AnswerType } from "@/services";

const showTypePicker = ref(false);
const formData = reactive<Partial<AnswerDetail>>({
  type: "",
  subject: "",
  question: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
  rightAnswer: "",
  answer: "",
  analysis: "",
  score: 0,
  section: "",
  level: "",
});

const onTypeConfirm = ({ selectedValues }: any) => {
  formData.type = selectedValues[0];
  showTypePicker.value = false;
};

const onSubmit = (values: Partial<AnswerDetail>) => {
  console.log("提交的数据：", values);
  showToast("提交成功");
};

const onReset = () => {
  Object.keys(formData).forEach((key) => {
    const k = key as keyof typeof formData;
    if (k === "score") {
      formData[k] = 0;
    } else {
      formData[k] = "";
    }
  });
};

const handleOptionClick = (option: string) => {
  formData.rightAnswer = option;
};
</script>

<style scoped>
/* 保持与EditAnswer.vue相同的样式 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Override Vant styles */
:deep(.van-field__control) {
  min-height: 24px;
  line-height: 1.5;
  word-break: break-all;
}

:deep(.van-radio) {
  width: 100%;
  height: 100%;
}

:deep(.van-radio__label) {
  width: 100%;
  text-align: center;
}

:deep(.van-field__label) {
  width: 5em;
  color: #666;
}

:deep(.van-cell) {
  padding: 12px 16px;
  background-color: white;
  border-radius: 8px;
}

:deep(.van-button) {
  margin: 0 !important;
}

:deep(.van-button--default[plain]) {
  margin-right: 24px !important;
}

.sticky .flex {
  gap: 24px !important;
}

:deep(.van-button) {
  min-width: 140px !important;
  height: 44px !important;
  font-size: 16px !important;
  transition: all 0.3s ease !important;
}

/* 确保底部有足够空间显示固定按钮 */
.space-y-6 {
  padding-bottom: 80px;
}
</style>
