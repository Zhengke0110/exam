<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
    <!-- 头部 -->
    <div class="mb-8 text-center">
      <div class="mb-4 inline-block rounded-full bg-purple-500 p-4">
        <span class="text-3xl text-white">✨</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-800">创建账号</h1>
      <p class="mt-2 text-gray-600">加入我们，开启新的旅程</p>
    </div>

    <!-- 注册表单 -->
    <div class="animate-fade-in rounded-xl bg-white p-6 shadow-lg">
      <Form @submit.prevent="handleRegister">
        <CellGroup inset>
          <Field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请设置用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <Field
            v-model="phone"
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
              { required: true, message: '请填写手机号' },
              { validator: validatePhone, message: '请输入正确的手机号' },
            ]"
          />
          <Field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请设置密码"
            :rules="[
              { required: true, message: '请设置密码' },
              { validator: validatePassword },
            ]"
          />
          <Field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请确认密码"
            :rules="[
              { required: true, message: '请确认密码' },
              { validator: validateConfirmPassword },
            ]"
          />
        </CellGroup>

        <!-- 用户协议 -->
        <div class="mt-4 px-4">
          <Checkbox
            v-model="agreement"
            shape="square"
            class="text-sm text-gray-600"
          >
            我已阅读并同意
            <a href="#" class="text-purple-500">《用户协议》</a>和
            <a href="#" class="text-purple-500">《隐私政策》</a>
          </Checkbox>
        </div>

        <div class="mt-8">
          <Button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loading"
            class="bg-purple-500"
          >
            注册
          </Button>
          <div class="mt-4 text-center">
            <button
              @click="goToLogin"
              class="text-sm text-gray-600 hover:text-purple-500"
            >
              已有账号？返回登录
            </button>
          </div>
        </div>
      </Form>
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
  Checkbox,
} from "vant";

const router = useRouter();
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const agreement = ref(false);
const loading = ref(false);

// 表单验证规则
const validateConfirmPassword = (val: string) => {
  if (val !== password.value) {
    return "两次输入的密码不一致";
  }
  return true;
};

const validatePhone = (val: string) => {
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(val)) {
    return "请输入正确的手机号码";
  }
  return true;
};

const validatePassword = (val: string) => {
  if (val.length < 6) {
    return "密码不能少于6位";
  }
  return true;
};

// 处理注册
const handleRegister = () => {
  if (!agreement.value) {
    showToast("请同意用户协议和隐私政策");
    return;
  }
  loading.value = true;
  // 模拟注册请求
  setTimeout(() => {
    loading.value = false;
    showSuccessToast("暂不支持注册，请联系管理员");
    router.push("/login");
  }, 1500);
};

// 返回登录页
const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
