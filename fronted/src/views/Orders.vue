<script setup lang="ts">
import { ref } from "vue";
import { Tabs, Tab, Card } from "vant";

const active = ref(0);
const orders = [
  {
    id: 1,
    status: "待付款",
    title: "商品1",
    price: "99.00",
    time: "2024-02-20",
  },
  {
    id: 2,
    status: "待发货",
    title: "商品2",
    price: "199.00",
    time: "2024-02-19",
  },
  {
    id: 3,
    status: "已完成",
    title: "商品3",
    price: "299.00",
    time: "2024-02-18",
  },
];
</script>

<template>
  <div class="h-full bg-gray-100">
    <Tabs v-model:active="active" sticky>
      <Tab title="全部">
        <div class="p-4">
          <Card v-for="order in orders" :key="order.id" class="mb-4">
            <template #title>
              <div class="flex items-center justify-between">
                <span>订单号: {{ order.id }}</span>
                <span class="text-orange-500">{{ order.status }}</span>
              </div>
            </template>
            <div class="py-2">
              <div class="flex items-center justify-between">
                <span>{{ order.title }}</span>
                <span class="text-red-500">￥{{ order.price }}</span>
              </div>
              <div class="mt-2 text-sm text-gray-500">
                下单时间: {{ order.time }}
              </div>
            </div>
          </Card>
        </div>
      </Tab>
      <Tab title="待付款">
        <div class="p-4">
          <!-- 待付款订单内容 -->
        </div>
      </Tab>
      <Tab title="待发货">
        <div class="p-4">
          <!-- 待发货订单内容 -->
        </div>
      </Tab>
      <Tab title="已完成">
        <div class="p-4">
          <!-- 已完成订单内容 -->
        </div>
      </Tab>
    </Tabs>
  </div>
</template>
