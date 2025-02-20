<script setup lang="ts">
import { ref } from "vue";
import { List, Cell, PullRefresh } from "vant";

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const list = ref<number[]>([]);

const onLoad = () => {
  // 模拟异步加载
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      const num = list.value.length + 1;
      list.value.push(num);
    }
    loading.value = false;
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 重置列表数据
  finished.value = false;
  list.value = [];
  onLoad();
  refreshing.value = false;
};
</script>

<template>
  <div class="h-full">
    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="h-full"
      >
        <Cell v-for="item in list" :key="item" :title="'列表项 ' + item" />
      </List>
    </PullRefresh>
  </div>
</template>
