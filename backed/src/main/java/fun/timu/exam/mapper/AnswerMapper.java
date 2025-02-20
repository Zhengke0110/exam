package fun.timu.exam.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.timu.exam.vo.AnswerDetailVO;
import fun.timu.exam.vo.AnswerVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface AnswerMapper {
    @Select("select questionId, question, subject, score, section,level, \"选择题\" as type from multi_question " + "union select  questionId,question, subject, score, section,level, \"判断题\" as type  from judge_question " + "union select  questionId,question, subject, score, section,level, \"填空题\" as type from fill_question")
    IPage<AnswerVO> findAll(Page page);

    @Select("select questionId, question, subject, score, section, level, \"选择题\" as type from multi_question " + "union select questionId, question, subject, score, section, level, \"判断题\" as type from judge_question " + "union select questionId, question, subject, score, section, level, \"填空题\" as type from fill_question")
    List<AnswerVO> findAll();

    // 根据 questionId 和类型查询 multi_question 表
    @Select("SELECT * FROM multi_question WHERE questionId = #{questionId}")
    AnswerDetailVO findMultiQuestionByQuestionId(@Param("questionId") String questionId);

    // 根据 questionId 和类型查询 judge_question 表
    @Select("SELECT * FROM judge_question WHERE questionId = #{questionId}")
    AnswerDetailVO findJudgeQuestionByQuestionId(@Param("questionId") String questionId);

    // 根据 questionId 和类型查询 fill_question 表
    @Select("SELECT * FROM fill_question WHERE questionId = #{questionId}")
    AnswerDetailVO findFillQuestionByQuestionId(@Param("questionId") String questionId);


    // 根据类型查询所有 multi_question 表中的题目
    @Select("SELECT * FROM multi_question")
    List<AnswerVO> findAllMultiQuestions();

    // 根据类型查询所有 judge_question 表中的题目
    @Select("SELECT * FROM judge_question")
    List<AnswerVO> findAllJudgeQuestions();

    // 根据类型查询所有 fill_question 表中的题目
    @Select("SELECT * FROM fill_question")
    List<AnswerVO> findAllFillQuestions();

}
