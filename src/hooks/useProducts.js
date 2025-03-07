import { getProductsApi } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProductsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
