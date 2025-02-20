package fun.timu.exam.controller;

import fun.timu.exam.entity.*;
import fun.timu.exam.serviceimpl.FillQuestionServiceImpl;
import fun.timu.exam.serviceimpl.JudgeQuestionServiceImpl;
import fun.timu.exam.serviceimpl.MultiQuestionServiceImpl;
import fun.timu.exam.serviceimpl.PaperServiceImpl;
import fun.timu.exam.util.ApiResultHandler;
import fun.timu.exam.vo.AnswerDetailVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PaperController {

    @Autowired
    private PaperServiceImpl paperService;

    @Autowired
    private JudgeQuestionServiceImpl judgeQuestionService;

    @Autowired
    private MultiQuestionServiceImpl multiQuestionService;

    @Autowired
    private FillQuestionServiceImpl fillQuestionService;

    @GetMapping("/papers")
    public ApiResult<PaperManage> findAll() {
        ApiResult res = ApiResultHandler.buildApiResult(200, "请求成功", paperService.findAll());
        return res;
    }

    @GetMapping("/paper/{paperId}")
    public List<AnswerDetailVO> findById(@PathVariable("paperId") Integer paperId) {
        List<MultiQuestion> multiQuestionRes = multiQuestionService.findByIdAndType(paperId);   //选择题题库 1
        List<FillQuestion> fillQuestionsRes = fillQuestionService.findByIdAndType(paperId);     //填空题题库 2
        List<JudgeQuestion> judgeQuestionRes = judgeQuestionService.findByIdAndType(paperId);   //判断题题库 3
        ArrayList<AnswerDetailVO> list = new ArrayList<>();
        for (MultiQuestion multiQuestion : multiQuestionRes) {
            AnswerDetailVO answerDetailVO = new AnswerDetailVO();
            answerDetailVO.setQuestion(multiQuestion.getQuestion());
            answerDetailVO.setSubject(multiQuestion.getSubject());
            answerDetailVO.setSection(multiQuestion.getSection());
            answerDetailVO.setAnalysis(multiQuestion.getAnalysis());
            answerDetailVO.setAnswerA(multiQuestion.getAnswerA());
            answerDetailVO.setAnswerB(multiQuestion.getAnswerB());
            answerDetailVO.setAnswerC(multiQuestion.getAnswerC());
            answerDetailVO.setAnswerD(multiQuestion.getAnswerD());
            answerDetailVO.setScore(multiQuestion.getScore());
            answerDetailVO.setLevel(multiQuestion.getLevel());
            answerDetailVO.setQuestionId(multiQuestion.getQuestionId().toString());
            answerDetailVO.setType("选择题");
            answerDetailVO.setRightAnswer(multiQuestion.getRightAnswer());
            list.add(answerDetailVO);
        }

        for (FillQuestion fillQuestion : fillQuestionsRes) {
            AnswerDetailVO answerDetailVO = new AnswerDetailVO();
            answerDetailVO.setQuestion(fillQuestion.getQuestion());
            answerDetailVO.setSubject(fillQuestion.getSubject());
            answerDetailVO.setSection(fillQuestion.getSection());
            answerDetailVO.setAnalysis(fillQuestion.getAnalysis());
            answerDetailVO.setScore(fillQuestion.getScore());
            answerDetailVO.setLevel(fillQuestion.getLevel());
            answerDetailVO.setQuestionId(fillQuestion.getQuestionId().toString());
            answerDetailVO.setType("填空题");
            answerDetailVO.setAnswer(fillQuestion.getAnswer());
            list.add(answerDetailVO);
        }

        for (JudgeQuestion judgeQuestion : judgeQuestionRes) {
            AnswerDetailVO answerDetailVO = new AnswerDetailVO();
            answerDetailVO.setQuestion(judgeQuestion.getQuestion());
            answerDetailVO.setSubject(judgeQuestion.getSubject());
            answerDetailVO.setSection(judgeQuestion.getSection());
            answerDetailVO.setAnalysis(judgeQuestion.getAnalysis());
            answerDetailVO.setScore(judgeQuestion.getScore());
            answerDetailVO.setLevel(judgeQuestion.getLevel());
            answerDetailVO.setQuestionId(judgeQuestion.getQuestionId().toString());
            answerDetailVO.setType("判断题");
            answerDetailVO.setAnswer(judgeQuestion.getAnswer());
            list.add(answerDetailVO);
        }
        return list;
    }

    @PostMapping("/paperManage")
    public ApiResult add(@RequestBody PaperManage paperManage) {
        int res = paperService.add(paperManage);
        if (res != 0) {
            return ApiResultHandler.buildApiResult(200, "添加成功", res);
        }
        return ApiResultHandler.buildApiResult(400, "添加失败", res);
    }
}
