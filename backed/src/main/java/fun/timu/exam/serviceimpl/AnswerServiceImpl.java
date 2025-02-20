package fun.timu.exam.serviceimpl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.timu.exam.mapper.AnswerMapper;
import fun.timu.exam.service.AnswerService;
import fun.timu.exam.vo.AnswerDetailVO;
import fun.timu.exam.vo.AnswerVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerMapper answerMapper;

    @Override
    public IPage<AnswerVO> findAll(Page<AnswerVO> page) {
        return answerMapper.findAll(page);
    }


    @Override
    public AnswerDetailVO findByQuestionIdAndType(String questionId, String type) {
        if ("选择题".equals(type)) {
            AnswerDetailVO detailVO = answerMapper.findMultiQuestionByQuestionId(questionId);
            detailVO.setType("选择题");
            return detailVO;
        } else if ("判断题".equals(type)) {
            AnswerDetailVO detailVO = answerMapper.findJudgeQuestionByQuestionId(questionId);
            detailVO.setType("判断题");
            return detailVO;
        } else if ("填空题".equals(type)) {
            AnswerDetailVO detailVO = answerMapper.findFillQuestionByQuestionId(questionId);
            detailVO.setType("填空题");
            return detailVO;
        }
        return null;
    }


    @Override
    public List<AnswerVO> findAllByType(String type) {
        if ("选择题".equals(type)) {
            return answerMapper.findAllMultiQuestions();
        } else if ("判断题".equals(type)) {
            return answerMapper.findAllJudgeQuestions();
        } else if ("填空题".equals(type)) {
            return answerMapper.findAllFillQuestions();
        } else return answerMapper.findAll();
    }
}
