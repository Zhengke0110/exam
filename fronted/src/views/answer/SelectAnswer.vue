<template>
  <div class="p-4">
    <TransitionGroup
      name="list"
      tag="div"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(item, index) in answerList"
        :key="index"
        class="transform transition-all duration-300 hover:scale-105"
      >
        <van-card class="rounded-lg bg-white shadow-md">
          <!-- 科目和章节信息 -->
          <template #title>
            <div class="mb-2">
              <span class="text-lg font-bold">{{ item.subject }}</span>
              <span class="ml-2 text-sm text-gray-500">{{ item.section }}</span>
            </div>
          </template>

          <!-- 问题描述 -->
          <template #desc>
            <div class="mt-2">
              <div class="text-sm font-medium text-gray-700">题目内容：</div>
              <div class="mt-1 text-sm text-gray-600">
                {{ item.question || "暂无内容" }}
              </div>
            </div>
          </template>

          <!-- 标签：难度和类型 -->
          <template #tags>
            <div class="mt-2">
              <van-tag type="primary" class="mr-2">{{
                item.type || "未知类型"
              }}</van-tag>
              <van-tag :type="getDifficultyType(item.level)">
                {{ item.level || "未知难度" }}
              </van-tag>
            </div>
          </template>

          <!-- 分数显示 -->
          <template #price>
            <div class="mt-2">
              <span class="text-lg font-semibold text-orange-500">
                {{ item.score || "0" }}分
              </span>
            </div>
          </template>

          <!-- 操作按钮 -->
          <template #footer>
            <div class="mt-2 flex justify-end space-x-2">
              <van-button
                size="small"
                type="success"
                @click="handleDetail(item)"
              >
                详情
              </van-button>
              <van-button size="small" type="primary" @click="handleEdit(item)">
                编辑
              </van-button>
              <van-button
                size="small"
                type="danger"
                @click="handleDelete(index)"
              >
                删除
              </van-button>
            </div>
          </template>
        </van-card>
      </div>
    </TransitionGroup>

    <van-dialog
      v-model:show="showDialog"
      title="确认删除"
      @confirm="confirmDelete"
    >
      确定要删除这条答案吗？
    </van-dialog>
    <FloatingBubble icon="plus" @click="router.push('/add-answer')" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GetAnswerListNoPageApi } from "@/services";
import type { AnswerVO } from "@/services";
import { onMounted } from "vue";
import {
  Card as VanCard,
  Button as VanButton,
  Tag as VanTag,
  Dialog as VanDialog,
  FloatingBubble,
} from "vant";
import router from "@/router";

const answerList = ref<AnswerVO[]>([]);
const showDialog = ref(false);
const deleteIndex = ref<number>(-1);

onMounted(async () => {
  const { data } = await GetAnswerListNoPageApi();
  answerList.value = (data as AnswerVO[]) || [];
});

const handleDetail = (item: AnswerVO) => {
  router.push({
    name: "DetailAnswer",
    query: { id: item.questionId, type: item.type },
  });
};
const handleEdit = (item: AnswerVO) => {
  // TODO: 实现编辑功能
  router.push({
    name: "EditAnswer",
    query: { id: item.questionId, type: item.type },
  });
};

const handleDelete = (index: number) => {
  deleteIndex.value = index;
  showDialog.value = true;
};

const confirmDelete = () => {
  if (deleteIndex.value > -1) {
    answerList.value.splice(deleteIndex.value, 1);
    deleteIndex.value = -1;
  }
};

// 根据难度级别返回不同的标签类型
const getDifficultyType = (level?: string) => {
  switch (level?.toLowerCase()) {
    case "简单":
      return "success";
    case "中等":
      return "warning";
    case "困难":
      return "danger";
    default:
      return "primary";
  }
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
