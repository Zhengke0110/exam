<template>
  <div class="exam-list-page min-h-screen bg-gray-100">
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
              class="group transform bg-white transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <template #title>
                <div class="flex-1">
                  <h3 class="mb-1 text-lg font-bold text-gray-800">
                    {{ exam.description || "未命名考试" }}
                  </h3>
                  <p class="text-sm text-gray-600">{{ exam.source }}</p>
                </div>
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

              <!-- 复用 Grade.vue 的考试信息展示部分 -->
              <template #bottom>
                <div class="mt-4 space-y-3 text-base">
                  <div class="grid auto-rows-auto gap-3 sm:grid-cols-2">
                    <div class="col-span-full flex items-center space-x-2">
                      <span class="min-w-[5rem] text-gray-500"
                        >📅 考试时间:</span
                      >
                      <span class="font-medium break-all">{{
                        exam.examDate
                      }}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                      <span class="min-w-[5rem] text-gray-500">⏱️ 时长:</span>
                      <span class="font-medium break-all"
                        >{{ exam.totalTime }}分钟</span
                      >
                    </div>

                    <div class="flex items-center space-x-2">
                      <span class="min-w-[5rem] text-gray-500">📊 总分:</span>
                      <span class="font-medium break-all"
                        >{{ exam.totalScore }}分</span
                      >
                    </div>
                  </div>
                </div>
              </template>

              <template #footer>
                <div class="space-y-4">
                  <div
                    v-if="exam.tips"
                    class="rounded-lg bg-blue-50 p-3 text-sm text-blue-700 transition-all duration-300 hover:bg-blue-100"
                  >
                    <p class="flex items-center">
                      <span class="mr-2">💡</span>
                      {{ exam.tips }}
                    </p>
                  </div>

                  <div class="grid grid-cols-3 gap-4 border-t pt-4">
                    <van-button
                      size="small"
                      type="success"
                      class="!w-full !rounded-md !px-2"
                      @click.stop="handleGeneratePaper(exam)"
                    >
                      <template #icon>
                        <van-icon name="orders-o" />
                      </template>
                      <span class="ml-1">组卷</span>
                    </van-button>
                    <van-button
                      size="small"
                      type="primary"
                      class="!w-full !rounded-md"
                      @click.stop="handleEdit(exam)"
                    >
                      <template #icon>
                        <van-icon name="edit" />
                      </template>
                      编辑
                    </van-button>
                    <van-button
                      size="small"
                      type="danger"
                      class="!w-full !rounded-md"
                      @click.stop="confirmDelete(exam)"
                    >
                      <template #icon>
                        <van-icon name="delete" />
                      </template>
                      删除
                    </van-button>
                  </div>
                </div>
              </template>
            </Card>
          </transition-group>
        </div>
      </List>
    </PullRefresh>

    <!-- 删除确认弹窗 -->
    <VanDialog
      v-model:show="showDeleteDialog"
      title="确认删除"
      :show-cancel-button="true"
      cancel-button-text="取消"
      confirm-button-text="确认删除"
      confirm-button-color="#ff0000"
      @confirm="handleDelete"
    >
      <div class="p-4 text-center">
        <p class="text-gray-600">确定要删除此考试吗？此操作不可撤销。</p>
      </div>
    </VanDialog>
    <FloatingBubble icon="plus" @click="router.push('/exam/add')" />
  </div>
</template>

<script setup lang="ts">
import { GetExamAllApi, DeleteExamApi } from "@/services";
import type { ExamManage } from "@/services";
import { onMounted, ref } from "vue";
import {
  showToast,
  Dialog as VanDialog, // 修改引入方式
  Tag,
  Card,
  List,
  PullRefresh,
  Button as VanButton,
  Icon as VanIcon,
  FloatingBubble,
} from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const examList = ref<ExamManage[]>([]);
const loading = ref(false);
const finished = ref(true);
const refreshing = ref(false);
const showDeleteDialog = ref(false);
const currentExam = ref<ExamManage | null>(null);

const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await GetExamAllApi();
    if (Array.isArray(data)) {
      examList.value = data;
    } else {
      examList.value = [];
    }
  } catch (error) {
    showToast("加载失败，请重试");
  } finally {
    loading.value = false;
  }
};

const onRefresh = async () => {
  refreshing.value = true;
  await fetchData();
  refreshing.value = false;
};

const handleEdit = (exam: ExamManage) => {
  router.push(`/exam/edit/${exam.examCode}`);
};

const confirmDelete = (exam: ExamManage) => {
  currentExam.value = exam;
  showDeleteDialog.value = true;
};

const handleDelete = async () => {
  if (!currentExam.value) return;

  try {
    // 这里添加删除 API 调用
    const { code } = await DeleteExamApi(Number(currentExam.value.examCode));
    if (code !== 200) throw new Error("删除失败");
    showToast("删除成功");
    await fetchData(); // 重新加载列表
  } catch (error) {
    showToast("删除失败，请重试");
  } finally {
    currentExam.value = null;
  }
};

const handleGeneratePaper = (exam: ExamManage) => {
  router.push(`/composition-exam/${exam.examCode}/${exam.source}`);
};

onMounted(fetchData);
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

.hover\:scale-102:hover {
  transform: scale(1.02);
}

:deep(.van-card) {
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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

/* 确保文字不会溢出容器 */
:deep(.van-card__title),
:deep(.van-card__desc) {
  word-break: break-word;
  white-space: normal;
}

/* 按钮样式覆盖 */
:deep(.van-button--small) {
  min-width: 72px;
}

:deep(.van-button--primary) {
  background-color: #1989fa;
}

:deep(.van-button--danger) {
  background-color: #ee0a24;
}

/* 按钮样式调整 */
:deep(.van-button) {
  height: 36px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.van-button:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

:deep(.van-button__icon) {
  margin-right: 8px;
  font-size: 16px;
}

/* 确保按钮在小屏幕上也能正常显示 */
@media (max-width: 640px) {
  :deep(.van-button--small) {
    padding: 0 8px;
    margin: 2px;
    height: 32px;
    font-size: 12px;
  }

  :deep(.van-button__text) {
    display: inline-block;
  }

  :deep(.van-button__icon) {
    margin-right: 2px;
    font-size: 14px;
  }
}

/* Dialog 样式调整 */
:deep(.van-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.van-dialog__header) {
  padding: 16px;
  font-weight: 600;
}

:deep(.van-dialog__content) {
  padding: 0;
}

:deep(.van-dialog__footer) {
  padding: 8px 16px 16px;
}

:deep(.van-dialog__cancel),
:deep(.van-dialog__confirm) {
  border-radius: 6px;
  height: 36px;
  margin: 0 4px;
}
</style>
