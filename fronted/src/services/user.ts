import { DefaultService } from "@/generated";

export const LoginApi = async (form: {
  username?: number;
  password?: string;
}) => {
  return await DefaultService.postApiV1Login(form);
};
