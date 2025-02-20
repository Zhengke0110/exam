<template>
  <div class="p-4">
    <van-nav-bar
      title="添加学生"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
    />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.studentName"
          name="studentName"
          label="姓名"
          placeholder="请输入学生姓名"
          :rules="[{ required: true, message: '请输入学生姓名' }]"
        />
        <van-field
          v-model="formData.institute"
          name="institute"
          label="学院"
          placeholder="请输入所属学院"
          :rules="[{ required: true, message: '请输入所属学院' }]"
        />
        <van-field
          v-model="formData.major"
          name="major"
          label="专业"
          placeholder="请输入专业"
          :rules="[{ required: true, message: '请输入专业' }]"
        />
        <van-field
          v-model="formData.grade"
          name="grade"
          label="年级"
          placeholder="请输入年级"
          :rules="[{ required: true, message: '请输入年级' }]"
        />
        <van-field
          v-model="formData.clazz"
          name="clazz"
          label="班级"
          placeholder="请输入班级"
          :rules="[{ required: true, message: '请输入班级' }]"
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
          v-model="formData.cardId"
          name="cardId"
          label="学号"
          placeholder="请输入学号"
          :rules="[{ required: true, message: '请输入学号' }]"
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
import type { StudentInterface } from "@/store/user";
import { AddStudentApi } from "@/services";

const router = useRouter();

const formData = reactive<StudentInterface>({
  studentName: "",
  cardId: "",
  institute: "",
  major: "",
  grade: "",
  clazz: "",
  sex: "男",
  tel: "",
  email: "",
  pwd: "",
  role: "2", // 默认角色为学生
});

const onSubmit = async (values: StudentInterface) => {
  try {
    const { code } = await AddStudentApi(values);
    if (code !== 200) throw new Error("添加失败");
    showSuccessToast("添加成功");
    router.back();
  } catch (error) {
    console.error(error);
  }
};
</script>
