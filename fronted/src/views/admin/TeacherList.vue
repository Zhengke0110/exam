<template>
  <div class="p-4">
    <van-search v-model="searchValue" placeholder="搜索教师" />

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group inset>
        <van-swipe-cell v-for="item in list" :key="item.teacherId">
          <van-cell
            :title="`${item.teacherName} (${item.type || '未设置类型'})`"
            :label="`${item.institute} | 工号: ${item.cardId || '未设置'}`"
          >
            <template #value>
              <div class="space-y-1 text-right">
                <div
                  :class="item.sex === '男' ? 'text-blue-500' : 'text-pink-500'"
                >
                  {{ item.sex }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ item.email }}
                </div>
              </div>
            </template>
          </van-cell>
          <template #right>
            <div class="flex h-full flex-col">
              <van-button
                square
                type="primary"
                class="flex-1 !rounded-none transition-colors duration-300 hover:bg-blue-600"
                @click="handleEdit(item.teacherId!)"
              >
                <template #default>
                  <div class="flex h-full items-center px-6">
                    <i class="fas fa-edit mr-2"></i>
                    编辑
                  </div>
                </template>
              </van-button>
              <van-button
                square
                type="danger"
                class="flex-1 !rounded-none border-t border-white/10 transition-colors duration-300 hover:bg-red-600"
                @click="handleDelete(item.teacherId!)"
              >
                <template #default>
                  <div class="flex h-full items-center px-6">
                    <i class="fas fa-trash-alt mr-2"></i>
                    删除
                  </div>
                </template>
              </van-button>
            </div>
          </template>
        </van-swipe-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  showConfirmDialog,
  Search as VanSearch,
  List as VanList,
  CellGroup as VanCellGroup,
  SwipeCell as VanSwipeCell,
  Cell as VanCell,
  Button as VanButton,
} from "vant";
import type { TeacherInterface } from "@/store/user";
import { GetAllTeacherApi, DeleteTeacherApi } from "@/services";
const router = useRouter();
const searchValue = ref("");
const loading = ref(false);
const finished = ref(false);
const list = ref<TeacherInterface[]>([]);
interface StudentResponse {
  records: TeacherInterface[];
}

interface ApiResult {
  data?: any;
}

const onLoad = async () => {
  try {
    const response = (await GetAllTeacherApi()) as ApiResult;
    const data = response.data as unknown as StudentResponse;
    if (data && data.records) {
      list.value = data.records;
    }
    loading.value = false;
    finished.value = true;
  } catch (error) {
    console.error("获取教师列表失败:", error);
    loading.value = false;
    finished.value = true;
  }
};

const handleDelete = async (teacherId: number) => {
  try {
    await showConfirmDialog({
      title: "确认删除",
      message: "是否确认删除该教师？此操作不可恢复！",
      confirmButtonText: "确认删除",
      confirmButtonColor: "#EF4444",
    });
    const { code } = await DeleteTeacherApi(teacherId);
    if (code !== 200) {
      throw new Error("删除教师失败");
    }
    await onLoad();
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = async (teacherId: number) => {
  try {
    router.push(`/admin/edit-teacher/${teacherId}`);
  } catch (error) {
    console.error("跳转编辑页面失败:", error);
  }
};
</script>

<style scoped>
/* 添加按钮组样式 */
.van-button {
  min-width: 90px;
  height: 50% !important;
}
</style>
