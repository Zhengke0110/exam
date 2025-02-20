import { defineStore } from "pinia";
// Link:https://pinia.vuejs.org/zh/

export interface AdminInterface {
  adminId: number;
  adminName: string;
  cardId: string;
  email: string;
  pwd: null;
  role: string;
  sex: string;
  tel: string;
}
export interface TeacherInterface {
  teacherId?: number;
  teacherName?: string;
  institute?: string;
  sex?: string;
  tel?: string;
  email?: string;
  pwd?: string;
  cardId?: string;
  type?: string;
  role?: string;
}

export interface StudentInterface {
  studentId?: number;
  studentName?: string;
  grade?: string;
  major?: string;
  clazz?: string;
  institute?: string;
  tel?: string;
  email?: string;
  pwd?: string;
  cardId?: string;
  sex?: string;
  role?: string;
}

interface State {
  loginInfo: AdminInterface | TeacherInterface | StudentInterface;
}
export const useUserStore = defineStore("user", {
  state: (): State => ({
    loginInfo: {},
  }),
  getters: {
    getLoginUserName(): string {
      if (this.loginInfo.role === "0") {
        return (this.loginInfo as AdminInterface).adminName;
      } else if (this.loginInfo.role === "1") {
        return (this.loginInfo as TeacherInterface).teacherName || "";
      } else if (this.loginInfo.role === "2") {
        return (this.loginInfo as StudentInterface).studentName || "";
      } else return "";
    },
    getLoginRole(): string {
      return this.loginInfo.role || "";
    },
    getLoginSex(): string {
      if (this.loginInfo.role === "0") {
        return (this.loginInfo as AdminInterface).sex || "";
      } else if (this.loginInfo.role === "1") {
        return (this.loginInfo as TeacherInterface).sex || "";
      } else if (this.loginInfo.role === "2") {
        return (this.loginInfo as StudentInterface).sex || "";
      }
      return "";
    },
    getLoginUserInfo(): AdminInterface | TeacherInterface | StudentInterface {
      return this.loginInfo;
    },
  },
  actions: {
    async setLoginInfo(data: any) {
      this.loginInfo = data;
      console.log(this.loginInfo);
    },
  },
  persist: {
    key: "user",
    storage: sessionStorage,
  },
});
