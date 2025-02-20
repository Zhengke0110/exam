<template>
  <div class="mx-auto max-w-3xl p-4">
    <div v-if="answerInfo" class="space-y-6">
      <!-- Question Header -->
      <div class="flex items-center space-x-3">
        <Tag :type="getTypeColor(answerInfo.type)" size="medium">
          {{ answerInfo.type }}
        </Tag>
        <span class="text-lg font-bold text-gray-800">{{
          answerInfo.subject
        }}</span>
      </div>

      <!-- Question Content -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div class="mb-4 text-base text-gray-700">
          {{ answerInfo.question }}
        </div>

        <!-- Choice Question -->
        <template v-if="answerInfo.type === AnswerType.SINGLE">
          <div class="space-y-3">
            <div
              v-for="(option, key) in options"
              :key="key"
              :class="[
                'flex cursor-pointer items-center rounded-lg border p-3 transition-all',
                getOptionClass(key),
              ]"
              @click="selectedAnswer = key"
            >
              <Radio :name="key" :modelValue="selectedAnswer === key">
                <span class="ml-2"> {{ key }}. {{ option }} </span>
              </Radio>
            </div>
          </div>
        </template>

        <!-- Judge Question -->
        <template v-if="answerInfo.type === AnswerType.JUDGE">
          <div class="flex space-x-4">
            <div
              v-for="option in ['正确', '错误']"
              :key="option"
              :class="[
                'flex-1 cursor-pointer rounded-lg border p-4 text-center transition-all',
                getJudgeClass(option),
              ]"
              @click="selectedAnswer = option"
            >
              <Radio :name="option" :modelValue="selectedAnswer === option">
                {{ option }}
              </Radio>
            </div>
          </div>
        </template>

        <!-- Fill Question -->
        <template v-if="answerInfo.type === AnswerType.FILL">
          <Field
            v-model="fillAnswer"
            disabled
            type="textarea"
            rows="3"
            placeholder="请输入答案"
            class="rounded-lg border-gray-300"
          />
        </template>
      </div>

      <!-- Answer Analysis -->
      <div class="overflow-hidden rounded-lg border border-blue-100 bg-blue-50">
        <div class="border-b border-blue-100 bg-blue-100 p-3">
          <span class="font-bold text-blue-800">答案解析</span>
        </div>
        <div class="p-4">
          <div class="mb-2 flex items-center space-x-2">
            <span class="font-medium">正确答案：</span>
            <span class="text-green-600">
              {{
                answerInfo.type === AnswerType.SINGLE
                  ? answerInfo.rightAnswer
                  : answerInfo.type === AnswerType.JUDGE
                    ? formatJudgeAnswer
                    : answerInfo.answer
              }}
            </span>
          </div>
          <div class="text-gray-600">
            <span class="font-medium">解析：</span>
            {{ answerInfo.analysis || "暂无解析" }}
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div
        class="flex items-center justify-between rounded-lg bg-gray-50 p-4 text-sm"
      >
        <div class="flex items-center space-x-4">
          <Tag plain type="warning">难度 {{ answerInfo.level }}</Tag>
          <Tag plain type="primary">分值 {{ answerInfo.score }}分</Tag>
        </div>
        <div v-if="answerInfo.section" class="text-gray-500">
          章节：{{ answerInfo.section }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetAnswerInfoApi } from "@/services";
import type { AnswerDetail } from "@/services";
import { AnswerType } from "@/services";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Radio, Tag, Field } from "vant";

const route = useRoute();
const answerInfo = ref<AnswerDetail>();
const selectedAnswer = ref("");
const fillAnswer = ref("");

// 计算选项
const options = computed(() => {
  if (!answerInfo.value) return {};
  return {
    A: answerInfo.value.answerA,
    B: answerInfo.value.answerB,
    C: answerInfo.value.answerC,
    D: answerInfo.value.answerD,
  };
});

// 获取题型对应的颜色
const getTypeColor = (
  type: string,
): "default" | "primary" | "success" | "warning" | "danger" => {
  const typeColors: Record<
    string,
    "default" | "primary" | "success" | "warning" | "danger"
  > = {
    [AnswerType.SINGLE]: "primary",
    [AnswerType.JUDGE]: "success",
    [AnswerType.FILL]: "warning",
  };
  return typeColors[type] || "default";
};

// 获取选项样式
const getOptionClass = (key: string) => {
  if (!answerInfo.value?.rightAnswer)
    return "border-gray-200 hover:border-blue-400";

  if (key === answerInfo.value.rightAnswer) {
    return "border-green-500 bg-green-50";
  }
  return selectedAnswer.value === key
    ? "border-red-500 bg-red-50"
    : "border-gray-200";
};

// 获取判断题样式
const getJudgeClass = (option: string) => {
  if (!answerInfo.value?.answer) return "border-gray-200 hover:border-blue-400";

  const correctAnswer = answerInfo.value.answer === "T" ? "正确" : "错误";

  if (option === correctAnswer) {
    return "border-green-500 bg-green-50";
  }
  return selectedAnswer.value === option
    ? "border-red-500 bg-red-50"
    : "border-gray-200";
};

// Answer显示转换
const formatJudgeAnswer = computed(() => {
  if (!answerInfo.value?.answer) return "";
  return answerInfo.value.answer === "T" ? "正确" : "错误";
});

onMounted(async () => {
  const { id, type } = route.query;
  if (id && type) {
    const { data } = await GetAnswerInfoApi(id as string, type as string);
    answerInfo.value = Array.isArray(data) ? data[0] : data;
  }
});
</script>

<style scoped>
.van-radio {
  width: 100%;
}
.van-radio__label {
  flex: 1;
}
</style>
