<template>
  <div class="pb-safe min-h-screen bg-gray-50">
    <!-- 考试信息弹窗 -->
    <Dialog
      v-model:show="showExamInfo"
      title="考试须知"
      theme="round-button"
      :show-confirm-button="true"
      :show-cancel-button="false"
      confirm-button-text="开始考试"
      @confirm="startExam"
    >
      <div class="space-y-4 p-4">
        <div class="text-lg font-semibold text-gray-800">
          {{ examInfo?.description }}
        </div>
        <div class="space-y-2 text-sm text-gray-600">
          <div>科目：{{ examInfo?.source }}</div>
          <div>考试时长：{{ examInfo?.totalTime }}分钟</div>
          <div>总分：{{ examInfo?.totalScore }}分</div>
          <div>考试时间：{{ examInfo?.examDate }}</div>
          <div
            v-if="examInfo?.tips"
            class="mt-4 rounded-lg bg-blue-50 p-3 text-blue-700"
          >
            <div class="flex items-center">
              <span class="mr-2">💡</span>
              {{ examInfo.tips }}
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- 顶部导航栏 -->
    <div class="fixed inset-x-0 top-0 z-50 bg-white">
      <div class="safe-area-top bg-white"></div>
      <div class="flex items-center justify-between border-b p-4">
        <div class="flex items-center space-x-2">
          <NavBar title="考试进行中" left-arrow @click-left="handleBack" />
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">
            题目 {{ currentIndex + 1 }}/{{ questions.length }}
          </span>
          <span
            class="text-sm"
            :class="
              remainingTime < 300
                ? 'animate-pulse text-red-600'
                : 'text-blue-600'
            "
          >
            剩余：{{ formatTime(remainingTime) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 浮动按钮 - 显示答题卡 -->
    <div class="fixed top-20 right-4 z-40">
      <button
        class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600"
        @click="showAnswerCard = true"
      >
        <span class="text-lg">📝</span>
      </button>
    </div>

    <!-- 答题卡预览面板 -->
    <Popup
      v-model:show="showAnswerCard"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <div class="flex h-full flex-col bg-white">
        <!-- 答题卡标题 -->
        <div class="border-b p-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">答题卡</h3>
            <span class="text-sm text-gray-500">
              已答 {{ Object.keys(userAnswers).length }}/{{ questions.length }}
            </span>
          </div>
        </div>

        <!-- 答题进度概览 -->
        <div class="border-b p-4">
          <Progress
            :percentage="progressPercentage"
            :pivot-text="progressText"
            color="#1989fa"
          />
        </div>

        <!-- 题目列表 -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="grid grid-cols-4 gap-3">
            <button
              v-for="(question, index) in questions"
              :key="index"
              class="aspect-square rounded-lg border-2 p-2 text-center transition-all"
              :class="[
                userAnswers[index]
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-200 text-gray-600',
                currentIndex === index
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : '',
              ]"
              @click="jumpToQuestion(index)"
            >
              <span class="text-sm">{{ index + 1 }}</span>
              <div class="mt-1 text-xs">
                {{ getQuestionTypeShort(question.type) }}
              </div>
            </button>
          </div>
        </div>

        <!-- 图例说明 -->
        <div class="border-t p-4">
          <div class="flex items-center justify-around text-sm">
            <div class="flex items-center">
              <div class="mr-2 h-3 w-3 rounded border-2 border-gray-200"></div>
              <span>未答题</span>
            </div>
            <div class="flex items-center">
              <div
                class="mr-2 h-3 w-3 rounded border-2 border-blue-500 bg-blue-50"
              ></div>
              <span>已答题</span>
            </div>
            <div class="flex items-center">
              <div
                class="mr-2 h-3 w-3 rounded ring-2 ring-blue-500 ring-offset-2"
              ></div>
              <span>当前题</span>
            </div>
          </div>
        </div>
      </div>
    </Popup>

    <!-- 题目内容区域 -->
    <div class="mt-[72px] px-4 pb-32">
      <Transition mode="out-in" name="fade">
        <div
          v-if="currentQuestion"
          :key="currentIndex"
          class="rounded-lg bg-white p-4 shadow-sm"
        >
          <!-- 题目信息 -->
          <div class="mb-4 flex items-center justify-between">
            <Tag type="primary" size="medium">{{ currentQuestion.type }}</Tag>
            <span class="text-sm text-gray-500"
              >{{ currentQuestion.score }}分</span
            >
          </div>

          <!-- 题目内容 -->
          <div class="mb-6 text-lg">{{ currentQuestion.question }}</div>

          <!-- 答题区域 -->
          <Transition name="fade-up" mode="out-in">
            <!-- 单选题 -->
            <div
              v-if="currentQuestion.type === AnswerType.SINGLE"
              class="space-y-3"
            >
              <div
                v-for="option in ['A', 'B', 'C', 'D']"
                :key="option"
                class="transform transition-all duration-300"
                :class="{
                  'scale-102': userAnswers[currentIndex] === option,
                }"
              >
                <Cell
                  :title="`${option}: ${currentQuestion[('answer' + option) as keyof typeof currentQuestion]}`"
                  clickable
                  class="option-cell"
                  :class="{
                    'option-selected': userAnswers[currentIndex] === option,
                  }"
                  @click="selectAnswer(option)"
                >
                  <template #icon>
                    <div
                      class="mr-3 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300"
                      :class="{
                        'border-blue-500 bg-blue-50':
                          userAnswers[currentIndex] === option,
                        'border-gray-300': userAnswers[currentIndex] !== option,
                      }"
                    >
                      {{ option }}
                    </div>
                  </template>
                </Cell>
              </div>
            </div>

            <!-- 判断题 -->
            <div
              v-else-if="currentQuestion.type === AnswerType.JUDGE"
              class="space-y-3"
            >
              <Cell
                v-for="[value, label] in [
                  ['T', '正确'],
                  ['F', '错误'],
                ]"
                :key="value"
                clickable
                class="option-cell"
                :class="{
                  'option-selected': userAnswers[currentIndex] === value,
                }"
                @click="selectAnswer(value)"
              >
                <template #icon>
                  <div
                    class="mr-3 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300"
                    :class="{
                      'border-blue-500 bg-blue-50':
                        userAnswers[currentIndex] === value,
                      'border-gray-300': userAnswers[currentIndex] !== value,
                    }"
                  >
                    {{ value }}
                  </div>
                </template>
                <template #title>
                  <span class="text-base">{{ label }}</span>
                </template>
              </Cell>
            </div>

            <!-- 填空题 -->
            <div
              v-else-if="currentQuestion.type === AnswerType.FILL"
              class="space-y-3"
            >
              <Field
                v-model="userAnswers[currentIndex]"
                type="textarea"
                rows="3"
                placeholder="请输入答案"
                class="rounded-lg border"
              />
            </div>
          </Transition>
        </div>
      </Transition>
    </div>

    <!-- 底部操作栏 -->
    <div class="shadow-up fixed inset-x-0 bottom-0 bg-white">
      <div class="flex items-center justify-between p-4">
        <Button plain @click="prevQuestion" :disabled="currentIndex === 0"
          >上一题</Button
        >
        <div class="flex-1 px-4">
          <Progress
            :percentage="progressPercentage"
            :pivot-text="progressText"
          />
        </div>
        <Button
          type="primary"
          @click="nextQuestion"
          :text="isLastQuestion ? '提交' : '下一题'"
        />
      </div>
      <div class="safe-area-bottom bg-white"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  Cell,
  Field,
  Button,
  Tag,
  Progress,
  showDialog,
  NavBar,
  Dialog,
  Popup,
  showToast,
} from "vant";
import { GetPaperByPaperIdApi, GetExamInfoApi } from "@/services";
import type { AnswerDetail, ExamManage } from "@/services";
import { AnswerType } from "@/services";
import { useRouter } from "vue-router";
import type { ExamResult, WrongQuestion } from "@/types/exam";

