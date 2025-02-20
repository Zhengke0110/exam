# 在线考试系统前端设计文档

## 1. 系统概述

### 1.1 项目简介

本系统是一个基于 Vue 3 + TypeScript + Tailwind CSS 的现代化在线考试系统前端项目，采用组件化开发方式，实现了考试管理、题库管理、在线考试、成绩管理等功能。

### 1.2 技术栈

- Vue 3 - 核心框架
- TypeScript - 类型系统
- Tailwind CSS - 样式框架
- Vue Router - 路由管理
- Pinia - 状态管理
- Axios - HTTP 客户端
- ECharts - 数据可视化
- Vant - 移动端组件库

## 2. 角色设计

### 2.1 管理员(Admin)

- 权限级别：最高
- 主要功能：
  - 系统管理
  - 用户管理(教师、学生)
  - 考试管理
  - 题库管理
  - 成绩管理
  - 系统监控

### 2.2 教师(Teacher)

- 权限级别：中等
- 主要功能：
  - 试题管理
  - 试卷管理
  - 考试安排
  - 成绩统计
  - 学生管理

### 2.3 学生(Student)

- 权限级别：普通
- 主要功能：
  - 在线考试
  - 成绩查询
  - 练习测试
  - 个人信息管理

## 3. 功能模块设计

### 3.1 登录模块

- 组件：`LoginView.vue`
- 功能：
  - 多角色登录
  - 记住密码
  - 自动登录
  - 验证码校验
  - 权限控制

### 3.2 考试管理模块

- 组件：`ExamManage.vue`
- 功能：
  - 考试列表管理
  - 考试创建/编辑
  - 考试发布/关闭
  - 考试时间设置
  - 考试规则设置

### 3.3 题库管理模块

- 组件：`QuestionBank.vue`
- 子模块：
  - 选择题管理
  - 判断题管理
  - 填空题管理
- 功能：
  - 题目CRUD
  - 题目分类
  - 题目导入导出
  - 题目难度设置

### 3.4 试卷管理模块

- 组件：`PaperManage.vue`
- 功能：
  - 试卷组装
  - 试卷预览
  - 试卷发布
  - 分数设置
  - 时间限制

### 3.5 在线考试模块

- 组件：`ExamView.vue`
- 功能：
  - 考试倒计时
  - 自动提交
  - 题目导航
  - 答题卡
  - 临时保存

### 3.6 成绩管理模块

- 组件：`ScoreManage.vue`
- 功能：
  - 成绩录入
  - 成绩统计
  - 成绩分析
  - 成绩导出
  - 图表展示

### 3.7 个人中心模块

- 组件：`UserCenter.vue`
- 功能：
  - 个人信息管理
  - 密码修改
  - 考试记录
  - 消息通知

## 4. 数据流设计

### 4.1 状态管理

使用 Pinia 进行状态管理：

```typescript
// 用户状态
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: null,
    role: null
  }),
  actions: {
    // 登录、登出等操作
  }
})

// 考试状态
export const useExamStore = defineStore('exam', {
  state: () => ({
    currentExam: null,
    answers: [],
    timeRemaining: 0
  }),
  actions: {
    // 考试相关操作
  }
})
```

### 4.2 API 调用

使用 Axios 进行 API 调用：

```typescript
// API 配置
const api = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
  withCredentials: true
})

// API 请求封装
export const examAPI = {
  getExamList: () => api.get('/exams'),
  submitExam: (data) => api.post('/exam/submit', data)
}
```

## 5. 组件设计

### 5.1 基础组件

- Button
- Input
- Select
- Modal
- Table
- Form

### 5.2 业务组件

- ExamCard - 考试卡片
- QuestionItem - 题目项
- AnswerSheet - 答题卡
- ScoreChart - 成绩图表
- TimeCounter - 计时器

## 6. 路由设计

```typescript
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'exam',
        component: ExamManage
      },
      // 其他路由...
    ]
  }
]
```

## 7. 权限控制

### 7.1 路由权限

```typescript
const roleRoutes = {
  admin: ['dashboard', 'system', 'user'],
  teacher: ['exam', 'question', 'score'],
  student: ['take-exam', 'my-score']
}
```

### 7.2 功能权限

```typescript
const permissions = {
  admin: ['*'],
  teacher: ['exam:create', 'exam:edit', 'score:view'],
  student: ['exam:take', 'score:view']
}
```

## 8. UI/UX 设计

### 8.1 布局设计

- 响应式设计
- 移动端适配
- 主题定制
- 暗黑模式

### 8.2 交互设计

- loading 状态
- 错误提示
- 操作确认
- 数据验证

## 9. 性能优化

### 9.1 代码优化

- 路由懒加载
- 组件按需加载
- 虚拟滚动
- 防抖节流

### 9.2 资源优化

- 图片懒加载
- 静态资源压缩
- CDN 加速
- 浏览器缓存

## 10. 项目规范

### 10.1 代码规范

- ESLint 配置
- Prettier 格式化
- TypeScript 规范
- 命名规范

### 10.2 提交规范

- Git Flow
- Commit Message
- Code Review
- 版本管理

## 11. 部署方案

### 11.1 构建配置

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    cssCodeSplit: true
  }
})
```

### 11.2 部署策略

- 静态资源部署
- 环境配置
- CI/CD 流程
- 监控告警

## 12. 测试策略

### 12.1 单元测试

- 组件测试
- 工具函数测试
- 状态管理测试

### 12.2 E2E 测试

- 用户流程测试
- 兼容性测试
- 性能测试
