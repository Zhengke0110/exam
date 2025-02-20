<script setup lang="ts">
import BasicLayout from "@/layout/BasicLayout";
import { LayoutMenu } from "@/router";

import { useRoute } from "vue-router";
import { onMounted } from "vue";
const route = useRoute();
</script>

<template>
  <template v-if="route.meta?.layout === LayoutMenu.BasicLayout">
    <BasicLayout />
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
