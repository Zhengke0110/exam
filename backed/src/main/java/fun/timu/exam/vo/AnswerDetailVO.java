package fun.timu.exam.vo;

import lombok.Data;

@Data
public class AnswerDetailVO {
    private String questionId;
    private String subject;
    private String question;
    private String answerA;
    private String answerB;
    private String answerC;
    private String answerD;
    private String rightAnswer;
    private String analysis;
    private Integer score;
    private String section;
    private String level;
    private String answer;
    private String type;

}
