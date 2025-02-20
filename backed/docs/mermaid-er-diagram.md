# 在线考试系统 ER 图设计（Mermaid 版）

## 1. 用户管理模块

### 1.1 用户关系图

```mermaid
erDiagram
    ADMIN ||--o{ EXAM_MANAGE : "管理"
    TEACHER ||--o{ EXAM_MANAGE : "创建"
    STUDENT ||--o{ SCORE : "获得"
    STUDENT ||--o{ MESSAGE : "发布"

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

## 2. 考试管理模块

### 2.1 考试与试卷关系

```mermaid
erDiagram
    EXAM_MANAGE ||--|{ PAPER_MANAGE : "包含"
    PAPER_MANAGE ||--o{ MULTI_QUESTION : "包含"
    PAPER_MANAGE ||--o{ JUDGE_QUESTION : "包含"
    PAPER_MANAGE ||--o{ FILL_QUESTION : "包含"

    EXAM_MANAGE {
        int examCode PK "考试编号"
        string description "考试介绍"
        string source "课程名称"
        int paperId FK "试卷编号"
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
        int paperId PK "试卷编号"
        int questionType "题目类型"
        int questionId FK "题目编号"
    }
```

## 3. 题库管理模块

### 3.1 试题关系图

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

## 4. 成绩管理模块

### 4.1 成绩关系图

```mermaid
erDiagram
    STUDENT ||--o{ SCORE : "获得"
    EXAM_MANAGE ||--o{ SCORE : "包含"

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

## 5. 交互管理模块

### 5.1 留言回复关系图

```mermaid
erDiagram
    MESSAGE ||--o{ REPLAY : "包含"
    STUDENT ||--o{ MESSAGE : "发布"

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
```

## 关系说明

1. 一对多关系(||--o{)：

   - 管理员对考试管理
   - 教师对考试管理
   - 学生对成绩
   - 考试管理对试卷
   - 试卷对题目
   - 学生对留言
   - 留言对回复

2. 实体属性说明：

   - PK: 主键(Primary Key)
   - FK: 外键(Foreign Key)

3. 关系类型：
   - ||--o{ : 一对多
   - ||--|{ : 一对多(必需)
   - }o--o{ : 多对多
   - |o--o| : 一对一
