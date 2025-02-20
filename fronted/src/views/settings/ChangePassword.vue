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
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);

// 表单验证规则
const validateNewPassword = (val: string) => {
  if (val.length < 6) {
    return "新密码不能少于6位";
  }
  return true;
};

const validateConfirmPassword = (val: string) => {
  if (val !== newPassword.value) {
    return "两次输入的密码不一致";
  }
  return true;
};

// 处理修改密码
const handleChangePassword = () => {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    showToast("请填写完整信息");
    return;
  }

  loading.value = true;
  // TODO: 调用修改密码 API
  setTimeout(() => {
    loading.value = false;
    showSuccessToast("密码修改成功");
    router.back();
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="animate-fade-in rounded-xl bg-white p-6 shadow-lg">
      <Form @submit.prevent="handleChangePassword">
        <CellGroup inset>
          <Field
            v-model="oldPassword"
            type="password"
            name="oldPassword"
            label="原密码"
            placeholder="请输入原密码"
            :rules="[{ required: true, message: '请输入原密码' }]"
          />
          <Field
            v-model="newPassword"
            type="password"
            name="newPassword"
            label="新密码"
            placeholder="请输入新密码"
            :rules="[
              { required: true, message: '请输入新密码' },
              { validator: validateNewPassword },
            ]"
          />
          <Field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请确认新密码"
            :rules="[
              { required: true, message: '请确认新密码' },
              { validator: validateConfirmPassword },
            ]"
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
            确认修改
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
