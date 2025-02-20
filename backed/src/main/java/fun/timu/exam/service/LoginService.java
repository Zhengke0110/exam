package fun.timu.exam.service;

import fun.timu.exam.entity.Admin;
import fun.timu.exam.entity.Student;
import fun.timu.exam.entity.Teacher;

public interface LoginService {

    public Admin adminLogin(Integer username, String password);

    public Teacher teacherLogin(Integer username, String password);

    public Student studentLogin(Integer username, String password);
}
