package fun.timu.exam.vo;

import lombok.Data;

@Data
public class AnswerVO {
    private String questionId;
    private String question;
    private String subject;
    private String score;
    private String section;
    private String level;
    private String type;
}
