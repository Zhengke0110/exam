# 在线考试系统架构设计文档

## 1. 系统概述

### 1.1 系统简介

本系统是一个基于 SpringBoot + Vue 的在线考试系统，采用前后端分离架构，实现了考试管理、题库管理、考试练习、成绩管理等功能。系统使用 SpringBoot 2.1.2 作为后端框架，集成了 MyBatis-Plus、Druid 等主流框架和中间件。

### 1.2 系统目标

- 提供便捷的在线考试平台
- 实现试题管理的信息化
- 提供客观题自动评分功能
- 支持多角色用户管理
- 实现考试过程的规范化管理

## 2. 技术架构

### 2.1 技术栈

#### 2.1.1 后端技术栈

- 核心框架：SpringBoot 2.1.2
- ORM 框架：MyBatis-Plus 3.1.0
- 数据库连接池：Druid 1.1.8
- 项目管理工具：Maven
- 数据库：MySQL
- 开发语言：Java 8

#### 2.1.2 前端技术栈

- 前端框架：Vue.js
- UI 组件库：Element UI
- 构建工具：Vue CLI
- HTTP 客户端：Axios

### 2.2 系统分层

1. 表现层（Controller 层）

   - 位于 fun.timu.exam.controller 包
   - 处理 HTTP 请求
   - 数据校验和转换
   - 返回统一格式的响应

2. 业务层（Service 层）

   - 位于 fun.timu.exam.service 包
   - 实现业务逻辑
   - 事务管理
   - 数据组装

3. 持久层（Mapper 层）

   - 位于 fun.timu.exam.mapper 包
   - 数据库操作接口
   - MyBatis 映射文件
   - 数据访问对象

4. 实体层（Entity 层）
   - 位于 fun.timu.exam.entity 包
   - 数据库实体类
   - 数据传输对象（DTO）
   - 视图对象（VO）

## 3. 功能模块设计

### 3.1 用户管理模块

- 管理员管理（AdminController）
- 教师管理（TeacherController）
- 学生管理（StudentController）
- 权限控制（基于角色的访问控制）

### 3.2 试题管理模块

- 选择题管理（MultiQuestionController）
- 判断题管理（JudgeQuestionController）
- 填空题管理（FillQuestionController）
- 题库维护和导入导出

### 3.3 考试管理模块

- 试卷管理（PaperManageController）
- 考试安排（ExamManageController）
- 考试控制
- 自动评分

### 3.4 成绩管理模块

- 成绩录入
- 成绩统计
- 成绩分析
- 成绩导出

## 4. 数据库设计

### 4.1 核心数据表

1. 用户相关表

   - admin（管理员信息表）
   - teacher（教师信息表）
   - student（学生信息表）

2. 试题相关表

   - multi_question（选择题题库）
   - judge_question（判断题题库）
   - fill_question（填空题题库）

3. 考试相关表

   - exam_manage（考试管理表）
   - paper_manage（试卷管理表）

4. 交互相关表
   - message（留言表）

### 4.2 表关系说明

- exam_manage 与 paper_manage：一对多关系
- paper_manage 与各题库表：多对多关系
- admin/teacher/student 与 exam_manage：多对多关系

## 5. 系统配置

### 5.1 核心配置

```yaml
server:
  port: 8080

spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis-plus:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: fun.timu.exam.entity
```

### 5.2 安全配置

- 跨域配置（CorsConfig）
- 权限拦截器
- 数据库连接池配置
- 全局异常处理

## 6. 部署架构

### 6.1 开发环境

- JDK：Java 8
- IDE：IntelliJ IDEA
- 数据库：MySQL 5.7+
- 构建工具：Maven 3.6+

### 6.2 生产环境

- 操作系统：Linux/Windows
- 应用服务器：内嵌 Tomcat
- 数据库服务器：MySQL
- 反向代理：Nginx

### 6.3 部署流程

1. 环境准备

   - JDK 安装配置
   - MySQL 数据库安装
   - Nginx 安装配置

2. 应用部署
   - 数据库脚本执行
   - 后端服务部署
   - 前端资源部署
   - Nginx 配置

## 7. 系统优化

### 7.1 性能优化

- 数据库索引优化
- 连接池配置优化
- 缓存使用策略
- SQL 语句优化

### 7.2 安全优化

- 参数校验
- SQL 注入防护
- XSS 防护
- 权限控制

## 8. 扩展性设计

### 8.1 代码扩展

- 模块化设计
- 接口抽象
- 配置外部化
- 插件化架构

### 8.2 架构扩展

- 微服务架构预留
- 分布式部署支持
- 容器化部署支持
- 云原生架构支持

## 9. 开发规范

### 9.1 代码规范

- 遵循阿里巴巴 Java 开发手册
- 统一的代码格式化配置
- 规范的命名约定
- 完善的注释文档

### 9.2 开发流程

- 版本控制规范
- 代码审查流程
- 测试规范
- 发布流程

## 10. 系统监控

### 10.1 监控指标

- 系统性能监控
- 用户行为监控
- 接口调用监控
- 数据库监控

### 10.2 日志管理

- 业务日志
- 错误日志
- 安全日志
- 性能日志

## 11. 项目管理

### 11.1 版本控制

- 使用 Git 进行版本控制
- 分支管理策略
- 代码合并规范
- 版本发布流程

### 11.2 文档管理

- 架构文档
- API 文档
- 数据库文档
- 部署文档

## 12. 总结

本系统采用现代化的技术栈和最佳实践，实现了一个功能完善、性能优良的在线考试系统。通过合理的架构设计和模块划分，系统具有良好的可维护性和扩展性。后续可以根据实际需求，在此基础上进行功能扩展和性能优化。
