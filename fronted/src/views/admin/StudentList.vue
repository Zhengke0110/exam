<template>
  <div class="space-y-4 p-4">
    <VanSearch
      v-model="searchValue"
      placeholder="搜索学生"
      shape="round"
      class="shadow-sm transition-all duration-300 focus-within:shadow-md"
    />

    <VanList
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="space-y-3">
        <template v-if="loading">
          <div v-for="i in 3" :key="i" class="animate-pulse">
            <div class="rounded-lg bg-white p-4 shadow-sm">
              <div class="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div class="h-3 w-1/2 rounded bg-gray-100"></div>
            </div>
          </div>
        </template>

        <TransitionGroup name="list" tag="div" class="space-y-3">
          <VanSwipeCell
            v-for="item in list"
            :key="item.studentId"
            class="transform transition-all duration-300 hover:scale-[1.01]"
          >
            <div class="overflow-hidden rounded-lg bg-white shadow-sm">
              <VanCell class="!p-4">
                <div class="flex w-full items-start gap-4">
                  <!-- 左侧主要信息 -->
                  <div class="min-w-0 flex-1">
                    <div class="mb-2 flex items-center gap-3">
                      <span
                        class="max-w-[200px] truncate text-lg font-semibold text-gray-900"
                      >
                        {{ item.studentName }}
                      </span>
                      <span
                        class="flex-shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-600"
                      >
                        {{ item.cardId || "未设置学号" }}
                      </span>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 text-sm">
                      <span
                        class="max-w-[150px] truncate font-medium text-gray-700"
                        :title="item.institute"
                      >
                        {{ item.institute }}
                      </span>
                      <span class="text-gray-400">|</span>
                      <span class="whitespace-nowrap text-gray-600"
                        >{{ item.grade }}级</span
                      >
                      <span
                        class="max-w-[120px] truncate text-gray-600"
                        :title="item.major"
                      >
                        {{ item.major }}
                      </span>
                      <span
                        class="flex-shrink-0 rounded bg-gray-100 px-2 py-0.5 text-gray-600"
                      >
                        {{ item.clazz }}
                      </span>
                    </div>
                  </div>

                  <!-- 右侧信息 -->
                  <div class="flex-shrink-0 text-right">
                    <div class="mb-2">
                      <span
                        class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                        :class="
                          item.sex === '男'
                            ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200'
                            : 'bg-pink-50 text-pink-600 ring-1 ring-pink-200'
                        "
                      >
                        {{ item.sex }}
                      </span>
                    </div>
                    <div
                      class="max-w-[200px] truncate text-xs text-gray-500"
                      :title="item.email"
                    >
                      {{ item.email }}
                    </div>
                  </div>
                </div>
              </VanCell>
            </div>
            <template #right>
              <div class="flex h-full flex-col">
                <van-button
                  square
                  type="primary"
                  class="flex-1 !rounded-none transition-colors duration-300 hover:bg-blue-600"
                  @click="handleEdit(item.studentId!)"
                >
                  <template #default>
                    <div class="flex h-full items-center px-6">
                      <i class="fas fa-edit mr-2"></i>
                      编辑
                    </div>
                  </template>
                </van-button>
                <van-button
                  square
                  type="danger"
                  class="flex-1 !rounded-none border-t border-white/10 transition-colors duration-300 hover:bg-red-600"
                  @click="handleDelete(item.studentId!)"
                >
                  <template #default>
                    <div class="flex h-full items-center px-6">
                      <i class="fas fa-trash-alt mr-2"></i>
                      删除
                    </div>
                  </template>
                </van-button>
              </div>
            </template>
          </VanSwipeCell>
        </TransitionGroup>
      </div>
    </VanList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  showConfirmDialog,
  Search as VanSearch,
  List as VanList,
  SwipeCell as VanSwipeCell,
  Cell as VanCell,
  Button as VanButton,
} from "vant";
import type { StudentInterface } from "@/store/user";
import { GetAllStudentApi, DeleteStudentApi } from "@/services";

interface StudentResponse {
  records: StudentInterface[];
}

interface ApiResult {
  data?: any;
}

const router = useRouter();
const searchValue = ref("");
const loading = ref(false);
const finished = ref(false);
const list = ref<StudentInterface[]>([]);

const onLoad = async () => {
  try {
    const response = (await GetAllStudentApi()) as ApiResult;
    const data = response.data as unknown as StudentResponse;

    if (data && data.records) {
      list.value = data.records;
    }

    loading.value = false;
    finished.value = true;
  } catch (error) {
    console.error("获取学生列表失败:", error);
    loading.value = false;
    finished.value = true;
  }
};

const handleEdit = async (studentId: number) => {
  try {
    // 跳转到编辑页面
    router.push(`/admin/edit-student/${studentId}`);
  } catch (error) {
    console.error("跳转编辑页面失败:", error);
  }
};

const handleDelete = async (studentId: number) => {
  try {
    await showConfirmDialog({
      title: "确认删除",
      message: "是否确认删除该学生？此操作不可恢复！",
      confirmButtonText: "确认删除",
      confirmButtonColor: "#EF4444",
    });
    const { code } = await DeleteStudentApi(studentId);
    if (code !== 200) {
      throw new Error("删除学生失败");
    }
    await onLoad();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.whitespace-nowrap {
  white-space: nowrap;
}

/* 添加工具提示样式 */
[title] {
  position: relative;
  cursor: help;
}

/* 更新按钮组样式 */
.van-button {
  min-width: 90px;
  height: 50% !important; /* 确保按钮高度均分 */
}
</style>
