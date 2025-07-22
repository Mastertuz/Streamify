import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { AxiosError } from "axios";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error: error as AxiosError, isPending, loginMutation: mutate };
};

export default useLogin;