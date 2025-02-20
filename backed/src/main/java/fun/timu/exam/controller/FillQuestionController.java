package fun.timu.exam.controller;

import fun.timu.exam.entity.ApiResult;
import fun.timu.exam.entity.FillQuestion;
import fun.timu.exam.serviceimpl.FillQuestionServiceImpl;
import fun.timu.exam.util.ApiResultHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class FillQuestionController {

    @Autowired
    private FillQuestionServiceImpl fillQuestionService;

    @PostMapping("/fillQuestion")
    public ApiResult add(@RequestBody FillQuestion fillQuestion) {
        int res = fillQuestionService.add(fillQuestion);
        if (res != 0) {
            return ApiResultHandler.buildApiResult(200,"添加成功",res);
        }
        return ApiResultHandler.buildApiResult(400,"添加失败",res);
    }

    @GetMapping("/fillQuestionId")
    public ApiResult findOnlyQuestionId() {
        FillQuestion res = fillQuestionService.findOnlyQuestionId();
        return ApiResultHandler.buildApiResult(200,"查询成功",res);
}
}
