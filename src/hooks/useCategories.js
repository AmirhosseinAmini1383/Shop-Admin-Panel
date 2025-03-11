import {
  AddNewCategoryApi,
  getCategoriesApi,
  getCategoryByIdApi,
  removeCategoryApi,
  updateCategoryApi,
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

export const useGetCategoryById = (id) => {
  return useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategoryByIdApi(id),
    retry: false,
  });
};

export const useUpdateCategory = () =>
  useMutation({ mutationFn: updateCategoryApi });

export const useRemoveCategory = () =>
  useMutation({ mutationFn: removeCategoryApi });