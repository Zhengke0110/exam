<script setup lang="ts">
import { ref, computed } from "vue";
import { Tabbar, TabbarItem, NavBar } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const allRoutes = [
  { name: "首页", icon: "home-o", path: "/home", role: "all" },
  { name: "学生列表", icon: "search", path: "/student-grade", role: "1" },
  { name: "考试列表", icon: "search", path: "/student-exam", role: "2" },
  { name: "成绩信息", icon: "orders-o", path: "/grade", role: "1" },
  { name: "考试管理", icon: "underway-o", path: "/select-exam", role: "1" },
  { name: "系统管理", icon: "setting-o", path: "/admin", role: "0" },
  { name: "我的", icon: "user-o", path: "/profile", role: "all" },
];

const routes = computed(() => {
  const userRole = userStore.getLoginRole;
  return allRoutes.filter((route) => {
    // 通用路由，所有人可见
    if (route.role === "all") return true;

    // 管理员可以看到所有路由
    if (userRole === "0") return true;

    // 教师只能看到教师路由和通用路由
    if (userRole === "1") return route.role === "1" || route.role === "all";

    // 学生只能看到学生路由和通用路由
    if (userRole === "2") return route.role === "2" || route.role === "all";

    return false;
  });
});

// 将 active 改为 computed 属性
const active = computed(() => {
  const currentPath = route.path;
  return routes.value.findIndex((route) => route.path === currentPath);
});

// 修改 handleTabChange 函数，移除对 active.value 的赋值
const handleTabChange = (index: number) => {
  router.push(routes.value[index].path);
};
</script>

<template>
  <div class="flex h-screen flex-col">
    <!-- 顶部导航栏 -->
    <NavBar
      title="在线考试平台——移动端"
      left-text="返回"
      left-arrow
      class="sticky top-0 z-10 flex-shrink-0"
      @click-left="router.back()"
    />

    <!-- 主要内容区域 -->
    <main class="flex-1 overflow-y-auto px-2 pt-2 pb-16">
      <router-view />
    </main>

    <!-- 底部标签栏 -->
    <Tabbar
      v-model="active"
      :safe-area-inset-bottom="true"
      @change="handleTabChange"
      class="fixed right-0 bottom-0 left-0 z-10 flex-shrink-0"
    >
      <TabbarItem
        v-for="(item, index) in routes"
        :key="index"
        :icon="item.icon"
      >
        {{ item.name }}
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<style scoped></style>
