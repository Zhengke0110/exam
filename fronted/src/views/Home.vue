<template>
  <div class="p-4">
    <!-- 欢迎卡片 -->
    <div class="mb-4">
      <div
        class="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white"
      >
        <h2 class="text-xl font-bold">{{ welcomeMessage }}</h2>
        <p class="mt-2">{{ currentTime }}</p>
      </div>
    </div>

    <!-- 教师/管理员视图 -->
    <template v-if="isTeacherOrAdmin">
      <!-- 数据概览 -->
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div
          v-for="stat in teacherStats"
          :key="stat.title"
          class="rounded-lg bg-white p-4 shadow"
        >
          <h3 class="text-gray-500">{{ stat.title }}</h3>
          <p class="text-primary mt-1 text-2xl font-bold">{{ stat.value }}</p>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="mb-4">
        <h3 class="mb-2 font-bold">快捷操作</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="action in quickActions"
            :key="action.title"
            class="flex cursor-pointer items-center rounded-lg bg-white p-4 shadow"
            @click="action.onClick"
          >
            <van-icon :name="action.icon" class="text-primary mr-2 text-xl" />
            <span>{{ action.title }}</span>
          </div>
        </div>
      </div>

      <!-- 待处理事项 -->
      <div class="mb-4">
        <h3 class="mb-2 font-bold">待处理事项</h3>
        <div class="rounded-lg bg-white p-4 shadow">
          <van-cell
            v-for="task in pendingTasks"
            :key="task.id"
            :title="task.title"
            :label="task.time"
            is-link
          />
        </div>
      </div>
    </template>

    <!-- 学生视图 -->
    <template v-else>
      <!-- 考试提醒 -->
      <div class="mb-4">
        <h3 class="mb-2 font-bold">近期考试</h3>
        <div class="rounded-lg bg-white p-4 shadow">
          <template v-if="upcomingExams.length">
            <van-cell
              v-for="exam in upcomingExams"
              :key="exam.id"
              :title="exam.title"
              :label="exam.time"
              is-link
            >
              <template #extra>
                <van-tag
                  :type="exam.status === 'coming' ? 'warning' : 'primary'"
                >
                  {{ exam.status === "coming" ? "即将开始" : "进行中" }}
                </van-tag>
              </template>
            </van-cell>
          </template>
          <div v-else class="py-4 text-center text-gray-500">暂无考试安排</div>
        </div>
      </div>

      <!-- 最近成绩 -->
      <div class="mb-4">
        <h3 class="mb-2 font-bold">最近成绩</h3>
        <div class="rounded-lg bg-white p-4 shadow">
          <template v-if="recentGrades.length">
            <van-cell
              v-for="grade in recentGrades"
              :key="grade.id"
              :title="grade.title"
              :value="grade.score + '分'"
              :label="grade.time"
            />
          </template>
          <div v-else class="py-4 text-center text-gray-500">暂无考试成绩</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { Cell as VanCell, Icon as VanIcon, Tag as VanTag } from "vant";

const router = useRouter();
const userStore = useUserStore();

// 角色判断
const isTeacherOrAdmin = computed(() => {
  return userStore.getLoginRole === "0" || userStore.getLoginRole === "1";
});

// 欢迎语
const welcomeMessage = computed(() => {
  return `你好，${userStore.getLoginUserName}`;
});

// 当前时间
const currentTime = new Date().toLocaleDateString();

// 教师统计数据
const teacherStats = ref([
  { title: "总考试数", value: "12" },
  { title: "进行中考试", value: "3" },
  { title: "待批改试卷", value: "25" },
  { title: "本月新增考试", value: "5" },
]);

// 教师快捷操作
const quickActions = [
  {
    title: "创建考试",
    icon: "plus",
    onClick: () => router.push("/create-exam"),
  },
  {
    title: "编辑题库",
    icon: "edit",
    onClick: () => router.push("/select-answer"),
  },
  {
    title: "查看统计",
    icon: "chart-trending-o",
    onClick: () => router.push("/grade"),
  },
  {
    title: "考试管理",
    icon: "setting-o",
    onClick: () => router.push("/exam-manage"),
  },
];

// 教师待处理事项
const pendingTasks = ref([
  { id: 1, title: "高数期中考试试卷批改", time: "2025-01-20" },
  { id: 2, title: "程序设计考试即将开始", time: "2025-01-22" },
]);

// 学生即将考试
const upcomingExams = ref([
  {
    id: 1,
    title: "高等数学期中考试",
    time: "2025-01-20 14:00",
    status: "coming",
  },
  {
    id: 2,
    title: "程序设计基础期末考试",
    time: "2025-01-22 10:00",
    status: "ongoing",
  },
]);

// 学生最近成绩
const recentGrades = ref([
  { id: 1, title: "离散数学期中考试", score: 89, time: "2025-01-15" },
  { id: 2, title: "C语言程序设计", score: 92, time: "2025-01-10" },
]);
</script>

<style scoped>
.text-primary {
  color: #1989fa;
}
</style>
