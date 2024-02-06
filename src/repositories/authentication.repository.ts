import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { removeToken, setToken } from '../datasources/localstorage.datasource';
import { useBoundStore } from '../store';
import { User } from '../store/slices/user.slice';
import { useNavigate, useParams } from 'react-router-dom';

type Credential = {
  email: string;
  password: string;
  referrerId?:string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  error: { [key: string]: any };
  user: User;
  token?: string;
};

const postLogin = async (credential: Credential) => {
  const response = await datasource<AuthResponse>({
    method: 'post',
    data: { ...credential, role: import.meta.env.VITE_AUTH_ROLE },
    url: '/auth/login',
  });
  return response.data;
};

const usePostLogin = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { setAlertState } = useBoundStore();
  return useMutation({
    mutationFn: (credential: Credential) => postLogin(credential),
    onSuccess: async data => {
      if (data.token) setToken(`${import.meta.env.VITE_MAIN_BE_TOKEN}`, data.token);
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);

      if (!data.user?.confirmed) {
        setAlertState({ message: 'Check your email to complete email confirmation process', type: 'error' });
      } else {
        navigate('/');
        // navigate('/success');
      }
    },
  });
};

const postSignup = async (credential: Credential) => {
  const response = await datasource<AuthResponse>({
    method: 'post',
    data: { ...credential, role: import.meta.env.VITE_AUTH_ROLE },
    url: '/auth/signup',
  });
  return response.data;
};

const usePostSignup = () => {
  let navigate = useNavigate();

  return useMutation({
    mutationFn: (credential: Credential) => {
      return postSignup(credential);
    },
    onSuccess: async _ => {
      navigate('/sign-in');
    },
    cacheTime: 0,
  });
};

const verifyGoogleAuthentication = async () => {
  const response = await datasource<AuthResponse>({
    method: 'get',
    url: '/auth/google/success',
    withCredentials: true,
  });
  return response.data;
};

const usePostGoogleLogin = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  return useQuery({
    queryKey: ['_'],
    queryFn: () => verifyGoogleAuthentication(),
    onSuccess: async data => {
      if (data.token) setToken(`${import.meta.env.VITE_MAIN_BE_TOKEN}`, data.token);
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
      navigate('/');
      // navigate('/success');
    },
    enabled: false,
    cacheTime: 0,
  });
};

const usePostLogout = () => {
  const { resetAllSlices } = useBoundStore(state => state);
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // withCredentials=true for clearing cookie server side
      await datasource({ method: 'post', url: '/auth/logout', withCredentials: true });
    },
    onSuccess: async _ => {
      removeToken(import.meta.env.VITE_MAIN_BE_TOKEN);
      resetAllSlices();
      // navigate('/sign-in');
      // window.location.reload()
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
    },
    cacheTime: 0,
    retry: false,
  });
};

const authenticate = async () => {
  const response = await datasource<AuthResponse>({ method: 'get', url: '/auth/authenticate' });
  return response.data;
};

const useGetAuth = () => {
  return useQuery({
    queryKey: [RQ_KEY.USER_DATA],
    queryFn: async () => authenticate(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

const useCheckEmailExists = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      let response = await datasource<AuthResponse>({ method: 'post', url: '/auth/check-email', data: { email } });
      return response.data;
    },
  });
};

const usePostChangePassword = () => {
  const { resetAllSlices } = useBoundStore(state => state);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { password: { old: string; new: string }; id: string }) => {
      const { password, id } = data;

      return await datasource({
        method: 'post',
        url: `/auth/change-password/${id}`,
        data: { password, role: import.meta.env.VITE_AUTH_ROLE },
      });
    },
    onSuccess: async _ => {
      removeToken(import.meta.env.VITE_MAIN_BE_TOKEN);
      resetAllSlices();
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
      navigate('/');
    },
    cacheTime: 0,
    retry: false,
  });
};

const usePostForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { email: string }) => {
      let response = await datasource<AuthResponse>({
        method: 'post',
        url: `/auth/forgot-password`,
        data: { ...data, role: import.meta.env.VITE_AUTH_ROLE },
      });

      return response.data;
    },
    onSuccess: async _ => {
      navigate('/sign-in');
    },
    cacheTime: 0,
    retry: false,
  });
};
const usePostResetPassword = () => {
  const { resetAllSlices } = useBoundStore(state => state);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useParams();

  return useMutation({
    mutationFn: async (data: { password: string }) => {
      return await datasource({
        method: 'post',
        url: `/auth/reset-password/${token}`,
        data,
      });
    },
    onSuccess: async _ => {
      removeToken(import.meta.env.VITE_MAIN_BE_TOKEN);
      resetAllSlices();
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
      navigate('/sign-in');
    },
    cacheTime: 0,
    retry: false,
  });
};

export const AuthenticationRepository = {
  usePostLogin,
  usePostSignup,
  usePostGoogleLogin,
  usePostLogout,
  useGetAuth,
  useCheckEmailExists,
  usePostChangePassword,
  usePostForgotPassword,
  usePostResetPassword,
};
