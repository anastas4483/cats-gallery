import { AxiosResponse } from "axios";
import { useState } from "react";

interface PageableDataHookParams<T> {
  request: (page: number) => Promise<AxiosResponse<T>>;
}

export const usePageableData = <T>({ request }: PageableDataHookParams<T>) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState<T>([]);

  const increasePageNumber = () => setPageNumber(prev => prev + 1);

  const loadFirstPage = async () => {
    request(0)
      .then((res) => {
        increasePageNumber();
        setData(prev => [...prev, ...res.data]);
      });
  };

  const loadNextPage = () => {
    request(pageNumber)
      .then((res) => {
        increasePageNumber();
        setData(prev => [...prev, ...res.data]);
      });
  };

  const resetPagination = () => {
    setData([]);
    loadFirstPage();
    setPageNumber(0);
  };

  return {
    data,
    loadFirstPage,
    loadNextPage,
    resetPagination
  };
};