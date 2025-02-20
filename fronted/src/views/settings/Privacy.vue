<script setup lang="ts">
import { ref } from "vue";
import { Cell, CellGroup, Switch, Slider } from "vant";

interface PrivacySetting {
  id: number;
  title: string;
  desc: string;
  enabled: boolean;
}

const privacySettings = ref<PrivacySetting[]>([
  {
    id: 1,
    title: "个人信息可见性",
    desc: "允许其他用户查看您的个人信息",
    enabled: true,
  },
  {
    id: 2,
    title: "在线状态",
    desc: "显示您的在线状态",
    enabled: true,
  },
  {
    id: 3,
    title: "学习记录",
    desc: "公开您的学习记录",
    enabled: false,
  },
]);

const sessionTimeout = ref(30);

const toggleSetting = (setting: PrivacySetting) => {
  setting.enabled = !setting.enabled;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 隐私设置 -->
    <CellGroup inset title="隐私设置" class="mx-4 mt-4">
      <Cell
        v-for="setting in privacySettings"
        :key="setting.id"
        :title="setting.title"
        :label="setting.desc"
      >
        <template #right-icon>
          <Switch
            v-model="setting.enabled"
            @click="toggleSetting(setting)"
            class="scale-90"
          />
        </template>
      </Cell>
    </CellGroup>

    <!-- 安全设置 -->
    <CellGroup inset title="安全设置" class="mx-4 mt-4">
      <Cell title="会话超时时间" :value="`${sessionTimeout}分钟`" />
      <Cell>
        <template #title>
          <div class="w-full pr-4">
            <Slider
              v-model="sessionTimeout"
              :min="15"
              :max="120"
              :step="15"
              class="mt-2"
            />
          </div>
        </template>
      </Cell>
    </CellGroup>

    <!-- 数据管理 -->
    <CellGroup inset title="数据管理" class="mx-4 mt-4">
      <Cell title="清除缓存" is-link />
      <Cell title="导出个人数据" is-link />
      <Cell title="删除账号" is-link class="text-red-500" value="谨慎操作" />
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
