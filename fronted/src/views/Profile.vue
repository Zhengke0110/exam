<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  Cell,
  CellGroup,
  Image as VanImage,
  Tag,
  showConfirmDialog,
  showSuccessToast,
} from "vant";
import { useUserStore } from "@/store/user";
import type {
  AdminInterface,
  TeacherInterface,
  StudentInterface,
} from "@/store/user";

const router = useRouter();
const userStore = useUserStore();

// 角色标识颜色映射
const roleColorMap: Record<string, string> = {
  "0": "blue", // 管理员
  "1": "green", // 教师
  "2": "orange", // 学生
};

// 角色名称映射
const roleNameMap: Record<string, string> = {
  "0": "管理员",
  "1": "教师",
  "2": "学生",
};

// 头像映射
const avatarMap: Record<string, string> = {
  "0": "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", // 管理员头像
  "1": "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", // 教师头像
  "2": "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg", // 学生头像
};

// 获取用户角色信息
const userRole = computed(() => userStore.getLoginRole);
const userInfo = computed(() => userStore.getLoginUserInfo);

// 根据角色获取头像
const avatarUrl = computed(() => {
  const role = userStore.getLoginRole;
  return avatarMap[role] || avatarMap["0"];
});

// 处理退出登录
const handleLogout = () => {
  showConfirmDialog({ title: "提示", message: "确定要退出登录吗？" })
    .then(() => {
      // 清除用户信息
      userStore.setLoginInfo({});
      showSuccessToast("已退出登录");
      router.push("/login");
    })
    .catch(() => {
      // 取消退出
    });
};

