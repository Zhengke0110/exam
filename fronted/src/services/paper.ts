import { DefaultService } from "@/generated";

export const GetPaperByPaperIdApi = async (paperId: number) => {
  return DefaultService.getApiV1Paper(paperId);
};
