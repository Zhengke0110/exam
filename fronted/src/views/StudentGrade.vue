<template>
  <div class="min-h-full bg-gradient-to-br from-blue-50 to-indigo-50">
    <!-- 搜索栏 -->
    <div class="sticky top-0 z-10 backdrop-blur-md">
      <div class="bg-white/80 p-3 shadow-sm">
        <Search
          v-model="searchText"
          placeholder="搜索学生姓名"
          shape="round"
          background="#f3f4f6"
          @search="onSearch"
        >
          <template #left-icon>
            <div class="i-carbon-search text-lg text-gray-400" />
          </template>
        </Search>
      </div>
    </div>

    <!-- 列表区域 -->
    <PullRefresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
      success-duration="1000"
    >
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="— 已经到底啦 —"
        :error="error"
        error-text="请求失败，点击重试"
        @load="onLoad"
        class="px-3 py-2"
      >
        <!-- 骨架屏 -->
        <template v-if="loading && !students.length">
          <div
            v-for="n in 5"
            :key="n"
            class="mb-3 overflow-hidden rounded-xl bg-white/80 p-4 backdrop-blur-sm"
          >
            <Skeleton :row="2" round />
          </div>
        </template>

        <!-- 学生列表 -->
        <transition-group
          name="list"
          enter-active-class="animate-slide-in"
          leave-active-class="animate-slide-out"
        >
          <div
            v-for="student in students"
            :key="student.studentId"
            class="mb-3 overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 active:scale-98"
          >
            <div class="relative p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ student.studentName }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    学号: {{ student.studentId }}
                  </p>
                </div>
                <div class="flex flex-col items-end">
                  <span
                    class="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600"
                  >
                    {{ student.major }}
                  </span>
                  <span
                    class="mt-2 flex items-center text-sm text-blue-500"
                    @click="showStudentDetail(student)"
                  >
                    查看详情
                    <div class="i-carbon-arrow-right ml-1" />
                  </span>
                </div>
              </div>
              <!-- 装饰性元素 -->
              <div
                class="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-50"
              />
            </div>
          </div>
        </transition-group>
      </List>
    </PullRefresh>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GetAllStudentApi } from "@/services";
import type { Student } from "@/services";
import { showToast, Search, Skeleton, Cell, List, PullRefresh } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const students = ref<Student[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const error = ref(false);
const searchText = ref("");
const currentPage = ref(1);
const pageSize = 10;

const fetchStudents = async () => {
  try {
    loading.value = true;
    error.value = false;
    const { data } = await GetAllStudentApi(currentPage.value, pageSize);

    const newStudents = (data as any).records as Student[];

    if (refreshing.value) {
      students.value = newStudents;
      refreshing.value = false;
    } else {
      students.value = [...students.value, ...newStudents];
    }

    if (newStudents.length < pageSize) {
      finished.value = true;
    }
    currentPage.value++;
  } catch (err) {
    error.value = true;
    showToast("加载失败");
  } finally {
    loading.value = false;
  }
};

const onLoad = () => {
  fetchStudents();
};

const onRefresh = () => {
  finished.value = false;
  currentPage.value = 1;
  fetchStudents();
};

const onSearch = () => {
  students.value = [];
  finished.value = false;
  currentPage.value = 1;
  fetchStudents();
};

const showStudentDetail = (student: Student) => {
  // 添加触觉反馈
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  router.push(`/grade-chart?studentId=${student.studentId}`);
};

onMounted(() => {
  fetchStudents();
});
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-out {
  animation: slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* 添加滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

/* 添加触摸反馈 */
@media (hover: hover) {
  .cell-item:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
}

/* 添加加载动画 */
.van-list-loading {
  margin-top: 0.5rem; /* mt-2 */
  display: flex; /* flex */
  align-items: center; /* items-center */
  justify-content: center; /* justify-center */
}

.van-pull-refresh {
  min-height: 100vh; /* min-h-screen */
}
</style>
