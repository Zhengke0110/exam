# 在线考试系统标准 ER 图设计

## 1. 用户管理模块

### 1.1 管理员实体 ER 图

```mermaid
graph TD
    %% 实体
    Admin[管理员]

    %% 属性
    AdminId((adminId))
    AdminName((姓名))
    Sex((性别))
    Tel((电话))
    Email((邮箱))
    Pwd((密码))
    CardId((身份证))
    Role((角色))

    %% 连接关系
    Admin --- AdminId
    Admin --- AdminName
    Admin --- Sex
    Admin --- Tel
    Admin --- Email
    Admin --- Pwd
    Admin --- CardId
    Admin --- Role

    %% 主键标识
    AdminId -.- PK[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class Admin entity
    class AdminId,AdminName,Sex,Tel,Email,Pwd,CardId,Role attribute
    class PK key
```

### 1.2 教师实体 ER 图

```mermaid
graph TD
    %% 实体
    Teacher[教师]

    %% 属性
    TeacherId((teacherId))
    TeacherName((姓名))
    Institute((学院))
    Sex((性别))
    Tel((电话))
    Email((邮箱))
    Pwd((密码))
    CardId((身份证))
    Type((职称))
    Role((角色))

    %% 连接关系
    Teacher --- TeacherId
    Teacher --- TeacherName
    Teacher --- Institute
    Teacher --- Sex
    Teacher --- Tel
    Teacher --- Email
    Teacher --- Pwd
    Teacher --- CardId
    Teacher --- Type
    Teacher --- Role

    %% 主键标识
    TeacherId -.- PK[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class Teacher entity
    class TeacherId,TeacherName,Institute,Sex,Tel,Email,Pwd,CardId,Type,Role attribute
    class PK key
```

## 2. 考试管理模块

### 2.1 考试管理 ER 图

```mermaid
graph TD
    %% 实体
    ExamManage[考试管理]
    PaperManage[试卷管理]

    %% 关系
    Relationship{包含}

    %% 属性
    ExamCode((考试编号))
    Description((考试介绍))
    Source((课程名称))
    PaperId((试卷编号))
    ExamDate((考试日期))
    TotalTime((持续时长))
    Grade((年级))
    Term((学期))
    Major((专业))
    Institute((学院))
    TotalScore((总分))
    Type((考试类型))
    Tips((考试须知))

    %% 连接关系
    ExamManage --- Relationship
    Relationship --- PaperManage

    ExamManage --- ExamCode
    ExamManage --- Description
    ExamManage --- Source
    ExamManage --- PaperId
    ExamManage --- ExamDate
    ExamManage --- TotalTime
    ExamManage --- Grade
    ExamManage --- Term
    ExamManage --- Major
    ExamManage --- Institute
    ExamManage --- TotalScore
    ExamManage --- Type
    ExamManage --- Tips

    %% 主键和外键标识
    ExamCode -.- PK[主键]
    PaperId -.- FK[外键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef relationship fill:#ffd,stroke:#333,stroke-width:1px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class ExamManage,PaperManage entity
    class Relationship relationship
    class ExamCode,Description,Source,PaperId,ExamDate,TotalTime,Grade,Term,Major,Institute,TotalScore,Type,Tips attribute
    class PK,FK key
```

### 2.2 试题关系 ER 图

```mermaid
graph TD
    %% 实体
    MultiQuestion[选择题]
    JudgeQuestion[判断题]
    FillQuestion[填空题]
    PaperManage[试卷管理]

    %% 关系
    Contains1{包含}
    Contains2{包含}
    Contains3{包含}

    %% 试卷管理属性
    PaperId((试卷编号))
    QuestionType((题目类型))
    QuestionId((题目编号))

    %% 选择题属性
    MQId((题目编号))
    MQSubject((考试科目))
    MQQuestion((题目内容))
    AnswerA((选项A))
    AnswerB((选项B))
    AnswerC((选项C))
    AnswerD((选项D))
    RightAnswer((正确答案))

    %% 连接关系
    PaperManage --- Contains1
    PaperManage --- Contains2
    PaperManage --- Contains3
    Contains1 --- MultiQuestion
    Contains2 --- JudgeQuestion
    Contains3 --- FillQuestion

    %% 主键和外键标识
    PaperId -.- PK1[主键]
    MQId -.- PK2[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef relationship fill:#ffd,stroke:#333,stroke-width:1px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class MultiQuestion,JudgeQuestion,FillQuestion,PaperManage entity
    class Contains1,Contains2,Contains3 relationship
    class PaperId,QuestionType,QuestionId,MQId,MQSubject,MQQuestion,AnswerA,AnswerB,AnswerC,AnswerD,RightAnswer attribute
    class PK1,PK2 key
```

## 3. 题库管理模块

### 3.1 选择题表(multi_question)ER 图

```mermaid
graph TD
    %% 实体
    MultiQuestion[选择题]

    %% 属性
    QuestionId((questionId))
    Subject((subject))
    Question((question))
    AnswerA((answerA))
    AnswerB((answerB))
    AnswerC((answerC))
    AnswerD((answerD))
    RightAnswer((rightAnswer))
    Analysis((analysis))
    Score((score))
    Section((section))
    Level((level))

    %% 连接关系
    MultiQuestion --- QuestionId
    MultiQuestion --- Subject
    MultiQuestion --- Question
    MultiQuestion --- AnswerA
    MultiQuestion --- AnswerB
    MultiQuestion --- AnswerC
    MultiQuestion --- AnswerD
    MultiQuestion --- RightAnswer
    MultiQuestion --- Analysis
    MultiQuestion --- Score
    MultiQuestion --- Section
    MultiQuestion --- Level

    %% 主键标识
    QuestionId -.- PK[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class MultiQuestion entity
    class QuestionId,Subject,Question,AnswerA,AnswerB,AnswerC,AnswerD,RightAnswer,Analysis,Score,Section,Level attribute
    class PK key
```

