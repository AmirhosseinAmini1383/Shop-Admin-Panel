import { addProductApi, getProductsApi } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProductsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => useMutation({ mutationFn: addProductApi });
