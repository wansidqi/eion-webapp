import { useBoundStore } from '../../store';
import { ModalLayout } from '../../layout';

export function PreviewInvokeCard(): JSX.Element {
  const { invoke, setInvokeState } = useBoundStore();
  const { cardPreview, selectItem } = invoke;

  const handleCloseModal = () => {
    setInvokeState({ cardPreview: false, selectItem: null });
  };

  return (
    <div>
      <ModalLayout handleClose={handleCloseModal} modalState={cardPreview}>
        <div className="flexcenter-col absolute bottom-1/2 left-1/2 right-1/2 top-1/2">
          <div className="flexcenter h-[490px] w-[335px]">
            <img src={selectItem?.card?.details?.image ?? ''} className="h-full w-full" alt="" />
          </div>
        </div>
      </ModalLayout>
    </div>
  );
}
