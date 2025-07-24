import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { AxiosError } from "axios";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Set the user data directly from login response
      queryClient.setQueryData(["authUser"], data);
      // Also invalidate to ensure fresh data
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }, 100);
    },
  });

  return { error: error as AxiosError, isPending, loginMutation: mutate };
};

export default useLogin;