import { AxiosResponse } from "axios";
import { useState } from "react";

interface PageableDataHookParams<T> {
  request: (page: number) => Promise<AxiosResponse<T>>;
}

export const usePageableData = <T>({ request }: PageableDataHookParams<T>) => {
  const [pageNumber, setPageNumber] = useState(0);

  const increasePageNumber = () => setPageNumber(prev => prev + 1);

  const loadFirstPage = async () => {
    return request(0)
      .then((res) => {
        increasePageNumber();
        return res.data;
      });
  };

  const loadNextPage = () => {
    return request(pageNumber)
      .then((res) => {
        increasePageNumber();
        return res.data;
      });
  };

  const resetPagination = () => {
    loadFirstPage();
    setPageNumber(0);
  };

  return {
    loadFirstPage,
    loadNextPage,
    resetPagination
  };
};