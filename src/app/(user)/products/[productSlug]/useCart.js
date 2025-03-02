import { addToCartApi } from "@/services/cartService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: addToCart, isPending } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-user-data"],
      }),
  });
  return { addToCart, isPending };
};
