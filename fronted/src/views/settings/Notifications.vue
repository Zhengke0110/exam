<script setup lang="ts">
import { ref } from "vue";
import { Cell, CellGroup, Switch, Empty } from "vant";

interface NotificationSetting {
  id: number;
  title: string;
  desc: string;
  enabled: boolean;
}

const notificationSettings = ref<NotificationSetting[]>([
  {
    id: 1,
    title: "系统通知",
    desc: "接收系统更新、维护等重要通知",
    enabled: true,
  },
  {
    id: 2,
    title: "考试提醒",
    desc: "接收考试相关的提醒通知",
    enabled: true,
  },
  {
    id: 3,
    title: "作业提醒",
    desc: "接收作业截止日期提醒",
    enabled: true,
  },
]);

const messages = ref([
  {
    id: 1,
    title: "系统维护通知",
    content: "系统将于今晚22:00-23:00进行例行维护",
    time: "2024-02-20 15:30",
    read: false,
  },
  {
    id: 2,
    title: "作业提醒",
    content: "您有一个作业即将截止，请及时提交",
    time: "2024-02-19 10:00",
    read: true,
  },
]);

const toggleNotification = (setting: NotificationSetting) => {
  setting.enabled = !setting.enabled;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 通知设置 -->
    <CellGroup inset title="通知设置" class="mx-4 mt-4">
      <Cell
        v-for="setting in notificationSettings"
        :key="setting.id"
        :title="setting.title"
        :label="setting.desc"
      >
        <template #right-icon>
          <Switch
            v-model="setting.enabled"
            @click="toggleNotification(setting)"
            class="scale-90"
          />
        </template>
      </Cell>
    </CellGroup>

    <!-- 消息列表 -->
    <CellGroup inset title="最近消息" class="mx-4 mt-4">
      <template v-if="messages.length">
        <Cell
          v-for="msg in messages"
          :key="msg.id"
          :title="msg.title"
          :label="msg.content"
          class="relative"
        >
          <template #value>
            <span class="text-xs text-gray-400">{{ msg.time }}</span>
          </template>
          <div
            v-if="!msg.read"
            class="absolute top-4 right-8 h-2 w-2 rounded-full bg-red-500"
          ></div>
        </Cell>
      </template>
      <template v-else>
        <Empty description="暂无消息" />
      </template>
    </CellGroup>
  </div>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 1;
  padding-right: 16px;
}

:deep(.van-cell__value) {
  flex: none;
}
</style>
