import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../store/slices/user.slice';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../datasources/localstorage.datasource';
import { useBoundStore } from '../store';

const updateUser = async (data: Partial<User>) => {
  return await datasource({
    method: 'patch',
    data: { ...data },
    url: `/users/${data.id}`,
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<User>) => updateUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
    },
  });
};

const updateUsername = async (data: Partial<User>) => {
  return await datasource({
    method: 'patch',
    data: { username: data.username },
    url: `/users/username/${data.id}`,
  });
};

const useUpdateUsername = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<User>) => updateUsername(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
    },
    onError: async (error: AxiosError) => {
      const { response } = error;
      return response?.data;
    },
  });
};

const useDeleteUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { resetAllSlices } = useBoundStore(state => state);
  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      // withCredentials=true for clearing cookie server side
      const response = await datasource({
        method: 'delete',
        url: `/users/${data.id}`,
        withCredentials: true,
      });

      return response?.data;
    },
    onSuccess: async () => {
      removeToken(import.meta.env.VITE_MAIN_BE_TOKEN);
      resetAllSlices();
      navigate('/sign-in');
      await queryClient.invalidateQueries([RQ_KEY.USER_DATA]);
    },
    onError: async (error: AxiosError) => {
      const { response } = error;
      return response?.data;
    },
  });
};

const getUserById = async (userId: string) => {
  const response = await datasource({ method: 'get', url: `/users/${userId}` });
  return response.data;
};

const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.OTHER_USER],
    queryFn: async () => getUserById(userId),
    retry: false,
  });
};

function useCheckBalance() {
  return useMutation({
    mutationFn: async ({ userId, amount }: { userId: string; amount: number }) => {
      const response = await datasource({ method: 'post', url: `/users/check-balance/${userId}`, data: { amount } });
      return response.data as boolean;
    },
  });
}

function useCheckRedeemCodeAvailability() {
  return useMutation({
    mutationFn: async ({ userId, code }: { userId: string; code: string }) => {
      const response = await datasource({
        method: 'post',
        url: `/redeem-code/check-availability`,
        data: { code, userId },
      });
      return response.data as { success: boolean; message: string };
    },
  });
}

function useUseRedeemCode() {
  return useMutation({
    mutationFn: async ({ userId, code }: { userId: string; code: string }) => {
      const response = await datasource({ method: 'post', url: `/redeem-code/use`, data: { code, userId } });
      return response.data as boolean;
    },
  });
}


export const UserRepository = {
  useUpdateUser,
  useUpdateUsername,
  useDeleteUser,
  useGetUserById,
  useCheckBalance,
  useUseRedeemCode,
  useCheckRedeemCodeAvailability,
};
