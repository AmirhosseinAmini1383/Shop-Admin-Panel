import {
  addProductApi,
  getOneProductByIdApi,
  getProductsApi,
  updateProductApi,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProductsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => useMutation({ mutationFn: addProductApi });

export const useUpdateProduct = () =>
  useMutation({ mutationFn: updateProductApi });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getOneProductByIdApi(id),
    retry: false,
  });
