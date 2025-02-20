<template>
  <div class="pb-safe min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <NavBar
      title="考试结果"
      left-arrow
      fixed
      placeholder
      @click-left="router.back()"
    />

    <!-- 成绩概览卡片 -->
    <div class="mx-4 mt-4">
      <div class="overflow-hidden rounded-xl bg-white shadow-sm">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h2 class="mb-4 text-xl font-bold">{{ examInfo?.description }}</h2>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">得分</p>
              <p class="text-3xl font-bold">
                {{ examResult?.score
                }}<span class="text-lg">/{{ examResult?.totalScore }}</span>
              </p>
            </div>
            <Circle
              :current-rate="correctRate"
              :rate="100"
              color="#ffffff"
              size="64px"
              stroke-width="6"
            >
              <span class="text-sm">{{ correctRate }}%</span>
            </Circle>
          </div>
        </div>

        <div class="grid grid-cols-3 divide-x divide-gray-100 border-t">
          <div class="p-4 text-center">
            <p class="text-sm text-gray-500">总题数</p>
            <p class="mt-1 text-lg font-semibold">
              {{ examResult?.totalCount }}
            </p>
          </div>
          <div class="p-4 text-center">
            <p class="text-sm text-gray-500">正确数</p>
            <p class="mt-1 text-lg font-semibold">
              {{ examResult?.correctCount }}
            </p>
          </div>
          <div class="p-4 text-center">
            <p class="text-sm text-gray-500">错题数</p>
            <p class="mt-1 text-lg font-semibold text-red-500">
              {{ examResult?.wrongQuestions.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 错题分析 -->
    <div class="mx-4 mt-6">
      <Collapse v-model="activeCollapse">
        <CollapseItem
          v-for="(question, index) in examResult?.wrongQuestions"
          :key="index"
          :title="`第${index + 1}题 - ${question.type}`"
          :name="index"
        >
          <div class="space-y-4">
            <div class="text-base">{{ question.question }}</div>

            <div class="rounded-lg bg-red-50 p-3">
              <p class="text-sm text-red-600">
                <span class="font-medium">你的答案：</span>
                {{ question.yourAnswer }}
              </p>
            </div>

            <div class="rounded-lg bg-green-50 p-3">
              <p class="text-sm text-green-600">
                <span class="font-medium">正确答案：</span>
                {{ question.rightAnswer }}
              </p>
            </div>

            <div v-if="question.analysis" class="rounded-lg bg-blue-50 p-3">
              <p class="text-sm text-blue-600">
                <span class="font-medium">解析：</span>
                {{ question.analysis }}
              </p>
            </div>
          </div>
        </CollapseItem>
      </Collapse>
    </div>

    <!-- 底部按钮 -->
    <div class="shadow-up fixed inset-x-0 bottom-0 bg-white p-4">
      <div class="flex space-x-4">
        <!-- <Button block plain @click="router.push('/exercises')">
          错题练习
        </Button> -->
        <Button block type="primary" @click="router.push('/student-exam')">
          返回列表
        </Button>
      </div>
      <div class="safe-area-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NavBar, Circle, Collapse, CollapseItem, Button } from "vant";
import type { ExamResult, WrongQuestion } from "@/types/exam";
import { GetExamInfoApi } from "@/services";
import type { ExamManage } from "@/services";

const router = useRouter();
const route = useRoute();

const examResult = ref<ExamResult | null>(null);
const examInfo = ref<ExamManage | null>(null);
// 修改为数组类型
const activeCollapse = ref<number[]>([]);

// 计算正确率
const correctRate = computed(() => {
  if (!examResult.value) return 0;
  return Math.round(
    (examResult.value.correctCount / examResult.value.totalCount) * 100,
  );
});

onMounted(async () => {
  try {
    // 从本地存储获取考试结果
    const resultStr = localStorage.getItem("lastExamResult");
    if (resultStr) {
      examResult.value = JSON.parse(resultStr);
    }

    // 获取考试基本信息
    if (route.query.examCode) {
      const { data } = await GetExamInfoApi(Number(route.query.examCode));
      examInfo.value = data as ExamManage;
    }
  } catch (error) {
    console.error("获取考试信息失败", error);
  }
});
</script>

<style scoped>
.safe-area-bottom {
  height: env(safe-area-inset-bottom);
}

.pb-safe {
  padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
}

.shadow-up {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

:deep(.van-collapse-item__content) {
  padding: 16px;
}

:deep(.van-collapse-item__title) {
  font-size: 16px;
  font-weight: 500;
}
</style>
