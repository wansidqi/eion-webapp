import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { DraftBreakdown, DraftField, DraftInterface } from '../interface';

export interface DraftResponse {
  success: string;
  error: DraftField;
}

const getDraft = async (userId: string, gameId: string) => {
  const response = await datasource({ method: 'get', url: `/drafts/user/${userId}/game/${gameId}` });
  return response.data as DraftInterface;
};

const useGetDraft = (userId: string, gameId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.DRAFT, gameId],
    queryFn: async () => getDraft(userId, gameId),
    retry: false,
  });
};

const getDraftById = async (draftId: string) => {
  const response = await datasource({ method: 'get', url: `/drafts/${draftId}` });
  return response.data;
};

const useGetDraftById = (draftId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.DRAFT, draftId],
    queryFn: async () => getDraftById(draftId),
    retry: false,
  });
};

const getAllDrafts = async () => {
  const response = await datasource({ method: 'get', url: `/drafts/` });
  return response.data as DraftBreakdown[];
};

const useGetAllDrafts = () => {
  return useQuery({
    queryKey: [RQ_KEY.DRAFT],
    queryFn: async () => getAllDrafts(),
    retry: false,
  });
};

const useGetAllDraftsByUserId = (userId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.DRAFT_USER],
    queryFn: async () => {
      const response = await datasource({ method: 'get', url: `/drafts/user/${userId}` });
      return response.data as DraftBreakdown[];
    },
    retry: false,
  });
};

const postDraft = async (data: DraftField) => {
  const response = await datasource({ method: 'post', url: `/drafts`, data: data });
  return response.data;
};

const usePostDraft = (gameID: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DraftField) => postDraft(data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.DRAFT, gameID]);
    },
  });
};

const updateDraft = async (draftId: string, data: Partial<DraftField>) => {
  const response = await datasource({ url: `/drafts/${draftId}`, method: 'patch', data });
  return response.data;
};

const useUpdateDraft = (gameID: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ draftId, data }: { draftId: string; data: Partial<DraftField> }) => updateDraft(draftId, data),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.DRAFT, gameID]);
    },
    onError: () => console.log('error'),
  });
};

const deleteDraft = async (draftId: string) => {
  const response = await datasource({ method: 'delete', url: `/drafts/${draftId}` });
  return response.data;
};

const useDeleteDraft = (gameID: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (draftId: string) => deleteDraft(draftId),
    onSuccess: async _ => {
      await queryClient.invalidateQueries([RQ_KEY.DRAFT, gameID]);
      queryClient.removeQueries({ queryKey: [RQ_KEY.DRAFT, gameID], exact: true });
    },
  });
};

export const DraftRepository = {
  useGetAllDrafts,
  usePostDraft,
  useUpdateDraft,
  useDeleteDraft,
  useGetDraft,
  useGetDraftById,
  useGetAllDraftsByUserId,
};
