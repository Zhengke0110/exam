package fun.timu.exam.serviceimpl;

import fun.timu.exam.entity.Admin;
import fun.timu.exam.entity.Student;
import fun.timu.exam.entity.Teacher;
import fun.timu.exam.mapper.LoginMapper;
import fun.timu.exam.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;

    @Override
    public Admin adminLogin(Integer username, String password) {
        return loginMapper.adminLogin(username,password);
    }

    @Override
    public Teacher teacherLogin(Integer username, String password) {
        return loginMapper.teacherLogin(username,password);
    }

    @Override
    public Student studentLogin(Integer username, String password) {
        return loginMapper.studentLogin(username,password);
    }
}
