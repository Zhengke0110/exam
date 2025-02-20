<template>
  <div class="grade-page min-h-screen bg-gray-100">
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="pb-20"
      >
        <div class="space-y-4 p-4">
          <transition-group name="list" tag="div" class="space-y-4">
            <Card
              v-for="exam in examList"
              :key="exam.examCode"
              :title="exam.description || '未命名考试'"
              :desc="exam.source"
              class="transform bg-white transition-all duration-300 hover:scale-102 hover:shadow-lg"
              @click="
                () =>
                  router.push(
                    `/score-chart?examCode=${exam.examCode}&source=${exam.source}`,
                  )
              "
            >
              <template #title>
                <h3 class="mb-1 text-lg font-bold text-gray-800">
                  {{ exam.description || "未命名考试" }}
                </h3>
                <p class="text-sm text-gray-600">{{ exam.source }}</p>
              </template>

              <template #tags>
                <div class="my-2 space-x-2">
                  <Tag type="primary" class="rounded-full px-3 py-1 text-sm">
                    {{ exam.type }}
                  </Tag>
                  <Tag type="success" class="rounded-full px-3 py-1 text-sm">
                    {{ exam.grade }}
                  </Tag>
                </div>
              </template>

              <template #bottom>
                <div class="mt-4 space-y-3 text-base">
                  <div class="grid auto-rows-auto gap-3 sm:grid-cols-2">
                    <!-- 考试时间 - 总是独占一行 -->
                    <div class="col-span-full flex items-center space-x-2">
                      <span class="min-w-[5rem] text-gray-500"
                        >📅 考试时间:</span
                      >
                      <span class="font-medium break-all">{{
                        exam.examDate
                      }}</span>
                    </div>

                    <!-- 其他信息 - 自适应布局 -->
                    <div
                      v-if="exam.totalTime"
                      :class="[
                        'flex items-center space-x-2',
                        isLongText(exam.totalTime?.toString())
                          ? 'col-span-full'
                          : '',
                      ]"
                    >
                      <span class="min-w-[5rem] text-gray-500">⏱️ 时长:</span>
                      <span class="font-medium break-all"
                        >{{ exam.totalTime }}分钟</span
                      >
                    </div>

                    <div
                      v-if="exam.totalScore"
                      :class="[
                        'flex items-center space-x-2',
                        isLongText(exam.totalScore?.toString())
                          ? 'col-span-full'
                          : '',
                      ]"
                    >
                      <span class="min-w-[5rem] text-gray-500">📊 总分:</span>
                      <span class="font-medium break-all"
                        >{{ exam.totalScore }}分</span
                      >
                    </div>

                    <div
                      :class="[
                        'flex items-center space-x-2',
                        isLongText(exam.institute) ? 'col-span-full' : '',
                      ]"
                    >
                      <span class="min-w-[5rem] text-gray-500">🏫 学院:</span>
                      <span class="font-medium break-all">{{
                        exam.institute
                      }}</span>
                    </div>

                    <div
                      :class="[
                        'flex items-center space-x-2',
                        isLongText(exam.major) ? 'col-span-full' : '',
                      ]"
                    >
                      <span class="min-w-[5rem] text-gray-500">📚 专业:</span>
                      <span class="font-medium break-all">{{
                        exam.major
                      }}</span>
                    </div>

                    <div
                      :class="[
                        'flex items-center space-x-2',
                        isLongText(exam.term) ? 'col-span-full' : '',
                      ]"
                    >
                      <span class="min-w-[5rem] text-gray-500">🎓 学期:</span>
                      <span class="font-medium break-all">{{ exam.term }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <template #footer>
                <div
                  v-if="exam.tips"
                  class="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 transition-all duration-300 hover:bg-blue-100"
                >
                  <p class="flex items-center">
                    <span class="mr-2">💡</span>
                    {{ exam.tips }}
                  </p>
                </div>
              </template>
            </Card>
          </transition-group>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>

<script setup lang="ts">
import { GetExamAllApi } from "@/services";
import type { ExamManage } from "@/services";
import { onMounted, ref } from "vue";
import { showToast } from "vant";
import { Tag, Card, List, PullRefresh } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const examList = ref<ExamManage[]>([]);
const loading = ref(false);
const finished = ref(true);
const refreshing = ref(false);

const fetchData = async () => {
  try {
    const { data } = await GetExamAllApi();
    if (Array.isArray(data)) {
      examList.value = data as ExamManage[];
    } else {
      examList.value = [];
    }
  } catch (error) {
    showToast("加载失败，请重试");
  }
};

const onRefresh = async () => {
  refreshing.value = true;
  await fetchData();
  refreshing.value = false;
};

onMounted(fetchData);

// 判断文本是否需要独占一行（超过指定长度）
const isLongText = (text?: string): boolean => {
  if (!text) return false;
  return text.length > 10; // 可以根据实际情况调整这个阈值
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

:deep(.van-card) {
  /* rounded-xl */
  border-radius: 1rem;

  /* border border-gray-100 */
  border: 1px solid #e5e7eb;

  /* box-shadow */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  /* padding */
  padding: 1.25rem;
  width: 100%;
  height: auto;
}

:deep(.van-card__header) {
  margin-bottom: 1rem;
}

:deep(.van-card__content) {
  height: auto;
  width: 100%;
}

:deep(.van-tag) {
  transition: all 300ms;
}
:deep(.van-tag):hover {
  opacity: 0.8;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* 确保文字不会溢出容器 */
:deep(.van-card__title),
:deep(.van-card__desc) {
  word-break: break-word;
  white-space: normal;
}
</style>
