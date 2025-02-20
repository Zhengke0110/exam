<script setup lang="ts">
import { Cell, CellGroup, Image as VanImage } from "vant";

const version = "v1.0.0";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Logo 和版本信息 -->
    <div class="flex flex-col items-center p-8">
      <VanImage
        width="80"
        height="80"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="rounded-xl"
      />
      <h1 class="mt-4 text-xl font-bold">在线考试系统</h1>
      <p class="mt-2 text-sm text-gray-500">{{ version }}</p>
    </div>

    <!-- 关于信息 -->
    <CellGroup inset class="mx-4">
      <Cell title="系统介绍" is-link to="/about/intro" />
      <Cell title="功能特点" is-link to="/about/features" />
      <Cell title="使用帮助" is-link to="/about/help" />
      <Cell title="联系我们" is-link to="/about/contact" />
    </CellGroup>

    <!-- 技术栈信息 -->
    <CellGroup inset title="技术栈" class="mx-4 mt-4">
      <Cell title="前端框架" value="Vue 3 + TypeScript" />
      <Cell title="UI 组件" value="Vant + TailwindCSS" />
      <Cell title="构建工具" value="Vite" />
    </CellGroup>

    <!-- 版权信息 -->
    <div class="mt-8 p-4 text-center text-sm text-gray-500">
      <p>Copyright © 2024 在线考试系统</p>
      <p class="mt-1">All Rights Reserved</p>
    </div>
  </div>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 1;
}

:deep(.van-cell__value) {
  flex: none;
}
</style>