const router = useRouter();
const props = defineProps<{ examCode: string }>();
const questions = ref<AnswerDetail[]>([]);
const currentIndex = ref(0);
const userAnswers = ref<Record<number, string>>({});
const remainingTime = ref(7200); // 2小时

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const isLastQuestion = computed(
  () => currentIndex.value === questions.value.length - 1,
);

const progressPercentage = computed(() => {
  if (!questions.value.length) return 0;
  const answered = Object.keys(userAnswers.value).length;
  return Math.round((answered / questions.value.length) * 100) || 0;
});

const progressText = computed(() => {
  if (!questions.value.length) return "0/0";
  return `${Object.keys(userAnswers.value).length}/${questions.value.length}`;
});

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const selectAnswer = (answer: string) => {
  userAnswers.value[currentIndex.value] = answer;
};

const nextQuestion = async () => {
  if (isLastQuestion.value) {
    await handleSubmit();
    return;
  }
  currentIndex.value++;
};

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const examResult = ref<ExamResult>({
  examCode: 0,
  score: 0,
  totalScore: 0,
  correctCount: 0,
  totalCount: 0,
  wrongQuestions: [],
  submitTime: "",
});

// 判题函数
const gradeExam = () => {
  const result = examResult.value;
  result.examCode = Number(props.examCode);
  result.totalCount = questions.value.length;
  result.totalScore = questions.value.reduce((sum, q) => sum + q.score, 0);
  result.submitTime = new Date().toISOString();

  let totalScore = 0;
  let correctCount = 0;
  const wrongQuestions: WrongQuestion[] = [];

  questions.value.forEach((question, index) => {
    const userAnswer = userAnswers.value[index];
    const isCorrect = checkAnswer(question, userAnswer);

    if (isCorrect) {
      totalScore += question.score;
      correctCount++;
    } else {
      wrongQuestions.push({
        questionId: question.questionId,
        question: question.question,
        type: question.type,
        yourAnswer: userAnswer || "未作答",
        rightAnswer: question.rightAnswer || "",
        score: question.score,
        analysis: question.analysis,
      });
    }
  });

  result.score = totalScore;
  result.correctCount = correctCount;
  result.wrongQuestions = wrongQuestions;

  return result;
};

