package fun.timu.exam.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.timu.exam.entity.ApiResult;
import fun.timu.exam.serviceimpl.AnswerServiceImpl;
import fun.timu.exam.util.ApiResultHandler;
import fun.timu.exam.vo.AnswerDetailVO;
import fun.timu.exam.vo.AnswerVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class AnswerController {

    @Autowired
    private AnswerServiceImpl answerService;

    @GetMapping("/answers/{page}/{size}")
    public ApiResult findAllQuestion(@PathVariable("page") Integer page, @PathVariable("size") Integer size) {
        Page<AnswerVO> answerVOPage = new Page<>(page, size);
        IPage<AnswerVO> answerVOIPage = answerService.findAll(answerVOPage);
        return ApiResultHandler.buildApiResult(200, "查询所有题库", answerVOIPage);
    }

    @GetMapping("/answers/by-question-id-and-type")
    public ApiResult findByQuestionIdAndType(@RequestParam String questionId, @RequestParam String type) {
        AnswerDetailVO answerVO = answerService.findByQuestionIdAndType(questionId, type);
        return ApiResultHandler.buildApiResult(200, "查询成功", answerVO);
    }

    @GetMapping("/answers/by-type")
    public ApiResult findAllByType(@RequestParam String type) {
        List<AnswerVO> answerVOList = answerService.findAllByType(type);
        return ApiResultHandler.buildApiResult(200, "查询成功", answerVOList);
    }
}