### 3.2 判断题表(judge_question)ER 图

```mermaid
graph TD
    %% 实体
    JudgeQuestion[判断题]

    %% 属性
    QuestionId((questionId))
    Subject((subject))
    Question((question))
    Answer((answer))
    Analysis((analysis))
    Score((score))
    Level((level))
    Section((section))

    %% 连接关系
    JudgeQuestion --- QuestionId
    JudgeQuestion --- Subject
    JudgeQuestion --- Question
    JudgeQuestion --- Answer
    JudgeQuestion --- Analysis
    JudgeQuestion --- Score
    JudgeQuestion --- Level
    JudgeQuestion --- Section

    %% 主键标识
    QuestionId -.- PK[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class JudgeQuestion entity
    class QuestionId,Subject,Question,Answer,Analysis,Score,Level,Section attribute
    class PK key
```

### 3.3 填空题表(fill_question)ER 图

```mermaid
graph TD
    %% 实体
    FillQuestion[填空题]

    %% 属性
    QuestionId((questionId))
    Subject((subject))
    Question((question))
    Answer((answer))
    Analysis((analysis))
    Score((score))
    Level((level))
    Section((section))

    %% 连接关系
    FillQuestion --- QuestionId
    FillQuestion --- Subject
    FillQuestion --- Question
    FillQuestion --- Answer
    FillQuestion --- Analysis
    FillQuestion --- Score
    FillQuestion --- Level
    FillQuestion --- Section

    %% 主键标识
    QuestionId -.- PK[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class FillQuestion entity
    class QuestionId,Subject,Question,Answer,Analysis,Score,Level,Section attribute
    class PK key
```

### 3.4 试卷管理表(paper_manage)ER 图

```mermaid
graph TD
    %% 实体
    PaperManage[试卷管理]

    %% 属性
    PaperId((paperId))
    QuestionType((questionType))
    QuestionId((questionId))

    %% 连接关系
    PaperManage --- PaperId
    PaperManage --- QuestionType
    PaperManage --- QuestionId

    %% 主键和外键标识
    PaperId -.- FK1[外键]
    QuestionId -.- FK2[外键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class PaperManage entity
    class PaperId,QuestionType,QuestionId attribute
    class FK1,FK2 key
```

### 3.5 成绩表(score)ER 图

```mermaid
graph TD
    %% 实体
    Score[成绩]

    %% 属性
    ScoreId((scoreId))
    ExamCode((examCode))
    StudentId((studentId))
    Subject((subject))
    PtScore((ptScore))
    EtScore((etScore))
    Score((score))
    AnswerDate((answerDate))

    %% 连接关系
    Score --- ScoreId
    Score --- ExamCode
    Score --- StudentId
    Score --- Subject
    Score --- PtScore
    Score --- EtScore
    Score --- Score
    Score --- AnswerDate

    %% 主键和外键标识
    ScoreId -.- PK[主键]
    ExamCode -.- FK1[外键]
    StudentId -.- FK2[外键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class Score entity
    class ScoreId,ExamCode,StudentId,Subject,PtScore,EtScore,Score,AnswerDate attribute
    class PK,FK1,FK2 key
```

### 3.6 留言表(message)ER 图

```mermaid
graph TD
    %% 实体
    Message[留言]

    %% 属性
    Id((id))
    Title((title))
    Content((content))
    Time((time))

    %% 连接关系
    Message --- Id
    Message --- Title
    Message --- Content
    Message --- Time

    %% 主键标识
    Id -.- PK[主键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class Message entity
    class Id,Title,Content,Time attribute
    class PK key
```

### 3.7 回复表(replay)ER 图

```mermaid
graph TD
    %% 实体
    Replay[回复]

    %% 属性
    MessageId((messageId))
    ReplayId((replayId))
    Replay((replay))
    ReplayTime((replayTime))

    %% 连接关系
    Replay --- MessageId
    Replay --- ReplayId
    Replay --- Replay
    Replay --- ReplayTime

    %% 主键和外键标识
    ReplayId -.- PK[主键]
    MessageId -.- FK[外键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class Replay entity
    class MessageId,ReplayId,Replay,ReplayTime attribute
    class PK,FK key
```

## 图例说明

```mermaid
graph TD
    %% 图例
    Entity[实体]
    Relationship{关系}
    Attribute((属性))
    PK[主键]
    FK[外键]

    %% 样式
    classDef entity fill:#f9f,stroke:#333,stroke-width:2px
    classDef relationship fill:#ffd,stroke:#333,stroke-width:1px
    classDef attribute fill:#bbf,stroke:#333,stroke-width:1px
    classDef key fill:#fbb,stroke:#333,stroke-width:1px

    class Entity entity
    class Relationship relationship
    class Attribute attribute
    class PK,FK key

    %% 说明文本
    说明1[矩形框表示实体]
    说明2[菱形框表示关系]
    说明3[椭圆框表示属性]
    说明4[红色框表示主键/外键]

    Entity --- 说明1
    Relationship --- 说明2
    Attribute --- 说明3
    PK --- 说明4
```
