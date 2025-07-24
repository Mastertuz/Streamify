import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  });
  return { logoutMutation, isPending, error: error as AxiosError | null };
};
export default useLogout;
