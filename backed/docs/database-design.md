# 在线考试系统数据库设计文档

## 1. 整体 ER 图

```mermaid
erDiagram
    ADMIN ||--o{ EXAM_MANAGE : manages
    TEACHER ||--o{ EXAM_MANAGE : creates
    STUDENT ||--o{ SCORE : achieves
    EXAM_MANAGE ||--|{ PAPER_MANAGE : contains
    PAPER_MANAGE ||--o{ MULTI_QUESTION : includes
    PAPER_MANAGE ||--o{ JUDGE_QUESTION : includes
    PAPER_MANAGE ||--o{ FILL_QUESTION : includes
    STUDENT ||--o{ MESSAGE : posts
    MESSAGE ||--o{ REPLAY : has

    ADMIN {
        int adminId PK
        string adminName
        string sex
        string tel
        string email
        string pwd
        string cardId
        string role
    }

    TEACHER {
        int teacherId PK
        string teacherName
        string institute
        string sex
        string tel
        string email
        string pwd
        string cardId
        string type
        string role
    }

    STUDENT {
        int studentId PK
        string studentName
        string grade
        string major
        string clazz
        string institute
        string tel
        string email
        string pwd
        string cardId
        string sex
        string role
    }

    EXAM_MANAGE {
        int examCode PK
        string description
        string source
        int paperId
        string examDate
        int totalTime
        string grade
        string term
        string major
        string institute
        int totalScore
        string type
        string tips
    }

    PAPER_MANAGE {
        int paperId FK
        int questionType
        int questionId
    }

    MULTI_QUESTION {
        int questionId PK
        string subject
        string question
        string answerA
        string answerB
        string answerC
        string answerD
        string rightAnswer
        string analysis
        int score
        string section
        string level
    }

    JUDGE_QUESTION {
        int questionId PK
        string subject
        string question
        string answer
        string analysis
        int score
        string level
        string section
    }

    FILL_QUESTION {
        int questionId PK
        string subject
        string question
        string answer
        string analysis
        int score
        string level
        string section
    }

    SCORE {
        int scoreId PK
        int examCode FK
        int studentId FK
        string subject
        int ptScore
        int etScore
        int score
        string answerDate
    }

    MESSAGE {
        int id PK
        string title
        string content
        date time
    }

    REPLAY {
        int messageId FK
        int replayId PK
        string replay
        date replayTime
    }
```

## 2. 数据表结构

### 2.1 管理员表(admin)

| 字段名    | 类型    | 长度 | 允许空 | 主键 | 说明                           |
| --------- | ------- | ---- | ------ | ---- | ------------------------------ |
| adminId   | int     | 9    | 否     | 是   | ID 号                          |
| adminName | varchar | 20   | 是     | 否   | 姓名                           |
| sex       | varchar | 2    | 是     | 否   | 性别                           |
| tel       | varchar | 11   | 是     | 否   | 电话号码                       |
| email     | varchar | 20   | 是     | 否   | 电子邮箱                       |
| pwd       | varchar | 16   | 是     | 否   | 密码                           |
| cardId    | varchar | 18   | 是     | 否   | 身份证号                       |
| role      | varchar | 1    | 是     | 否   | 角色(0 管理员，1 教师，2 学生) |

### 2.2 教师表(teacher)

| 字段名      | 类型    | 长度 | 允许空 | 主键 | 说明     |
| ----------- | ------- | ---- | ------ | ---- | -------- |
| teacherId   | int     | 9    | 否     | 是   | ID       |
| teacherName | varchar | 20   | 是     | 否   | 姓名     |
| institute   | varchar | 20   | 是     | 否   | 学院     |
| sex         | varchar | 2    | 是     | 否   | 性别     |
| tel         | varchar | 11   | 是     | 否   | 电话号码 |
| email       | varchar | 20   | 是     | 否   | 邮箱     |
| pwd         | varchar | 16   | 是     | 否   | 密码     |
| cardId      | varchar | 18   | 是     | 否   | 身份证号 |
| type        | varchar | 20   | 是     | 否   | 职称     |
| role        | varchar | 1    | 是     | 否   | 角色     |

### 2.3 学生表(student)

