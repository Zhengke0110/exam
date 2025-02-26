package fun.timu.exam.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import fun.timu.exam.entity.Message;

public interface MessageService {
    IPage<Message> findAll(Page page);

    Message findById(Integer id);

    int delete(Integer id);

    int update(Message message);

    int add(Message message);
}
