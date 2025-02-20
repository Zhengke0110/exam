<template>
  <div class="p-4">
    <van-nav-bar
      title="编辑教师"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.teacherName"
          name="teacherName"
          label="姓名"
          placeholder="请输入教师姓名"
          :rules="[{ required: true, message: '请输入教师姓名' }]"
        />
        <van-field
          v-model="formData.cardId"
          name="cardId"
          label="工号"
          placeholder="请输入工号"
          :rules="[{ required: true, message: '请输入工号' }]"
        />
        <van-field
          v-model="formData.institute"
          name="institute"
          label="学院"
          placeholder="请输入所属学院"
          :rules="[{ required: true, message: '请输入所属学院' }]"
        />
        <van-field
          v-model="formData.type"
          name="type"
          label="教师类型"
          placeholder="请输入教师类型"
        />
        <van-field name="sex" label="性别">
          <template #input>
            <van-radio-group v-model="formData.sex" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="formData.tel"
          name="tel"
          label="电话"
          placeholder="请输入联系电话"
          :rules="[{ required: true, message: '请输入联系电话' }]"
        />
        <van-field
          v-model="formData.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱地址"
          :rules="[{ required: true, message: '请输入邮箱地址' }]"
        />
        <van-field v-model="formData.role" name="role" label="角色" disabled />
      </van-cell-group>

      <div class="mt-8">
        <van-button round block type="primary" native-type="submit">
          保存修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  showSuccessToast,
  showFailToast,
  NavBar as VanNavBar,
  Form as VanForm,
  Field as VanField,
  CellGroup as VanCellGroup,
  RadioGroup as VanRadioGroup,
  Radio as VanRadio,
  Button as VanButton,
} from "vant";
import type { TeacherInterface } from "@/store/user";
import { UpdateTeacherApi, GetTeacherByIDApi } from "@/services";

const router = useRouter();

const { teacherId } = defineProps<{ teacherId: string }>();

const formData = reactive<Omit<TeacherInterface, "pwd">>({
  teacherName: "",
  cardId: "",
  institute: "",
  type: "",
  sex: "男",
  tel: "",
  email: "",
  role: "1",
});

// 加载教师数据
const loadTeacherData = async () => {
  try {
    const { data, code } = await GetTeacherByIDApi(Number(teacherId));
    if (code !== 200 || !data || Array.isArray(data)) {
      showFailToast("获取教师信息失败");
      return;
    }

    const { pwd, ...teacherData } = data as TeacherInterface;
    Object.assign(formData, teacherData);
  } catch (error) {
    console.error(error);
    showFailToast("加载数据失败");
  }
};

onMounted(() => {
  loadTeacherData();
});

const onSubmit = async () => {
  try {
    const { code } = await UpdateTeacherApi({
      ...formData,
      teacherId: Number(teacherId), // 确保包含教师ID
      pwd: "123456",
    });

    if (code !== 200) {
      showFailToast("更新失败");
      return;
    }

    showSuccessToast("更新成功");
    router.back();
  } catch (error) {
    console.error(error);
    showFailToast("保存失败");
  }
};
</script>

<style scoped></style>
