package fun.timu.exam.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.timu.exam.vo.AnswerDetailVO;
import fun.timu.exam.vo.AnswerVO;

import java.util.List;

public interface AnswerService {

    IPage<AnswerVO> findAll(Page<AnswerVO> page);

    public AnswerDetailVO findByQuestionIdAndType(String questionId, String type);

    public List<AnswerVO> findAllByType(String type);
}
