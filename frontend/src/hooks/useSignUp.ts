import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import type { SignupData } from "../types/auth";
import type { AxiosError } from "axios";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error }: { mutate: (data: SignupData) => void; isPending: boolean; error: AxiosError | null; } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, signupMutation: mutate };
};
export default useSignUp;