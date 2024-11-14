import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const {
    mutate: signup,
    isSuccess: isSignupSuccess,
    isPending: isSigupPending,
  } = useMutation({
    mutationFn: signupApi,
  });
  return { signup, isSignupSuccess, isSigupPending };
}
