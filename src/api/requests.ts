import { axios } from "@/api/axios-config";
import { requestsPageSize } from "@/constants/requests-constants";
import { CatImage } from "@/models/cat-image";
import { AxiosResponse } from "axios";

export const getCatImagesRequest = (page: number = 0): Promise<AxiosResponse<CatImage[]>> => {
  return axios.get('', {
    params: {
      limit: requestsPageSize,
      page
    }
  });
};