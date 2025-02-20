# 在线考试系统前端模块设计文档

## 1. 项目结构

```bash
src/
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── base/       # 基础组件
│   └── business/   # 业务组件
├── generated/       # API生成的类型定义和服务
├── layout/         # 布局组件
│   └── BasicLayout.vue
├── router/         # 路由配置
├── store/          # 状态管理
├── utils/          # 工具函数
└── views/          # 页面组件
```

## 2. 核心模块设计

### 2.1 用户认证模块

- **组件**: `views/login/LoginView.vue`
- **类型定义**:

```typescript
// 从 generated/models/Login.ts
export type Login = {
    username: string;
    password: string;
    role: string;
};

// 从 generated/models/ApiResult.ts
export type ApiResult = {
    code?: number;
    message?: string;
    data?: any;
};
```

- **状态管理**:

```typescript
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    userInfo: null,
    role: null
  }),
  actions: {
    async login(form: Login) {
      const res = await DefaultService.login(form);
      if (res.code === 200) {
        this.token = res.data.token;
        this.userInfo = res.data.userInfo;
        this.role = form.role;
      }
      return res;
    }
  },
  persist: true
});
```

### 2.2 考试管理模块

- **组件**: `views/exam/ExamManage.vue`
- **类型定义**:

```typescript
// 从 generated/models/ExamManage.ts
export type ExamManage = {
    examCode?: number;
    description?: string;
    source?: string;
    paperId?: number;
    examDate?: string;
    totalTime?: number;
    grade?: string;
    term?: string;
    major?: string;
    institute?: string;
    totalScore?: number;
    type?: string;
    tips?: string;
};
```

- **API服务**:

```typescript
// 考试相关API封装
export const examAPI = {
  getList: (params: any) => DefaultService.getExams(params),
  create: (exam: ExamManage) => DefaultService.addExam(exam),
  update: (exam: ExamManage) => DefaultService.updateExam(exam),
  delete: (examCode: number) => DefaultService.deleteExam(examCode)
};
```

### 2.3 题库管理模块

- **组件结构**:

```bash
views/question/
├── MultiQuestion.vue  # 选择题管理
├── JudgeQuestion.vue  # 判断题管理
└── FillQuestion.vue   # 填空题管理
```

- **类型定义**:

```typescript
// 从 generated/models/
export type MultiQuestion = {
    questionId?: number;
    subject?: string;
    question?: string;
    answerA?: string;
    answerB?: string;
    answerC?: string;
    answerD?: string;
    rightAnswer?: string;
    analysis?: string;
    score?: number;
    section?: string;
    level?: string;
};

export type JudgeQuestion = {
    questionId?: number;
    subject?: string;
    question?: string;
    answer?: string;
    analysis?: string;
    score?: number;
    level?: string;
    section?: string;
};

export type FillQuestion = {
    questionId?: number;
    subject?: string;
    question?: string;
    answer?: string;
    analysis?: string;
    score?: number;
    level?: string;
    section?: string;
};
```

### 2.4 成绩管理模块

- **组件**: `views/score/ScoreManage.vue`
- **类型定义**:

```typescript
// 从 generated/models/Score.ts
export type Score = {
    scoreId?: number;
    examCode?: number;
    studentId?: number;
    subject?: string;
    ptScore?: number;
    etScore?: number;
    score?: number;
    answerDate?: string;
};
```

- **图表组件**:

```typescript
// 成绩统计图表
interface ScoreChart {
  type: 'line' | 'bar' | 'pie';
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
  options: EChartsOption;
}
```

## 3. 路由设计

```typescript
// router/index.ts
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: { layout: 'blank' }
  },
  {
    path: '/',
    component: BasicLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'exam',
        name: 'ExamManage',
        component: () => import('@/views/exam/ExamManage.vue'),
        meta: { roles: ['admin', 'teacher'] }
      },
      // 其他路由配置...
    ]
  }
];
```

## 4. 权限控制

```typescript
// router/permission.ts
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      next('/login');
      return;
    }

    if (to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      next('/403');
      return;
    }
  }

  next();
});
```

## 5. 请求封装

```typescript
// utils/request.ts
import axios from 'axios';
import { OpenAPI } from '@/generated';

const request = axios.create({
  baseURL: OpenAPI.BASE,
  timeout: 5000,
  withCredentials: true
});

request.interceptors.request.use(
  config => {
    const token = useAuthStore().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

request.interceptors.response.use(
  response => response.data,
  error => {
    // 错误处理
    return Promise.reject(error);
  }
);
```

## 6. 组件设计

### 6.1 基础组件

```vue
<!-- components/base/Button.vue -->
<template>
  <button class="btn" :class="[type, size, { disabled }]" @click="handleClick">
    <slot></slot>
  </button>
</template>
```

### 6.2 业务组件

```vue
<!-- components/business/QuestionCard.vue -->
<template>
  <div class="question-card">
    <div class="question-content">
      {{ question.content }}
    </div>
    <div class="options" v-if="question.type === 'multi'">
      <!-- 选项渲染 -->
    </div>
  </div>
</template>
```

## 7. 工具函数

```typescript
// utils/index.ts
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const calculateScore = (answers: Answer[], standard: Answer[]): number => {
  return answers.reduce((total, answer, index) => {
    return total + (answer === standard[index] ? 1 : 0);
  }, 0);
};
```

## 8. 构建配置

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
```
