import {
  AddNewCategoryApi,
  getCategoriesApi,
} from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategoriesApi,
    retry: false,
  });
};

export const useAddCategory = () =>
  useMutation({ mutationFn: AddNewCategoryApi });
