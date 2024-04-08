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


// TODO: images/upload POST
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=aZyiLrsCh#tag/Images/paths/~1images~1upload/post
// https://documenter.getpostman.com/view/5578104/RWgqUxxh#7fde7c73-8e64-49d7-a6ca-22132e3fc84c