<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- 标题区域 -->
    <div class="mb-8 text-center">
      <h2
        class="transform text-2xl font-bold text-gray-800 transition-all duration-500"
        :class="{
          'translate-y-0 opacity-100': showContent,
          'translate-y-4 opacity-0': !showContent,
        }"
      >
        系统管理面板
      </h2>
      <p
        class="mt-2 transform text-gray-600 transition-all delay-100 duration-500"
        :class="{
          'translate-y-0 opacity-100': showContent,
          'translate-y-4 opacity-0': !showContent,
        }"
      >
        管理教师和学生信息
      </p>
    </div>

    <!-- 管理卡片区域 -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <!-- 教师管理模块 -->
      <div
        class="transform space-y-4 transition-all delay-200 duration-500"
        :class="{
          'translate-y-0 opacity-100': showContent,
          'translate-y-4 opacity-0': !showContent,
        }"
      >
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="mb-4 text-lg font-semibold text-gray-800">教师管理</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              class="flex cursor-pointer flex-col items-center rounded-lg bg-blue-50 p-4 transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
              @click="router.push('/admin/add-teacher')"
            >
              <van-icon name="plus" class="mb-2 text-2xl text-blue-500" />
              <span class="text-sm text-gray-700">添加教师</span>
            </div>

            <div
              class="flex cursor-pointer flex-col items-center rounded-lg bg-blue-50 p-4 transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
              @click="router.push('/admin/teacher-list')"
            >
              <van-icon name="friends-o" class="mb-2 text-2xl text-blue-500" />
              <span class="text-sm text-gray-700">教师列表</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 学生管理模块 -->
      <div
        class="transform space-y-4 transition-all delay-300 duration-500"
        :class="{
          'translate-y-0 opacity-100': showContent,
          'translate-y-4 opacity-0': !showContent,
        }"
      >
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="mb-4 text-lg font-semibold text-gray-800">学生管理</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              class="flex cursor-pointer flex-col items-center rounded-lg bg-green-50 p-4 transition-all duration-300 hover:bg-green-100 hover:shadow-md"
              @click="router.push('/admin/add-student')"
            >
              <van-icon name="plus" class="mb-2 text-2xl text-green-500" />
              <span class="text-sm text-gray-700">添加学生</span>
            </div>

            <div
              class="flex cursor-pointer flex-col items-center rounded-lg bg-green-50 p-4 transition-all duration-300 hover:bg-green-100 hover:shadow-md"
              @click="router.push('/admin/student-list')"
            >
              <van-icon name="friends-o" class="mb-2 text-2xl text-green-500" />
              <span class="text-sm text-gray-700">学生列表</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon as VanIcon } from "vant";

const router = useRouter();
const showContent = ref(false);

onMounted(() => {
  // 添加入场动画
  setTimeout(() => {
    showContent.value = true;
  }, 100);
});
</script>

<style scoped>
.hover\:shadow-md {
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.hover\:shadow-md:hover {
  transform: translateY(-2px);
}
</style>
