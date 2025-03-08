import { getCategoriesApi } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategoriesApi,
    retry: false,
  });
};
