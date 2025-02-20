import { useUserStore } from "@/store/user";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

export enum LayoutMenu {
  BasicLayout = "BasicLayout",
  UserLayout = "UserLayout",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    redirect: "/user/login",
  },
  {
    path: "/register",
    redirect: "/user/register",
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/layout/UserLayout"),
    meta: { layout: LayoutMenu.UserLayout },
    children: [
      {
        path: "/user/login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue"),
      },
      {
        path: "/user/register",
        name: "Register",
        component: () => import("@/views/auth/Register.vue"),
      },
    ],
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true },
  },
  {
    path: "/grade",
    name: "Grade",
    component: () => import("../views/Grade.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true },
    children: [
      {
        path: "change-password",
        name: "ChangePassword",
        component: () => import("../views/settings/ChangePassword.vue"),
      },
      {
        path: "notifications",
        name: "Notifications",
        component: () => import("../views/settings/Notifications.vue"),
      },
      {
        path: "privacy",
        name: "Privacy",
        component: () => import("../views/settings/Privacy.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/settings/About.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/views/admin/Admin.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/admin/teacher-list",
    component: () => import("@/views/admin/TeacherList.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/admin/add-teacher",
    component: () => import("@/views/admin/AddTeacher.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/admin/edit-teacher/:teacherId",
    props: true,
    component: () => import("@/views/admin/EditTeacher.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/admin/student-list",
    component: () => import("@/views/admin/StudentList.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/admin/add-student",
    component: () => import("@/views/admin/AddStudent.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/admin/edit-student/:studentId",
    props: true,
    component: () => import("@/views/admin/EditStudent.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "0" },
  },
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("@/views/error-handing/403.vue"),
    meta: { layout: LayoutMenu.BasicLayout },
  },
  {
    path: "/score-chart",
    component: () => import("@/views/Chart/ScoreChart.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/student-grade",
    name: "StudentGrade",
    component: () => import("../views/StudentGrade.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/grade-chart",
    name: "GradeChart",
    component: () => import("../views/Chart/GradeChart.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/select-exam",
    name: "SelectExam",
    component: () => import("../views/exam/ExamList.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/composition-exam/:examCode/:examName",
    name: "CompositionExam",
    props: true,
    component: () => import("../views/exam/CompositionExam.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/exam/edit/:examCode",
    name: "EditExam",
    props: true,
    component: () => import("../views/exam/EditExam.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/exam/add",
    name: "AddExam",
    component: () => import("../views/exam/AddExam.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/select-answer",
    name: "SelectAnswer",
    component: () => import("../views/answer/SelectAnswer.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/detail-answer",
    name: "DetailAnswer",
    component: () => import("../views/answer/DetailAnswer.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/edit-answer",
    name: "EditAnswer",
    component: () => import("../views/answer/EditAnswer.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/add-answer",
    name: "AddAnswer",
    component: () => import("../views/answer/AddAnswer.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "1" },
  },
  {
    path: "/student-exam",
    name: "StudentExam",
    component: () => import("../views/students/StudentExam.vue"),
    meta: { layout: LayoutMenu.BasicLayout, requiresAuth: true, role: "2" },
  },
  {
    path: "/join-exam/:examCode",
    name: "JoinExam",
    props: true,
    component: () => import("../views/students/JoinExam.vue"),
    meta: { layout: LayoutMenu.UserLayout, requiresAuth: true, role: "2" },
  },
  {
    path: "/exam-result",
    name: "ExamResult",
    component: () => import("../views/students/ExamResult.vue"),
    meta: { layout: LayoutMenu.UserLayout, requiresAuth: true, role: "2" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: () => import("../views/error-handing/Error.vue"),
    meta: { layout: LayoutMenu.BasicLayout },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 添加路由守卫
router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  const userRole = userStore.getLoginRole;

  if (to.meta.requiresAuth) {
    if (!userRole) {
      next("/login");
      return;
    }

    // 检查路由所需角色
    const requiredRole = to.meta.role as string;

    if (requiredRole) {
      // 管理员可以访问管理员和教师的页面
      if (userRole === "0" && (requiredRole === "0" || requiredRole === "1")) {
        next();
        return;
      }

      // 教师和学生只能访问自己角色的页面
      if (userRole === requiredRole) {
        next();
        return;
      }

      // 其他情况都跳转到403
      next("/403");
      return;
    }
  }

  next();
});

export default router;
