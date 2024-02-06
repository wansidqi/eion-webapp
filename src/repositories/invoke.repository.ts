import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { InvokeDraftInterface, InvokeField, InvokeState } from '../interface';
import { RQ_KEY } from '.';

const postInvoke = async (data: InvokeField) => {
  const response = await datasource({ method: 'post', url: `/dream-team/draft`, data });
  return response.data;
};

const useGetInvokeState = async () => {
  return useQuery({
    queryKey: [RQ_KEY.INVOKE_STATE],
    queryFn: async () => {
      const response = await datasource({ url: `dream-team/state/`, method: 'get' });
      return response.data as InvokeState[];
    },
    retry: false,
  });
};

const usePostInvoke = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InvokeField) => postInvoke(data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.INVOKE]);
    },
  });
};

const getInvokeDraft = async (userId: string) => {
  const response = await datasource({ method: 'get', url: `/dream-team/draft/${userId}` });
  return response.data as InvokeDraftInterface;
};

const useGetInvokeDraft = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.INVOKE],
    queryFn: async () => getInvokeDraft(userId),
    retry: false,
  });
};

const updateInvoke = async (userId: string, data: Partial<InvokeField>) => {
  const response = await datasource({ url: `dream-team/draft/${userId}`, method: 'patch', data });
  return response.data;
};

const useUpdateInvoke = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<InvokeField>) => updateInvoke(data.userId as string, data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.INVOKE]);
    },
  });
};

const deleteInvoke = async (userId: string) => {
  const response = await datasource({ method: 'delete', url: `/dream-team/draft/${userId}` });
  return response.data;
};

const useDeleteInvoke = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => deleteInvoke(userId),
    onSuccess: async _ => {
      await queryClient.removeQueries({ queryKey: [RQ_KEY.INVOKE], exact: true });
    },
  });
};

export const InvokeRepository = {
  usePostInvoke,
  useGetInvokeDraft,
  useUpdateInvoke,
  useDeleteInvoke,
  useGetInvokeState,
};
