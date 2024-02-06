import { useEffect } from 'react';
import {
  DeckInvokeCard,
  InvokeDetail,
  InvokeMessage,
  InvokeSelectRarity,
  InvokeWarningModal,
  InvokeWindow,
  LockInvoke,
  PreviewInvokeCard,
} from '../components';
import { ModalInvokeSelection } from '../components/invoke/ModalInvokeSelection';
import { PlayerInvoke, RoleInvoke } from '../interface';
import { AuthResponse, RQ_KEY, useGetQueryData, useRepositories } from '../repositories';
import { useBoundStore } from '../store';

export function InvokePage() {
  const { invoke, setInvokeState } = useBoundStore();
  const { invokeDraft } = invoke;

  const userId = useGetQueryData<AuthResponse>([RQ_KEY.USER_DATA]).user.id;
  const { useGetInvokeDraft, useGetInventory, useGetLatestSeason, useGetInvokeState, useGetAllMatch } =
    useRepositories();

  const { data } = useGetInvokeDraft(userId);

  useGetInventory(userId);
  useGetLatestSeason();
  useGetAllMatch();
  useGetInvokeState();

  useEffect(() => {
    if (data?.draft) setInvokeState({ invokeDraft: data, lockInvoke: true });
  }, [data]);

  return (
    <div className="invoke-bg">
      <InvokeWindow />
      <div className="mx-5">
        <div className="pt-4">
          <InvokeDetail />
        </div>
        <div className="grid grid-cols-3 justify-center gap-5">
          <div className="col-span-3 flex justify-center gap-8">
            <DeckInvokeCard
              data={data?.draft?.player1}
              card={invokeDraft.draft.player1}
              role={RoleInvoke.ROAM}
              player={PlayerInvoke.player1}
            />
            <DeckInvokeCard
              data={data?.draft?.player2}
              card={invokeDraft.draft.player2}
              role={RoleInvoke.JUNGLE}
              player={PlayerInvoke.player2}
            />
          </div>
          <div className="col-span-3 mt-3 flex justify-center gap-4">
            <DeckInvokeCard
              data={data?.draft?.player3}
              card={invokeDraft.draft.player3}
              role={RoleInvoke.EXP}
              player={PlayerInvoke.player3}
            />
            <DeckInvokeCard
              data={data?.draft?.player4}
              card={invokeDraft.draft.player4}
              role={RoleInvoke.MID}
              player={PlayerInvoke.player4}
            />
            <DeckInvokeCard
              data={data?.draft?.player5}
              card={invokeDraft.draft.player5}
              role={RoleInvoke.GOLD}
              player={PlayerInvoke.player5}
            />
          </div>
        </div>

        <LockInvoke />
        <InvokeWarningModal />
        <InvokeMessage />
        <PreviewInvokeCard />

        <ModalInvokeSelection player={PlayerInvoke.player1} role={RoleInvoke.ROAM} />
        <ModalInvokeSelection player={PlayerInvoke.player2} role={RoleInvoke.MID} />
        <ModalInvokeSelection player={PlayerInvoke.player3} role={RoleInvoke.JUNGLE} />
        <ModalInvokeSelection player={PlayerInvoke.player4} role={RoleInvoke.EXP} />
        <ModalInvokeSelection player={PlayerInvoke.player5} role={RoleInvoke.GOLD} />

        <InvokeSelectRarity player={PlayerInvoke.player1} role={RoleInvoke.ROAM} nextModal={RoleInvoke.JUNGLE} />
        <InvokeSelectRarity player={PlayerInvoke.player2} role={RoleInvoke.JUNGLE} nextModal={RoleInvoke.EXP} />
        <InvokeSelectRarity player={PlayerInvoke.player3} role={RoleInvoke.EXP} nextModal={RoleInvoke.MID} />
        <InvokeSelectRarity player={PlayerInvoke.player4} role={RoleInvoke.MID} nextModal={RoleInvoke.GOLD} />
        <InvokeSelectRarity player={PlayerInvoke.player5} role={RoleInvoke.GOLD} nextModal={null} />
      </div>
    </div>
  );
}
