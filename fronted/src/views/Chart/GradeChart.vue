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

    <!-- 空数据状态 -->
    <div v-else-if="isNull" class="flex h-[60vh] items-center justify-center">
      <div
        class="rounded-lg bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm"
      >
        <div class="mb-2 text-4xl">📊</div>
        <div class="text-lg text-gray-600">该考生未参加任何考试</div>
      </div>
    </div>

    <!-- 成绩图表展示 -->
    <div v-else class="space-y-4">
      <!-- 标题卡片 -->
      <div class="rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm">
        <h2 class="text-center text-xl font-bold text-gray-800">成绩趋势</h2>
        <p class="mt-2 text-center text-sm text-gray-500">
          共参加了 {{ examTimes }} 次考试
        </p>
      </div>

      <!-- 考试详情列表 -->
      <div class="rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm">
        <div class="space-y-2">
          <div
            v-for="(score, index) in scores"
            :key="index"
            class="flex items-center justify-between rounded-lg bg-white/60 p-3 transition-all hover:bg-white/80"
          >
            <div class="flex flex-col">
              <span class="font-medium text-gray-800">{{ score.subject }}</span>
              <span class="text-sm text-gray-500">{{
                formatDate(score.answerDate)
              }}</span>
            </div>
            <span
              class="text-lg font-bold"
              :class="getScoreColor(score.etScore ?? 0)"
            >
              {{ score.etScore }}分
            </span>
          </div>
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
            @mouseover="handleChartMouseover"
          />
        </div>
      </div>

      <!-- 成绩统计卡片 -->
      <div class="grid grid-cols-2 gap-4">
        <div
          class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div class="text-sm text-gray-500">最高分</div>
          <div class="mt-1 text-xl font-bold text-green-600">
            {{ maxScore }}
          </div>
        </div>
        <div
          class="transform rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div class="text-sm text-gray-500">平均分</div>
          <div class="mt-1 text-xl font-bold text-blue-600">
            {{ averageScore }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { GetExamByStudentId } from "@/services";
import type { Score } from "@/services";

// 注册必须的组件
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
]);

const route = useRoute();
const loading = ref(true);
const isNull = ref(false);
const scores = ref<Score[]>([]);

// 计算属性
const examTimes = computed(() => scores.value.length);
const maxScore = computed(() => {
  return Math.max(...scores.value.map((s) => s.etScore || 0));
});
const averageScore = computed(() => {
  const sum = scores.value.reduce((acc, cur) => acc + (cur.etScore || 0), 0);
  return (sum / (scores.value.length || 1)).toFixed(1);
});

// 格式化日期
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "未知日期";
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 根据分数获取颜色
const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-yellow-600";
  if (score >= 60) return "text-orange-600";
  return "text-red-600";
};

// 图表配置
const chartOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#eee",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: { color: "#333" },
    formatter: (params: any) => {
      const dataIndex = params[0].dataIndex;
      const score = scores.value[dataIndex];
      return `
        科目：${score.subject}<br/>
        分数：${score.etScore}分<br/>
        时间：${formatDate(score.answerDate)}
      `;
    },
  },
  grid: {
    top: "10%",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: scores.value.map((_, index) => `第${index + 1}次`),
    boundaryGap: false,
    axisLine: { lineStyle: { color: "#999" } },
    axisLabel: { fontSize: 12 },
  },
  yAxis: {
    type: "value",
    min: 0,
    max: 100,
    splitLine: { lineStyle: { type: "dashed" } },
    axisLabel: { fontSize: 12 },
  },
  series: [
    {
      data: scores.value.map((s) => s.etScore),
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      itemStyle: {
        color: "#3b82f6",
        borderWidth: 2,
        borderColor: "#fff",
      },
      lineStyle: {
        width: 3,
        shadowColor: "rgba(59, 130, 246, 0.2)",
        shadowBlur: 10,
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(59, 130, 246, 0.2)" },
            { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
          ],
        },
      },
      emphasis: {
        scale: true,
        focus: "series",
      },
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicOut",
    },
  ],
}));

const handleChartMouseover = (params: any) => {
  console.log("Score:", params.value);
};

const fetchData = async () => {
  loading.value = true;
  try {
    const studentId = route.query.studentId ? Number(route.query.studentId) : 0;
    const { data } = await GetExamByStudentId(studentId);

    if (!data || !Array.isArray(data) || data.length === 0) {
      isNull.value = true;
      return;
    }

    scores.value = data;
    isNull.value = false;
  } catch (error) {
    console.error("Failed to fetch exam data:", error);
    isNull.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.v-chart {
  transition: all 300ms ease-in-out;
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

/* 添加新的过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
