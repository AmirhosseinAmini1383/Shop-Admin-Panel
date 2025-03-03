import { addToCartApi, decrementFromCartApi } from "@/services/cartService";
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

export const useDecrementFromCart = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: decrementFromCart, isPending } = useMutation({
    mutationFn: decrementFromCartApi,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-user-data"],
      }),
  });
  return { decrementFromCart, isPending };
};

// export const useRemoveFromCart = () => {};
