<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4"
  >
    <!-- 加载状态 -->
    <div v-if="loading" class="flex h-[60vh] items-center justify-center">
      <div class="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div
            class="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
          ></div>
          <span class="text-lg text-gray-600">加载中...</span>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="flex h-[60vh] items-center justify-center">
      <div class="rounded-lg bg-red-50 p-6 text-lg text-red-500 shadow-lg">
        {{ error }}
      </div>
    </div>

    <!-- 空数据状态 -->
    <div v-else-if="isNull" class="flex h-[60vh] items-center justify-center">
      <div class="rounded-lg bg-white/80 p-6 text-center backdrop-blur-sm">
        <div class="mb-2 text-4xl">📊</div>
        <div class="text-lg text-gray-600">
          该门考试还没人参考哦,请提醒学生参加考试。
        </div>
      </div>
    </div>

    <!-- 数据展示 -->
    <div v-else class="space-y-6">
      <!-- 标题卡片 -->
      <div class="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <h2 class="mb-2 text-center text-2xl font-bold text-gray-800">
          {{ name }}分数段统计
        </h2>
        <div class="flex items-center justify-center space-x-4">
          <p class="text-sm text-gray-500">
            总人数：
            <span class="text-lg font-semibold text-blue-600">{{
              totalStudents
            }}</span>
            人
          </p>
          <p class="text-sm text-gray-500">
            及格率：
            <span
              class="text-lg font-semibold"
              :class="passRate >= 60 ? 'text-green-600' : 'text-red-600'"
            >
              {{ passRate }}%
            </span>
          </p>
        </div>
      </div>

      <!-- 图表容器 -->
      <div
        class="relative rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm"
      >
        <div class="h-[50vh]">
          <v-chart
            class="h-full w-full"
            :option="chartOption"
            :auto-resize="true"
            @click="handleChartClick"
          />
        </div>
      </div>

      <!-- 分数段详情 -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div
          v-for="(value, key) in category"
          :key="key"
          class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">{{ key }}</span>
            <span class="text-lg font-bold" :class="getScoreColor(key)">
              {{ value }}人
            </span>
          </div>
          <div class="mt-2 text-xs text-gray-400">
            占比：{{ ((value / totalStudents) * 100).toFixed(1) }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import { GetExamByExamCode } from "@/services";
import type { Score } from "@/services";

// 注册必须的组件
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

interface ScoreCategory {
  "90分及以上": number;
  "80-89分": number;
  "70-79分": number;
  "60-69分": number;
  "60分以下": number;
}

const route = useRoute();
const loading = ref(true);
const error = ref<string | null>(null);
const isNull = ref(false);
const name = ref<string>("");

const category = reactive<ScoreCategory>({
  "90分及以上": 0,
  "80-89分": 0,
  "70-79分": 0,
  "60-69分": 0,
  "60分以下": 0,
});

const totalStudents = computed(() => {
  return Object.values(category).reduce((acc, curr) => acc + curr, 0);
});

// 计算及格率
const passRate = computed(() => {
  const passCount =
    category["90分及以上"] +
    category["80-89分"] +
    category["70-79分"] +
    category["60-69分"];
  return totalStudents.value > 0
    ? Math.round((passCount / totalStudents.value) * 100)
    : 0;
});

// 获取分数段对应的颜色
const getScoreColor = (key: string) => {
  const colorMap: Record<string, string> = {
    "90分及以上": "text-green-600",
    "80-89分": "text-blue-600",
    "70-79分": "text-yellow-600",
    "60-69分": "text-orange-600",
    "60分以下": "text-red-600",
  };
  return colorMap[key] || "text-gray-600";
};

const chartOption = computed<EChartsOption>(() => ({
  title: {
    show: false,
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}人 ({d}%)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#eee",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: "#333",
    },
  },
  legend: {
    orient: "horizontal",
    right: 10,
    top: 10,
    icon: "circle",
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      fontSize: 12,
    },
    formatter: (name: string) => {
      const value = category[name as keyof ScoreCategory];
      return `${name}`;
    },
  },
  color: [
    "rgb(34, 197, 94)", // 90分以上 - 翠绿色
    "rgb(59, 130, 246)", // 80-89分 - 天蓝色
    "rgb(234, 179, 8)", // 70-79分 - 金黄色
    "rgb(249, 115, 22)", // 60-69分 - 橙色
    "rgb(239, 68, 68)", // 60分以下 - 红色
  ],
  series: [
    {
      name: "分数分布",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["50%", "55%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 8,
        borderColor: "#fff",
        borderWidth: 2,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.1)",
      },
      label: {
        show: true,
        position: "inside", // 改为内部显示
        formatter: (params: any) => {
          const value = params.value;
          const percent = params.percent;
          return `${value}人\n${percent}%`;
        },
        fontSize: 12,
        fontWeight: 500,
        color: "#fff",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)", // 添加文字阴影提高可读性
      },
      labelLine: {
        show: false, // 隐藏引导线
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [
        { value: category["90分及以上"], name: "90分及以上" },
        { value: category["80-89分"], name: "80-89分" },
        { value: category["70-79分"], name: "70-79分" },
        { value: category["60-69分"], name: "60-69分" },
        { value: category["60分以下"], name: "60分以下" },
      ],
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: (idx) => idx * 200,
    },
  ],
}));

const handleChartClick = (params: any) => {
  console.log("Chart clicked:", params);
};

const getScoreInfo = async () => {
  loading.value = true;
  error.value = null;
  isNull.value = false;

  const examCode = route.query.examCode ? Number(route.query.examCode) : 0;
  name.value = (route.query.source as string) || "未知考试";

  try {
    const { data } = await GetExamByExamCode(examCode);
    // const { data } = await GetExamByExamCode(20190001);

    if (!data || !Array.isArray(data) || data.length === 0) {
      isNull.value = true;
      return;
    }

    // 重置分类计数
    Object.keys(category).forEach((key) => {
      category[key as keyof ScoreCategory] = 0;
    });

    // 统计分数
    data.forEach((element: Score) => {
      if (typeof element.etScore === "number") {
        const score = Math.floor(element.etScore / 10);
        switch (score) {
          case 10:
          case 9:
            category["90分及以上"]++;
            break;
          case 8:
            category["80-89分"]++;
            break;
          case 7:
            category["70-79分"]++;
            break;
          case 6:
            category["60-69分"]++;
            break;
          default:
            category["60分以下"]++;
        }
      }
    });
  } catch (err) {
    error.value = "获取成绩数据失败，请稍后重试";
    console.error("Failed to fetch score data:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getScoreInfo();
});
</script>

<style scoped>
.v-chart {
  transition: all 300ms ease-in-out;
}

:deep(.echarts-tooltip) {
  border-radius: 0.5rem; /* rounded-lg */
  background-color: rgba(255, 255, 255, 0.95); /* bg-white/95 */
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-xl */
  backdrop-filter: blur(4px); /* backdrop-blur-sm */
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
