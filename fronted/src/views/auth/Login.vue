<template>
  <div
    class="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white px-4 py-8"
  >
    <!-- Logo 区域 -->
    <div class="mb-8 text-center">
      <div class="mb-4 inline-block rounded-full bg-blue-500 p-4">
        <span class="text-3xl text-white">🚀</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-800">欢迎回来</h1>
      <p class="mt-2 text-gray-600">请登录您的账号</p>
    </div>

    <!-- 登录表单 -->
    <div
      class="rounded-xl bg-white p-6 shadow-lg transition-all duration-500"
      :style="{ opacity: formOpacity }"
    >
      <Form @submit="handleLogin">
        <CellGroup inset>
          <Field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <Field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </CellGroup>

        <div class="mt-8">
          <Button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loading"
            class="bg-blue-500"
          >
            登录
          </Button>
        </div>
      </Form>

      <!-- 其他登录选项 -->
      <div class="mt-6 flex items-center justify-between">
        <button class="text-sm text-gray-600">忘记密码？</button>
        <button
          @click="goToRegister"
          class="text-sm font-medium text-blue-500 hover:text-blue-600"
        >
          注册账号
        </button>
      </div>
    </div>

    <!-- 社交登录 -->
    <div class="mt-8 text-center">
      <p class="mb-4 text-sm text-gray-500">其他登录方式</p>
      <div class="flex justify-center space-x-6">
        <button
          class="rounded-full bg-gray-100 p-3 transition hover:bg-gray-200"
        >
          <span class="text-xl">📱</span>
        </button>
        <button
          class="rounded-full bg-gray-100 p-3 transition hover:bg-gray-200"
        >
          <span class="text-xl">💬</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Form,
  Field,
  CellGroup,
  Button,
  showToast,
  showSuccessToast,
} from "vant";
import { LoginApi } from "@/services";
import { useUserStore } from "@/store/user";
const router = useRouter();
const username = ref<number>();
const password = ref("");
const loading = ref(false);
const formOpacity = ref(0);
const userStore = useUserStore();

// Updated login handler
const handleLogin = async (values: { username: number; password: string }) => {
  if (!values.username || !values.password) {
    showToast("请填写完整信息");
    return;
  }

  loading.value = true;
  try {
    const res = await LoginApi({
      username: values.username,
      password: values.password,
    });
    userStore.setLoginInfo(res.data);
    showSuccessToast("登录成功");
    router.push("/home");
  } catch (error) {
    console.error("登录失败:", error);
    showToast("登录失败，请重试");
  } finally {
    loading.value = false;
  }
};

// 跳转到注册页面
const goToRegister = () => {
  router.push("/register");
};

// 组件挂载后开始动画
setTimeout(() => {
  formOpacity.value = 1;
}, 100);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
