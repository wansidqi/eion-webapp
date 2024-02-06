import { useQuery } from '@tanstack/react-query';
import datasource from '../datasources/locker-room.datasource';
import { RQ_KEY } from '.';
import { GameInterface } from '../interface';

///GET
const getGameByID = async (gameID: string) => {
  const response = await datasource({ method: 'get', url: `/games/${gameID}` });
  return response.data as GameInterface[];
};

const useGetGameByID = (gameId: string) => {
  return useQuery({
    queryKey: [RQ_KEY.GAME, gameId],
    queryFn: async () => getGameByID(gameId),
    retry: false,
  });
};

// ///POST
// const postGame = async (game: GameInterface) => {
//   const response = await datasource({ method: 'post', url: '/games', data: game });
//   return response.data;
// };

// const usePostGame = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (game: GameInterface) => postGame(game),
//     onSuccess: async _ => {
//       await queryClient.invalidateQueries([RQ_KEY.GAMES]);
//     },
//   });
// };

// ///PATCH/UPDATE
// const updateGame = async (game: GameInterface) => {
//   const response = await datasource({ method: 'patch', url: `/games/${game.id}`, data: game });
//   return response.data;
// };

// const useUpdateGame = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (game: GameInterface) => updateGame(game),
//     onSuccess: async _ => {
//       await queryClient.invalidateQueries([RQ_KEY.GAMES]);
//     },
//   });
// };

// ///DELETE
// const deleteGame = async (gameID: string) => {
//   const response = await datasource({ method: 'delete', url: `/games/${gameID}` });
//   return response.data;
// };

// const useDeleteGame = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (game: GameInterface) => deleteGame(game.id),
//     onSuccess: async _ => {
//       await queryClient.invalidateQueries([RQ_KEY.GAMES]);
//     },
//   });
// };

export const GameRepository = {
  useGetGameByID,
  // usePostGame,
  // useUpdateGame,
  // useDeleteGame,
};