| 字段名      | 类型    | 长度 | 允许空 | 主键 | 说明     |
| ----------- | ------- | ---- | ------ | ---- | -------- |
| studentId   | int     | 9    | 否     | 是   | ID       |
| studentName | varchar | 20   | 是     | 否   | 姓名     |
| grade       | varchar | 4    | 是     | 否   | 年级     |
| major       | varchar | 20   | 是     | 否   | 专业     |
| clazz       | varchar | 10   | 是     | 否   | 班级     |
| institute   | varchar | 30   | 是     | 否   | 学院     |
| tel         | varchar | 11   | 是     | 否   | 电话号码 |
| email       | varchar | 30   | 是     | 否   | 电子邮件 |
| pwd         | varchar | 16   | 是     | 否   | 密码     |
| cardId      | varchar | 18   | 是     | 否   | 身份证号 |
| sex         | varchar | 2    | 是     | 否   | 性别     |
| role        | varchar | 1    | 是     | 否   | 角色     |

## 3. 单独 ER 图

### 3.1 用户管理模块

```mermaid
erDiagram
    ADMIN {
        int adminId PK "管理员ID"
        string adminName "姓名"
        string sex "性别"
        string tel "电话"
        string email "邮箱"
        string pwd "密码"
        string cardId "身份证"
        string role "角色"
    }

    TEACHER {
        int teacherId PK "教师ID"
        string teacherName "姓名"
        string institute "学院"
        string sex "性别"
        string tel "电话"
        string email "邮箱"
        string pwd "密码"
        string cardId "身份证"
        string type "职称"
        string role "角色"
    }

    STUDENT {
        int studentId PK "学生ID"
        string studentName "姓名"
        string grade "年级"
        string major "专业"
        string clazz "班级"
        string institute "学院"
        string tel "电话"
        string email "邮箱"
        string pwd "密码"
        string cardId "身份证"
        string sex "性别"
        string role "角色"
    }
```

### 3.2 考试管理模块

```mermaid
erDiagram
    EXAM_MANAGE {
        int examCode PK "考试编号"
        string description "考试介绍"
        string source "课程名称"
        int paperId "试卷编号"
        string examDate "考试日期"
        int totalTime "持续时长"
        string grade "年级"
        string term "学期"
        string major "专业"
        string institute "学院"
        int totalScore "总分"
        string type "考试类型"
        string tips "考试须知"
    }

    PAPER_MANAGE {
        int paperId FK "试卷编号"
        int questionType "题目类型"
        int questionId "题目编号"
    }
```

### 3.3 题库管理模块

```mermaid
erDiagram
    MULTI_QUESTION {
        int questionId PK "题目编号"
        string subject "考试科目"
        string question "题目内容"
        string answerA "选项A"
        string answerB "选项B"
        string answerC "选项C"
        string answerD "选项D"
        string rightAnswer "正确答案"
        string analysis "题目解析"
        int score "分数"
        string section "所属章节"
        string level "难度等级"
    }

    JUDGE_QUESTION {
        int questionId PK "题目编号"
        string subject "考试科目"
        string question "题目内容"
        string answer "正确答案"
        string analysis "题目解析"
        int score "分数"
        string level "难度等级"
        string section "所属章节"
    }

    FILL_QUESTION {
        int questionId PK "题目编号"
        string subject "考试科目"
        string question "题目内容"
        string answer "正确答案"
        string analysis "题目解析"
        int score "分数"
        string level "难度等级"
        string section "所属章节"
    }
```

### 3.4 成绩管理模块

```mermaid
erDiagram
    SCORE {
        int scoreId PK "分数编号"
        int examCode FK "考试编号"
        int studentId FK "学号"
        string subject "课程名称"
        int ptScore "平时成绩"
        int etScore "期末成绩"
        int score "总成绩"
        string answerDate "答题日期"
    }
```

### 3.5 交互管理模块

```mermaid
erDiagram
    MESSAGE {
        int id PK "留言编号"
        string title "标题"
        string content "留言内容"
        date time "留言时间"
    }

    REPLAY {
        int messageId FK "留言编号"
        int replayId PK "回复编号"
        string replay "内容"
        date replayTime "回复时间"
    }

    MESSAGE ||--o{ REPLAY : has
```