// 获取角色特定信息
const getRoleSpecificInfo = computed(() => {
  const role = userStore.getLoginRole;
  const info = userStore.getLoginUserInfo;

  if (role === "0") {
    const adminInfo = info as AdminInterface;
    return [
      { label: "管理员ID", value: adminInfo.adminId },
      { label: "身份证号", value: adminInfo.cardId },
    ];
  } else if (role === "1") {
    const teacherInfo = info as TeacherInterface;
    return [
      { label: "教师ID", value: teacherInfo.teacherId },
      { label: "所属学院", value: teacherInfo.institute },
      { label: "教师类型", value: teacherInfo.type },
    ];
  } else if (role === "2") {
    const studentInfo = info as StudentInterface;
    return [
      { label: "学号", value: studentInfo.studentId },
      { label: "年级", value: studentInfo.grade },
      { label: "专业", value: studentInfo.major },
      { label: "班级", value: studentInfo.clazz },
      { label: "学院", value: studentInfo.institute },
    ];
  }
  return [];
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
    <!-- 顶部个人信息卡片 -->
    <div
      class="relative mb-6 overflow-hidden p-6"
      :class="{
        'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700':
          userRole === '0',
        'bg-gradient-to-br from-green-500 via-green-600 to-green-700':
          userRole === '1',
        'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700':
          userRole === '2',
      }"
    >
      <!-- 背景装饰 -->
      <div
        class="absolute -top-16 -right-16 h-48 w-48 rotate-12 rounded-full bg-white/10 blur-2xl"
      ></div>
      <div
        class="absolute -bottom-16 -left-16 h-48 w-48 -rotate-12 rounded-full bg-white/10 blur-2xl"
      ></div>

      <div class="relative z-10">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <VanImage
                round
                width="88"
                height="88"
                :src="avatarUrl"
                class="animate-bounce-in border-[6px] border-white/30 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <div
                class="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"
              ></div>
            </div>
            <div class="text-white">
              <div class="flex items-center space-x-3">
                <h2 class="text-2xl font-bold tracking-wide">
                  {{ userStore.getLoginUserName }}
                </h2>
                <Tag
                  :color="roleColorMap[userRole]"
                  class="animate-slide-in-right rounded-full px-3 py-1 text-sm font-medium"
                >
                  {{ roleNameMap[userRole] }}
                </Tag>
              </div>
              <div class="mt-2 space-y-1 text-sm text-white/90">
                <p class="flex items-center space-x-2">
                  <span class="i-mdi-email text-lg opacity-75"></span>
                  <span>{{ userInfo.email }}</span>
                </p>
                <p class="flex items-center space-x-2">
                  <span class="i-mdi-phone text-lg opacity-75"></span>
                  <span>{{ userInfo.tel }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 角色特定信息 -->
    <div class="space-y-4 px-4">
      <CellGroup
        inset
        title="身份信息"
        class="animate-slide-in-up overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <Cell
          v-for="(item, index) in getRoleSpecificInfo"
          :key="index"
          :title="item.label"
          :value="item.value"
          class="transition-colors duration-200 hover:bg-gray-50"
        />
      </CellGroup>

      <!-- 基本功能 -->
      <CellGroup
        inset
        title="账号设置"
        class="animate-slide-in-up overflow-hidden rounded-xl bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
        style="animation-delay: 100ms"
      >
        <Cell
          title="修改密码"
          is-link
          to="/settings/change-password"
          class="group transition-colors duration-200 hover:bg-gray-50/80"
        >
          <template #icon>
            <span
              class="i-mdi-key mr-2 text-xl text-gray-400 transition-colors group-hover:text-indigo-500"
            ></span>
          </template>
        </Cell>
        <Cell
          title="消息通知"
          is-link
          to="/settings/notifications"
          class="group transition-colors duration-200 hover:bg-gray-50/80"
        >
          <template #icon>
            <span
              class="i-mdi-bell mr-2 text-xl text-gray-400 transition-colors group-hover:text-indigo-500"
            ></span>
          </template>
        </Cell>
        <Cell
          title="隐私设置"
          is-link
          to="/settings/privacy"
          class="group transition-colors duration-200 hover:bg-gray-50/80"
        >
          <template #icon>
            <span
              class="i-mdi-shield mr-2 text-xl text-gray-400 transition-colors group-hover:text-indigo-500"
            ></span>
          </template>
        </Cell>
        <Cell
          title="关于我们"
          is-link
          to="/settings/about"
          class="group transition-colors duration-200 hover:bg-gray-50/80"
        >
          <template #icon>
            <span
              class="i-mdi-information mr-2 text-xl text-gray-400 transition-colors group-hover:text-indigo-500"
            ></span>
          </template>
        </Cell>
      </CellGroup>

      <!-- 退出登录按钮 -->
      <div class="animate-slide-in-up pt-4" style="animation-delay: 200ms">
        <button
          @click="handleLogout"
          class="group relative w-full overflow-hidden rounded-xl bg-white/80 px-6 py-3.5 text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="h-full w-full scale-x-0 bg-gradient-to-r from-rose-100 to-rose-200 opacity-80 transition-transform duration-300 group-hover:scale-x-100"
            ></div>
          </div>
          <span class="relative flex items-center justify-center space-x-2">
            <span
              class="i-mdi-logout text-xl text-rose-500 transition-colors duration-300 group-hover:text-rose-600"
            ></span>
            <span
              class="font-medium text-rose-500 transition-colors duration-300 group-hover:text-rose-600"
              >退出登录</span
            >
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-bounce-in {
  animation: bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.animate-slide-in-right {
  animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slide-in-up {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1) rotate(5deg);
  }
  70% {
    opacity: 0.9;
    transform: scale(0.95) rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.van-cell) {
  align-items: center;
  background-color: transparent;
}

:deep(.van-cell__title) {
  flex: 1;
  font-weight: 500;
  color: #374151;
}

:deep(.van-cell-group__title) {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  padding-left: 0.25rem;
}

:deep(.van-cell-group__background) {
  background-color: transparent;
}

:deep(.van-cell::after) {
  border-color: rgba(0, 0, 0, 0.05);
}

:deep(.van-cell:active) {
  background-color: rgba(243, 244, 246, 0.8);
}
</style>
