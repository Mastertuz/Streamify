import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { AxiosError } from "axios";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { logoutMutation, isPending, error: error as AxiosError | null };
};
export default useLogout;