// 检查答案是否正确
const checkAnswer = (question: AnswerDetail, userAnswer?: string): boolean => {
  if (!userAnswer) return false;

  switch (question.type) {
    case AnswerType.JUDGE:
      return userAnswer.toUpperCase() === question.rightAnswer?.toUpperCase();
    case AnswerType.SINGLE:
      return userAnswer.toUpperCase() === question.rightAnswer?.toUpperCase();
    case AnswerType.FILL:
      // 填空题可能需要模糊匹配或者其他匹配规则
      return userAnswer.trim() === question.rightAnswer?.trim();
    default:
      return false;
  }
};

// 修改提交函数
const handleSubmit = async (auto = false) => {
  try {
    // 检查是否所有题目都已作答
    const unansweredCount =
      questions.value.length - Object.keys(userAnswers.value).length;

    if (!auto && unansweredCount > 0) {
      const result = await showDialog({
        title: "提示",
        message: `还有 ${unansweredCount} 道题未作答，确定要提交吗？`,
        showCancelButton: true,
      });

      if (result === "cancel") return;
    }

    const confirmResult = await showDialog({
      title: auto ? "自动提交" : "确认提交",
      message: auto
        ? "考试时间已结束，系统将自动提交试卷"
        : "提交后将无法修改答案，是否确认提交？",
      showCancelButton: !auto,
    });

    if (confirmResult === "confirm") {
      // 进行判题
      const result = gradeExam();

      try {
        // TODO: 调用API保存考试结果
        // await submitExamResult(result);

        // 将结果存入本地存储，用于结果页面显示
        localStorage.setItem("lastExamResult", JSON.stringify(result));

        // 显示考试结果摘要
        await showDialog({
          title: "考试完成",
          message: `得分：${result.score}/${result.totalScore}\n正确率：${Math.round((result.correctCount / result.totalCount) * 100)}%`,
          confirmButtonText: "查看详情",
        });

        router.push({
          path: "/exam-result",
          query: { examCode: props.examCode },
        });
      } catch (error) {
        showToast("提交失败，请重试");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const examInfo = ref<ExamManage | null>(null);
const showExamInfo = ref(true);
const examStarted = ref(false);
let timer: number;

// 处理考试开始
const startExam = () => {
  if (!examInfo.value?.totalTime) return;

  examStarted.value = true;
  remainingTime.value = examInfo.value.totalTime * 60; // 转换为秒
  startTimer();
};

// 处理返回按钮
const handleBack = async () => {
  try {
    const result = await showDialog({
      title: "确认离开",
      message: "离开考试将被记为交卷，确定要退出吗？",
      showCancelButton: true,
    });

    if (result === "confirm") {
      await handleSubmit(true);
    }
  } catch (error) {
    // 用户取消
  }
};

// 自动提交
const autoSubmit = () => {
  showDialog({
    title: "考试时间到",
    message: "考试时间已结束，系统将自动提交试卷",
    showCancelButton: false,
  }).then(() => {
    handleSubmit(true);
  });
};

onMounted(async () => {
  try {
    // 获取考试信息
    const { data } = await GetExamInfoApi(Number(props.examCode));
    examInfo.value = data as ExamManage;

    // 检查考试时间
    if (examInfo.value?.examDate) {
      const examDate = new Date(examInfo.value.examDate);
      const now = new Date();
      if (examDate > now) {
        showDialog({
          title: "考试未开始",
          message: "请在考试开始时间后参加考试",
          showCancelButton: false,
        }).then(() => {
          router.back();
        });
        return;
      }
    }

    // 获取试卷内容
    const res = await GetPaperByPaperIdApi(Number(props.examCode));
    questions.value = res as AnswerDetail[];
  } catch (error) {
    showDialog({
      title: "加载失败",
      message: "试卷加载失败，请重试",
      showCancelButton: false,
    }).then(() => {
      router.back();
    });
  }
});

// 修改计时器逻辑
const startTimer = () => {
  timer = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;

      // 最后5分钟提醒
      if (remainingTime.value === 300) {
        showDialog({
          title: "时间提醒",
          message: "距离考试结束还有5分钟，请注意把握时间",
          showCancelButton: false,
        });
      }
    } else {
      clearInterval(timer);
      autoSubmit();
    }
  }, 1000);
};

onUnmounted(() => {
  clearInterval(timer);
});

// 添加答题卡控制变量
const showAnswerCard = ref(false);

// 获取题目类型简写
const getQuestionTypeShort = (type: string) => {
  switch (type) {
    case AnswerType.SINGLE:
      return "单选";
    case AnswerType.JUDGE:
      return "判断";
    case AnswerType.FILL:
      return "填空";
    default:
      return "其他";
  }
};

// 跳转到指定题目
const jumpToQuestion = (index: number) => {
  currentIndex.value = index;
  showAnswerCard.value = false;
};
</script>

<style scoped>
.safe-area-top {
  height: env(safe-area-inset-top);
}

.safe-area-bottom {
  height: env(safe-area-inset-bottom);
}

.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.shadow-up {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

:deep(.van-field__control) {
  min-height: 100px;
}

:deep(.van-cell) {
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

:deep(.van-progress) {
  height: 8px;
  border-radius: 4px;
}

/* 选项样式 */
:deep(.option-cell) {
  margin-bottom: 0.75rem;
  border-radius: 1rem;
  border-width: 2px;
  border-color: transparent;
  padding: 1rem;
  transition-property: all;
  transition-duration: 300ms;
}

:deep(.option-cell.option-selected) {
  border-color: #63b3ed;
  background-color: #eff6ff;
  transform: translateX(8px);
}

:deep(.option-cell:active) {
  background-color: #e0f7fa;
}

:deep(.van-cell__title) {
  display: flex;
  align-items: center;
  font-size: 1rem;
}

:deep(.van-cell__value) {
  display: flex;
  align-items: center;
}

:deep(.van-cell) {
  transition-property: all;
  transition-duration: 300ms;
  background-color: transparent;
}

:deep(.van-cell:hover) {
  background-color: #f9fafb;
}
.scale-102 {
  transform: scale(1.02);
}

/* 添加闪烁动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 答题卡样式 */
:deep(.van-popup) {
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

/* 滚动条美化 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 #f8fafc;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 3px;
}
</style>
