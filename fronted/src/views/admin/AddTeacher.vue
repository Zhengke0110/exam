<template>
  <div class="p-4">
    <van-nav-bar
      title="添加教师"
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
        <van-field
          v-model="formData.pwd"
          name="pwd"
          type="password"
          label="初始密码"
          placeholder="请输入初始密码"
          :rules="[{ required: true, message: '请输入初始密码' }]"
        />
      </van-cell-group>

      <div class="mt-8">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  showSuccessToast,
  NavBar as VanNavBar,
  Form as VanForm,
  Field as VanField,
  CellGroup as VanCellGroup,
  RadioGroup as VanRadioGroup,
  Radio as VanRadio,
  Button as VanButton,
} from "vant";
import type { TeacherInterface } from "@/store/user";
import { AddTeacherApi } from "@/services";

const router = useRouter();

const formData = reactive<TeacherInterface>({
  teacherName: "",
  cardId: "",
  institute: "",
  type: "",
  sex: "男",
  tel: "",
  email: "",
  pwd: "",
  role: "1", // 默认角色为教师
});

const onSubmit = async (values: TeacherInterface) => {
  // 这里添加创建教师的API调用
  try {
    const { code } = await AddTeacherApi(values);
    if (code !== 200) throw new Error("添加失败");
    showSuccessToast("添加成功");
    router.back();
  } catch (error) {
    console.error(error);
  }
};
</script>
