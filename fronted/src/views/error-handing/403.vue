<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8"
  >
    <!-- 错误图标 -->
    <div class="mb-6 text-6xl">🚫</div>

    <!-- 错误信息 -->
    <h1 class="mb-4 text-2xl font-bold text-gray-800">访问被拒绝</h1>
    <p class="mb-8 text-center text-gray-600">抱歉，您没有权限访问该页面</p>

    <!-- 操作按钮 -->
    <div class="space-x-4">
      <van-button round type="primary" @click="router.back()">
        返回上一页
      </van-button>
      <van-button round type="default" @click="router.push('/home')">
        返回首页
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button as VanButton } from "vant";

const router = useRouter();
</script>
